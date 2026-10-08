"use client";

import { useEffect, useRef, useState } from "react";
import type { CanvasApi } from "./AgentCanvas";
import { ASPECT, BIO_SCALES, CROP_RANGE, FONT_CHOICES, NAME_SCALE, clamp, type TextKey } from "./design";
import { Cursor, rand, sleep, type Vec } from "./engine";

const AGENTS = [
  { name: "agent 1", color: "#4fb3ff" },
  { name: "agent 2", color: "#ff4a4a" },
];

const SIZE = 1.5;

type Rect = { x: number; y: number; w: number; h: number };
type Hl = { lines: Rect[]; hidden?: boolean } | null;
type Sel = { rect: Rect; hidden?: boolean } | null;

class Abort extends Error {}

const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];
const toRect = (r: DOMRect): Rect => ({ x: r.left, y: r.top, w: r.width, h: r.height });
const pad = (r: Rect, p: number): Rect => ({ x: r.x - p, y: r.y - p, w: r.w + p * 2, h: r.h + p * 2 });
const union = (rs: Rect[]): Rect => {
  const x = Math.min(...rs.map((r) => r.x));
  const y = Math.min(...rs.map((r) => r.y));
  return { x, y, w: Math.max(...rs.map((r) => r.x + r.w)) - x, h: Math.max(...rs.map((r) => r.y + r.h)) - y };
};

// Rendered lines of text inside an element, skipping the name tooltip.
function lineRects(el: Element): Rect[] {
  const rects: DOMRect[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.parentElement?.closest(".egg-tip")) continue;
    const range = document.createRange();
    range.selectNodeContents(n);
    rects.push(...Array.from(range.getClientRects()).filter((r) => r.width > 1 && r.height > 1));
  }
  const lines: Rect[] = [];
  for (const r of rects) {
    const line = lines.find((l) => Math.abs(l.y - r.top) < r.height * 0.5);
    if (line) {
      const x2 = Math.max(line.x + line.w, r.right);
      line.x = Math.min(line.x, r.left);
      line.w = x2 - line.x;
      line.h = Math.max(line.h, r.height);
    } else lines.push({ x: r.left, y: r.top, w: r.width, h: r.height });
  }
  return lines.sort((a, b) => a.y - b.y);
}

export default function AgentLayer({ api, enabled }: { api: CanvasApi; enabled: boolean }) {
  const cursors = useRef<Cursor[]>([]);
  const rootEls = useRef<(HTMLDivElement | null)[]>([]);
  const arrowEls = useRef<(SVGSVGElement | null)[]>([]);
  const hlEls = useRef<(HTMLDivElement | null)[][]>(AGENTS.map(() => []));
  const selEls = useRef<(HTMLDivElement | null)[]>([]);
  const [hls, setHls] = useState<Hl[]>(AGENTS.map(() => null));
  const [sels, setSels] = useState<Sel[]>(AGENTS.map(() => null));
  const [tags, setTags] = useState<boolean[]>(AGENTS.map(() => false));
  const [rings, setRings] = useState<number[]>(AGENTS.map(() => 0));
  const enabledRef = useRef(enabled);
  const busyUntil = useRef(0);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    if (!cursors.current.length) {
      cursors.current = AGENTS.map((_, i) => {
        const c = new Cursor(window.innerWidth * 0.5 + i * 40, -40);
        c.size = c.sizeTarget = SIZE;
        return c;
      });
    }
    // The loop only runs while a cursor is moving; at rest it sleeps, so an
    // idle tab costs nothing.
    let raf = 0;
    let last = 0;
    const frame = (now: number) => {
      const dt = Math.min(1 / 30, (now - last) / 1000);
      last = now;
      let moving = false;
      cursors.current.forEach((c, i) => {
        c.step(now, dt);
        if (!c.still) moving = true;
        const root = rootEls.current[i];
        const arrow = arrowEls.current[i];
        if (root) root.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
        if (arrow) {
          arrow.style.transform = `rotate(${c.rot}deg) scale(${c.scale * c.size})`;
          arrow.style.filter = `drop-shadow(0 1px 1.5px rgba(0,0,0,0.25)) drop-shadow(0 0 ${4 + c.glow * 10}px ${AGENTS[i].color}${Math.round(c.glow * 170).toString(16).padStart(2, "0")})`;
        }
      });
      raf = moving ? requestAnimationFrame(frame) : 0;
    };
    const wake = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    cursors.current.forEach((c) => (c.onWake = wake));
    wake();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Clicking, typing or hovering a link pauses the agents for a moment.
  useEffect(() => {
    const mark = () => (busyUntil.current = Date.now() + 4000);
    const over = (e: PointerEvent) => {
      if ((e.target as HTMLElement | null)?.closest?.("a, button, .egg")) mark();
    };
    window.addEventListener("pointerdown", mark);
    window.addEventListener("keydown", mark);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointerdown", mark);
      window.removeEventListener("keydown", mark);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  useEffect(() => {
    let alive = true;
    const C = () => cursors.current;
    const guard = () => {
      if (!alive || !enabledRef.current) throw new Abort();
    };
    const setAt = <T,>(set: React.Dispatch<React.SetStateAction<T[]>>, i: number, v: T) =>
      set((xs) => xs.map((x, j) => (j === i ? v : x)));
    const click = async (i: number) => {
      setRings((r) => r.map((v, j) => (j === i ? v + 1 : v)));
      await C()[i].press();
    };
    const place = (el: HTMLElement | null, r: Rect) => {
      if (!el) return;
      el.style.left = `${r.x}px`;
      el.style.top = `${r.y}px`;
      el.style.width = `${r.w}px`;
      el.style.height = `${r.h}px`;
    };
    const wake = (i: number) => {
      setAt<boolean>(setTags, i, true);
    };
    const deselect = async (i: number, rect: Rect) => {
      setAt<Sel>(setSels, i, { rect, hidden: true });
      await sleep(180);
      setAt<Sel>(setSels, i, null);
    };
    const nameEl = () => api.root()?.querySelector('[data-text="name"]') ?? null;

    // At rest the two arrows stack just past the name, like a small mark.
    const restSpot = (i: number): Vec => {
      const el = nameEl();
      const lines = el ? lineRects(el) : [];
      const l = lines[lines.length - 1];
      if (!l) return [window.innerWidth * 0.4 + i * 12, 60];
      const x = l.x + l.w + 12 + i * 15;
      const y = l.y + l.h * 0.06 + i * 10;
      return [x, y];
    };
    const goRest = async (i: number) => {
      await C()[i].moveTo(restSpot(i), "reach");
      await sleep(250);
      setAt<boolean>(setTags, i, false);
    };

    const sweep = async (i: number, el: Element) => {
      const lines = lineRects(el);
      if (!lines.length) return null;
      const c = C()[i];
      const first = lines[0];
      const last = lines[lines.length - 1];
      await c.moveTo([first.x - 1, first.y + first.h * 0.55], "reach");
      guard();
      c.hold();
      setAt<Hl>(setHls, i, { lines });
      await sleep(50);
      const paint = ([x, y]: Vec) => {
        let k = lines.findIndex((l) => y <= l.y + l.h);
        if (k < 0) k = lines.length - 1;
        lines.forEach((l, j) => {
          const e = hlEls.current[i][j];
          if (e) e.style.width = `${j < k ? l.w : j === k ? clamp(x - l.x, [0, l.w]) : 0}px`;
        });
      };
      await c.moveTo([last.x + last.w + 1, last.y + last.h * 0.55], "sweep", paint);
      paint([last.x + last.w + 2, last.y + last.h]);
      c.release();
      guard();
      return lines;
    };
    const unhighlight = async (i: number, lines: { x: number; y: number; w: number; h: number }[]) => {
      setAt<Hl>(setHls, i, { lines, hidden: true });
      await sleep(240);
      setAt<Hl>(setHls, i, null);
    };

    // Highlight one element and set it in a different face.
    const retype = async (i: number) => {
      const r = Math.random();
      const key: TextKey = r < 0.5 ? "name" : r < 0.7 ? "bio" : r < 0.85 ? "previously" : "projects";
      const d = api.design();
      const current = d.fonts[key];
      const font = current !== "switzer" && Math.random() < 0.4 ? "switzer" : pick(FONT_CHOICES[key].filter((f) => f !== current));
      const el = api.root()?.querySelector(`[data-text="${key}"]`);
      if (!el) return false;
      wake(i);
      const lines = await sweep(i, el);
      if (!lines) return false;
      await sleep(rand(140, 240));
      await api.edit({ ...api.design(), fonts: { ...api.design().fonts, [key]: font } }, key);
      await unhighlight(i, lines);
      return true;
    };

    // Highlight the bio and promote it to a statement, or set it back.
    const statement = async (i: number) => {
      const el = api.root()?.querySelector('[data-text="bio"]');
      if (!el) return false;
      const d = api.design();
      const next = d.bioScale > 1 ? BIO_SCALES[0] : BIO_SCALES[1];
      wake(i);
      const lines = await sweep(i, el);
      if (!lines) return false;
      await sleep(rand(140, 240));
      await api.edit({ ...api.design(), bioScale: next }, "bio");
      await unhighlight(i, lines);
      return true;
    };

    // Grab the name's corner and drag it bigger or smaller.
    const scaleName = async (i: number) => {
      const el = nameEl();
      if (!el) return false;
      const d = api.design();
      const target = d.nameScale < 1.4 ? rand(1.8, NAME_SCALE[1]) : rand(NAME_SCALE[0], 1.12);
      const box = union(lineRects(el));
      const c = C()[i];
      wake(i);
      await c.moveTo([box.x + box.w * rand(0.3, 0.7), box.y + box.h * 0.5], "reach");
      guard();
      await click(i);
      setAt<Sel>(setSels, i, { rect: pad(box, 6) });
      await sleep(140);
      await c.moveTo([box.x + box.w + 6, box.y + box.h + 6], "reach");
      guard();
      c.hold();
      const k = target / d.nameScale;
      let good = d.nameScale;
      await c.moveTo([box.x + box.w * k + 6, box.y + box.h * k + 6], "drag", ([x]) => {
        const s = clamp(d.nameScale * Math.max(0.2, (x - 6 - box.x) / box.w), NAME_SCALE);
        api.setLive("--name-scale", String(s));
        if (api.fitsLive()) {
          good = s;
          place(selEls.current[i], pad(union(lineRects(el)), 6));
        } else {
          api.setLive("--name-scale", String(good));
          c.halt();
        }
      });
      c.release();
      await api.edit({ ...api.design(), nameScale: good });
      await deselect(i, pad(union(lineRects(el)), 6));
      return true;
    };

    // Grab the photo's bottom edge and make the band taller or slimmer.
    const reshape = async (i: number) => {
      const fig = api.root()?.querySelector<HTMLElement>(".b-image");
      if (!fig) return false;
      const d = api.design();
      const target = d.aspect >= 3.5 ? rand(ASPECT[0], 2.9) : rand(4.2, ASPECT[1]);
      const box = fig.getBoundingClientRect();
      const c = C()[i];
      wake(i);
      await c.moveTo([box.left + box.width * rand(0.3, 0.7), box.top + box.height * rand(0.3, 0.7)], "reach");
      guard();
      await click(i);
      setAt<Sel>(setSels, i, { rect: toRect(box) });
      await sleep(140);
      const hx = box.left + box.width * rand(0.4, 0.6);
      await c.moveTo([hx, box.bottom], "reach");
      guard();
      c.hold();
      let good = d.aspect;
      await c.moveTo([hx + rand(-10, 10), box.top + box.width / target], "drag", ([, y]) => {
        const a = clamp(box.width / Math.max(40, y - box.top), ASPECT);
        api.setLive("--ar", String(a));
        if (api.fitsLive()) {
          good = a;
          place(selEls.current[i], toRect(fig.getBoundingClientRect()));
        } else {
          api.setLive("--ar", String(good));
          c.halt();
        }
      });
      c.release();
      await api.edit({ ...api.design(), aspect: good });
      await deselect(i, toRect(fig.getBoundingClientRect()));
      return true;
    };

    // Drag inside the photo to reframe it: trees and tower, or the full face.
    const pan = async (i: number) => {
      const fig = api.root()?.querySelector<HTMLElement>(".b-image");
      const img = fig?.querySelector("img");
      if (!fig || !img || !img.naturalWidth) return false;
      const box = fig.getBoundingClientRect();
      const overflow = box.width * (img.naturalHeight / img.naturalWidth) - box.height;
      if (overflow < 40) return false;
      const [x0, y0] = api.design().crop;
      const y1 = y0 < 20 ? rand(40, CROP_RANGE.y[1]) : rand(CROP_RANGE.y[0], 4);
      const c = C()[i];
      const g: Vec = [box.left + box.width * rand(0.3, 0.7), box.top + box.height * rand(0.35, 0.65)];
      wake(i);
      await c.moveTo(g, "reach");
      guard();
      await click(i);
      c.hold();
      const wanted = -((y1 - y0) / 100) * overflow;
      const room = wanted < 0 ? g[1] - 24 : window.innerHeight - 24 - g[1];
      const dy = Math.sign(wanted) * Math.min(Math.abs(wanted), room);
      const gain = dy === 0 ? 1 : wanted / dy;
      let y = y0;
      await c.moveTo([g[0] + rand(-12, 12), g[1] + dy], "drag", ([, cy]) => {
        y = clamp(y0 - (((cy - g[1]) * gain) / overflow) * 100, CROP_RANGE.y);
        api.setLive("--crop", `${x0}% ${y}%`);
      });
      c.release();
      await api.edit({ ...api.design(), crop: [x0, y] });
      return true;
    };

    const ACTIONS = [
      { w: 32, run: retype },
      { w: 16, run: scaleName },
      { w: 18, run: reshape },
      { w: 16, run: pan },
      { w: 14, run: statement },
    ];

    const cleanup = () => {
      setHls(AGENTS.map(() => null));
      setSels(AGENTS.map(() => null));
      const d = api.design();
      api.setLive("--name-scale", String(d.nameScale));
      api.setLive("--ar", String(d.aspect));
      api.setLive("--crop", `${d.crop[0]}% ${d.crop[1]}%`);
      C().forEach((c) => c.release());
    };

    const loop = async () => {
      await sleep(900);
      AGENTS.forEach((_, i) => {
        wake(i);
        goRest(i);
      });
      await sleep(3400);
      let turn = Math.floor(Math.random() * 2);
      let last = -1;
      while (alive) {
        const ready = enabledRef.current && Date.now() > busyUntil.current && document.visibilityState === "visible";
        if (!ready) {
          await sleep(800);
          continue;
        }
        const i = turn++ % AGENTS.length;
        const pool = ACTIONS.filter((_, k) => k !== last);
        let roll = Math.random() * pool.reduce((s, a) => s + a.w, 0);
        const action = pool.find((a) => (roll -= a.w) < 0) ?? pool[0];
        last = ACTIONS.indexOf(action);
        try {
          if (await action.run(i)) C()[i].wiggle();
        } catch (e) {
          cleanup();
          if (!(e instanceof Abort)) console.error(e);
        }
        if (!alive) break;
        await sleep(rand(250, 450));
        // the resting mark follows the name if it moved or resized
        AGENTS.forEach((_, k) => {
          if (k !== i) C()[k].moveTo(restSpot(k), "glance");
        });
        await goRest(i);
        await sleep(rand(7000, 12000));
      }
    };
    loop();
    return () => {
      alive = false;
    };
  }, [api]);

  return (
    <div className="agents" aria-hidden="true" style={{ opacity: enabled ? 1 : 0 }}>
      {hls.map((h, i) =>
        h?.lines.map((l, j) => (
          <div
            key={`hl-${i}-${j}`}
            ref={(el) => {
              hlEls.current[i][j] = el;
            }}
            className="hl"
            data-hidden={h.hidden ? "1" : "0"}
            style={{ left: l.x, top: l.y, height: l.h, width: 0, background: `${AGENTS[i].color}40` }}
          />
        )),
      )}
      {sels.map(
        (s, i) =>
          s && (
            <div
              key={`sel-${i}`}
              ref={(el) => {
                selEls.current[i] = el;
              }}
              className="sel"
              data-hidden={s.hidden ? "1" : "0"}
              style={{ left: s.rect.x, top: s.rect.y, width: s.rect.w, height: s.rect.h, borderColor: AGENTS[i].color }}
            >
              {[
                [-4, -4],
                ["calc(100% - 4px)", -4],
                [-4, "calc(100% - 4px)"],
                ["calc(100% - 4px)", "calc(100% - 4px)"],
              ].map(([left, top], k) => (
                <span key={k} className="handle" style={{ left, top, borderColor: AGENTS[i].color }} />
              ))}
            </div>
          ),
      )}
      {AGENTS.map((a, i) => (
        <div
          key={a.name}
          className="cursor"
          ref={(el) => {
            rootEls.current[i] = el;
          }}
        >
          {rings[i] > 0 && <span key={rings[i]} className="ring" style={{ borderColor: a.color }} />}
          <svg
            ref={(el) => {
              arrowEls.current[i] = el;
            }}
            className="cursor-arrow"
            width="24"
            height="36"
            viewBox="0 0 24 36"
          >
            {/* the multiplayer pointer shape used by Figma and Liveblocks */}
            <path
              d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
              fill={a.color}
              stroke="#fff"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </svg>
          <div className="cursor-tag" data-show={tags[i] ? "1" : "0"} style={{ background: a.color }}>
            {a.name}
          </div>
        </div>
      ))}
    </div>
  );
}
