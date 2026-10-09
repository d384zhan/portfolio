import { inline, Link } from "@/components/Link";
import { ELSEWHERE, PHOTO, ROLE } from "@/content";

// The pieces every page shares. They sit in the same grid cells on every
// page, so a navigation only swaps the middle of the card (see the view
// transition in globals.css). The links live in the name block, like the
// contact lines under a name on a business card, so they never move.

export function Plate() {
  return (
    <figure className="plate">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={PHOTO.src} alt={PHOTO.alt} draggable={false} style={{ objectPosition: PHOTO.position }} />
      {PHOTO.stamp && <span className="stamp">{PHOTO.stamp}</span>}
    </figure>
  );
}

// The squiggle under "Dawang": a quick double pen stroke of eight loose
// waves, sketched once (RoughJS) and kept here as plain path data. Units are
// hundredths of an em. It spans 2.72em and stops just short of the "g"
// (which starts at 2.87em), so the descender never touches it.
const WAVE = {
  width: 272,
  height: 20,
  strokes: [
    "M0 10 C6.40 6.28, 9.09 4.77, 13.80 12.78 M1.27 12.94 C6.24 1.60, 9.45 6.75, 18.78 8.65 M17 10 C25.33 19.04, 31.37 18.18, 36.76 12.91 M15.77 10.89 C24.54 17.66, 29.72 16.16, 37.40 13.38 M34 10 C42.78 2.87, 42.83 5.67, 53.45 9.51 M32.28 8.40 C42.10 5.98, 45.04 5.10, 48.32 7.08 M51 10 C58.98 18.79, 65.15 15.32, 69.52 9.59 M53.64 8.93 C56.47 16.36, 61.52 17.28, 71.45 12.72 M68 10 C72.45 5.34, 76.24 6.88, 83.05 7.62 M70.41 9.73 C75.68 3.93, 76.79 4.13, 86.20 11.69 M85 10 C89.36 14.09, 99.50 13.61, 103.44 12.98 M82.97 6.84 C92.12 19.60, 94.37 18.96, 104.82 12.21 M102 10 C110.38 6.77, 110.76 6.62, 115.90 10.30 M101.20 9.87 C104.31 5.57, 112.24 1.44, 116.77 11.05 M119 10 C127.18 13.92, 127.58 18.33, 138.76 12.52 M121.80 8.64 C127.57 15.26, 129.95 15.89, 132.59 10.42 M136 10 C141.37 2.42, 148.11 6.84, 155.95 8.44 M134.40 7.11 C142.17 1.40, 144.48 6.31, 150.43 9.10 M153 10 C160.98 14.99, 163.62 17.73, 167.94 9.39 M150.04 9.29 C155.52 13.92, 164.73 12.60, 170.38 12.03 M170 10 C174.52 5.67, 180.62 3.66, 188.19 9.52 M168.86 8.30 C172.42 2.78, 177.94 6.56, 190.51 6.71 M187 10 C192.35 17.76, 201.30 18.20, 204.50 6.94 M189.42 10.71 C191.02 15.79, 200.97 12.42, 206.48 9.52 M204 10 C207.94 6.46, 213.69 3.35, 220.28 8.76 M202.03 12.82 C209.82 1.49, 217.33 1.69, 222.24 12.75 M221 10 C226.36 16.84, 229.73 15.47, 235.03 7.45 M223.56 12.17 C223.67 14.33, 235.72 13.77, 234.99 8.84 M238 10 C244.80 6.48, 249.78 6.33, 253.70 11.51 M239.64 9.41 C245.48 2.80, 249.24 6.56, 253.20 10.97 M255 10 C261.89 17.01, 268.70 17.04, 273.54 8.96 M252.29 7.07 C258.06 14.66, 264.46 13.89, 274.22 11.08",
  ],
};

// On the home page, hovering or focusing "Dawang" swaps the line under the
// name for what it means. Elsewhere the whole name is the way back home.
export function Intro({ home = false, back = false }: { home?: boolean; back?: boolean }) {
  return (
    <header className="intro">
      <h1 className="name">
        {home ? (
          <>
            <span className="egg" tabIndex={0} aria-describedby="meaning">
              Dawang
              <svg className="squiggle" viewBox={`0 0 ${WAVE.width} ${WAVE.height}`} aria-hidden="true">
                {WAVE.strokes.map((d) => (
                  <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                ))}
              </svg>
            </span>{" "}
            Zhang
          </>
        ) : (
          // A plain <a>, not next/link: the full page load is what runs the
          // cross-document view transition between pages.
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a href="/">Dawang Zhang</a>
        )}
      </h1>
      <div className="sub">
        <p className="role">{inline(ROLE)}</p>
        {home && (
          <p id="meaning" className="meaning" role="tooltip">
            大王, &ldquo;big king&rdquo;
          </p>
        )}
      </div>
      <Links />
      {back && (
        // eslint-disable-next-line @next/next/no-html-link-for-pages -- a full load runs the view transition
        <a className="more back" href="/">
          <span className="arrow">&larr;&#xFE0E;</span> back
        </a>
      )}
    </header>
  );
}

function Links() {
  return (
    <nav className="links" aria-label="elsewhere">
      {ELSEWHERE.map((l) => (
        <Link key={l.name} href={l.href}>
          {l.name}
        </Link>
      ))}
    </nav>
  );
}
