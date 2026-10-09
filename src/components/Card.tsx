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
              {/* a tight, even wave, like a spell-check mark: 32 half-waves */}
              <svg className="squiggle" viewBox="0 0 120 6" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M0 3 Q1.875 1 3.75 3 T7.5 3 T11.25 3 T15 3 T18.75 3 T22.5 3 T26.25 3 T30 3 T33.75 3 T37.5 3 T41.25 3 T45 3 T48.75 3 T52.5 3 T56.25 3 T60 3 T63.75 3 T67.5 3 T71.25 3 T75 3 T78.75 3 T82.5 3 T86.25 3 T90 3 T93.75 3 T97.5 3 T101.25 3 T105 3 T108.75 3 T112.5 3 T116.25 3 T120 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
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
