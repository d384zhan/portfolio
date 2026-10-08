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
          <span className="arrow">&larr;</span> back
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
