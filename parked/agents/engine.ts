// Cursor motion for the agents, ported from Cua's open-source cursor motion
// lab (trycua/cua, tools/cursor-gallery/motion-lab). Default style is their
// "signature arc": one cubic arc bowed to the wrist's natural side, a
// minimum-jerk speed profile with a whisper of follow-through past the target,
// Fitts-law timing, and a soft glow that grows with speed.

export type Vec = [number, number];

export const rand = (a: number, b: number) => a + Math.random() * (b - a);
export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const clampN = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

const minJerk = (t: number) => t * t * t * (10 - 15 * t + 6 * t * t);

// A smooth bump peaking at `at`, added to the profile for follow-through.
function bump(tau: number, at: number) {
  const a = Math.max(1.5, at * 10);
  const b = Math.max(1.5, (1 - at) * 10);
  const peak = (a / (a + b)) ** a * (b / (a + b)) ** b;
  return (tau ** a * (1 - tau) ** b) / peak;
}

// Cua's bezier: handles along the chord plus a perpendicular deflection.
function cuaBezier(a: Vec, b: Vec, arcSize: number, arcFlow: number) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.max(1, Math.hypot(dx, dy));
  const px = -dy / len;
  const py = dx / len;
  const deflection = len * arcSize;
  const flow = (arcFlow + 1) / 2;
  const c1d = deflection * (1 - 0.5 * flow);
  const c2d = deflection * (1 - 0.5 * (1 - flow));
  const c1: Vec = [a[0] + dx * 0.3 + px * c1d, a[1] + dy * 0.3 + py * c1d];
  const c2: Vec = [b[0] - dx * 0.3 + px * c2d, b[1] - dy * 0.3 + py * c2d];
  return (u: number): Vec => {
    const v = 1 - u;
    const k0 = v * v * v;
    const k1 = 3 * v * v * u;
    const k2 = 3 * v * u * u;
    const k3 = u * u * u;
    return [
      k0 * a[0] + k1 * c1[0] + k2 * c2[0] + k3 * b[0],
      k0 * a[1] + k1 * c1[1] + k2 * c2[1] + k3 * b[1],
    ];
  };
}

// Arc-length parameterised path; fractions past 1 extrapolate along the end
// tangent, which is how the follow-through leaves the path and comes back.
class Path {
  private us: number[] = [];
  private ss: number[] = [];
  length = 0;
  private end: Vec;
  private tangent: Vec;

  constructor(private fn: (u: number) => Vec) {
    let prev = fn(0);
    this.us.push(0);
    this.ss.push(0);
    for (let i = 1; i <= 128; i++) {
      const u = i / 128;
      const p = fn(u);
      this.length += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
      this.us.push(u);
      this.ss.push(this.length);
      prev = p;
    }
    this.end = fn(1);
    const near = fn(1 - 1e-3);
    const tl = Math.hypot(this.end[0] - near[0], this.end[1] - near[1]) || 1;
    this.tangent = [(this.end[0] - near[0]) / tl, (this.end[1] - near[1]) / tl];
  }

  at(f: number): Vec {
    if (f > 1) {
      const d = (f - 1) * this.length;
      return [this.end[0] + this.tangent[0] * d, this.end[1] + this.tangent[1] * d];
    }
    const target = clampN(f, 0, 1) * this.length;
    let lo = 0;
    let hi = this.ss.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (this.ss[mid] < target) lo = mid;
      else hi = mid;
    }
    const span = this.ss[hi] - this.ss[lo] || 1;
    const u = this.us[lo] + (this.us[hi] - this.us[lo]) * ((target - this.ss[lo]) / span);
    return this.fn(u);
  }
}

// reach: the signature arc. glance: same, unhurried. drag: carrying something,
// flatter and 1.3x slower. sweep: selecting text, nearly straight and steady.
export type MoveMode = "reach" | "sweep" | "drag" | "glance";

const MODES: Record<MoveMode, { arc: number; over: number; scale: number }> = {
  reach: { arc: 0.16, over: 0.018, scale: 1.1 },
  glance: { arc: 0.16, over: 0.018, scale: 1.25 },
  drag: { arc: 0.05, over: 0, scale: 1.3 },
  sweep: { arc: 0.01, over: 0, scale: 1.5 },
};

type Move = {
  path: Path;
  profile: (t: number) => number;
  t0: number;
  dur: number;
  to: Vec;
  onStep?: (p: Vec) => void;
  resolve: () => void;
};

export class Cursor {
  x: number;
  y: number;
  vx = 0;
  vy = 0;
  // 0..1, how fast the cursor is moving; drives the speed glow.
  glow = 0;
  private move: Move | null = null;
  rot = 0;
  private rotV = 0;
  scale = 1;
  private scaleV = 0;
  private scaleTarget = 1;
  private wiggleAt = -1;
  size = 1;
  sizeTarget = 1;

  // Called whenever the cursor is given something to do, so a sleeping
  // render loop can start again.
  onWake?: () => void;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get busy() {
    return this.move !== null;
  }

  // True once nothing about the cursor is still animating.
  get still() {
    return (
      !this.move &&
      this.wiggleAt < 0 &&
      this.glow < 0.01 &&
      Math.abs(this.rotV) < 0.5 &&
      Math.abs(this.rot) < 0.05 &&
      Math.abs(this.scaleTarget - this.scale) < 0.002 &&
      Math.abs(this.scaleV) < 0.01
    );
  }

  // Fitts timing as in Cua's director's cut: 150 + 120 log2(D / W + 1) ms,
  // clamped to 300..1000 ms, then scaled per mode.
  moveTo(to: Vec, mode: MoveMode = "reach", onStep?: (p: Vec) => void, targetWidth = 28) {
    // a new move starts from wherever the cursor is right now
    this.halt();
    this.onWake?.();
    return new Promise<void>((resolve) => {
      const from: Vec = [this.x, this.y];
      const d = Math.hypot(to[0] - from[0], to[1] - from[1]);
      if (d < 1.5) {
        onStep?.(to);
        resolve();
        return;
      }
      const m = MODES[mode];
      // bow upward for horizontal moves, like a wrist pivoting
      const side = to[0] - from[0] >= 0 ? -1 : 1;
      const path = new Path(cuaBezier(from, to, m.arc * side, 0.15));
      const over = Math.min(m.over, 8 / Math.max(1, d));
      const profile = over > 0 ? (t: number) => minJerk(t) + over * bump(t, 0.82) : minJerk;
      const fitts = clampN(150 + 120 * Math.log2(d / targetWidth + 1), 300, 1000);
      const dur = mode === "sweep" ? Math.max(fitts, 260 + d * 0.9) * 1.1 : fitts * m.scale;
      this.move = { path, profile, t0: performance.now(), dur, to, onStep, resolve };
    });
  }

  // Ends the current move where the cursor is (e.g. a drag hit a limit).
  halt() {
    const m = this.move;
    if (!m) return;
    this.move = null;
    m.resolve();
  }

  // Cua's click: squish to 0.84 and back, then a short 80 ms dwell.
  press() {
    this.onWake?.();
    this.scaleTarget = 0.84;
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        this.scaleTarget = 1;
        setTimeout(resolve, 80);
      }, 70),
    );
  }

  hold() {
    this.onWake?.();
    this.scaleTarget = 0.88;
  }

  release() {
    this.onWake?.();
    this.scaleTarget = 1;
  }

  wiggle() {
    this.onWake?.();
    this.wiggleAt = performance.now();
  }

  step(now: number, dt: number) {
    const px = this.x;
    const py = this.y;
    const m = this.move;
    if (m) {
      const tau = Math.min(1, (now - m.t0) / m.dur);
      const [x, y] = tau >= 1 ? m.to : m.path.at(m.profile(tau));
      this.x = x;
      this.y = y;
      m.onStep?.([x, y]);
      if (tau >= 1) {
        this.move = null;
        m.resolve();
      }
    }
    this.vx = dt > 0 ? (this.x - px) / dt : 0;
    this.vy = dt > 0 ? (this.y - py) / dt : 0;

    // Speed glow: rises quickly with speed, fades out as the cursor lands.
    const speed = Math.hypot(this.vx, this.vy);
    const target = clampN((speed - 120) / 1400, 0, 1);
    this.glow += (target - this.glow) * (1 - Math.exp(-dt * (target > this.glow ? 18 : 7)));
    if (this.glow < 0.005) this.glow = 0;

    // A short wiggle after finishing an edit; otherwise the arrow stays upright.
    let rotTarget = 0;
    if (this.wiggleAt > 0) {
      const t = (now - this.wiggleAt) / 1000;
      if (t > 0.7) this.wiggleAt = -1;
      else rotTarget = 14 * Math.sin(t * 30) * Math.exp(-t * 6);
    }
    const rw = 22;
    const ra = rw * rw * (rotTarget - this.rot) - 2 * 0.6 * rw * this.rotV;
    this.rotV += ra * dt;
    this.rot += this.rotV * dt;

    // Squish on press with a little rebound.
    const sw = 32;
    const sa = sw * sw * (this.scaleTarget - this.scale) - 2 * 0.32 * sw * this.scaleV;
    this.scaleV += sa * dt;
    this.scale += this.scaleV * dt;
  }
}
