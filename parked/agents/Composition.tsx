import { forwardRef, type ReactNode } from "react";
import { BIO, ELSEWHERE, PHOTO, PREVIOUSLY, PROJECTS, ROLE, type Inline } from "./content";
import { FONTS, type Design, type TextKey } from "./design";

type Props = { design: Design; fading: TextKey | null; footer: ReactNode };

const external = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};

const inline = (parts: Inline[]) =>
  parts.map((part, i) =>
    typeof part === "string" ? (
      <span key={i}>{part}</span>
    ) : (
      <a key={i} href={part.href} {...external(part.href)}>
        {part.text}
      </a>
    ),
  );

const Composition = forwardRef<HTMLDivElement, Props>(function Composition({ design, fading, footer }, ref) {
  const { fonts, crop, nameScale, bioScale, aspect } = design;
  return (
    <div
      ref={ref}
      className="canvas"
      data-fading={fading ?? ""}
      data-bio-big={design.bioScale > 1 ? "1" : "0"}
      style={{
        ["--f-name" as string]: FONTS[fonts.name].family,
        ["--f-bio" as string]: FONTS[fonts.bio].family,
        ["--f-previously" as string]: FONTS[fonts.previously].family,
        ["--f-projects" as string]: FONTS[fonts.projects].family,
        ["--crop" as string]: `${crop[0]}% ${crop[1]}%`,
        ["--name-scale" as string]: nameScale,
        ["--bio-scale" as string]: bioScale,
        ["--ar" as string]: aspect,
      }}
    >
      <header className="b-name" data-block="name">
        <h1 className="name" data-text="name">
          <span className="egg" tabIndex={0} aria-describedby="egg-tip">
            Dawang
            <span id="egg-tip" role="tooltip" className="egg-tip">
              大王, &ldquo;big king&rdquo;
            </span>
          </span>{" "}
          Zhang
        </h1>
        <p className="role">{inline(ROLE)}</p>
      </header>

      <p className="b-bio bio" data-block="bio" data-text="bio">
        {inline(BIO)}
      </p>

      <figure className="b-image" data-block="image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PHOTO.src} alt={PHOTO.alt} draggable={false} />
        {PHOTO.stamp && <span className="stamp">{PHOTO.stamp}</span>}
        {PHOTO.credit && (
          <figcaption className="credit">
            <a href={PHOTO.credit.href} {...external(PHOTO.credit.href)}>
              {PHOTO.credit.text}
            </a>
          </figcaption>
        )}
      </figure>

      <section className="b-prev group" data-block="previously" data-text="previously" aria-label="previously">
        <h2 className="lbl">previously</h2>
        <ul>
          {PREVIOUSLY.map((r) => (
            <li key={r.name}>
              <a href={r.href} {...external(r.href)}>
                {r.name}
              </a>
              <span className="year">{r.year}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="b-proj group" data-block="projects" data-text="projects" aria-label="projects">
        <h2 className="lbl">projects</h2>
        <ul>
          {PROJECTS.map((p) => (
            <li key={p.name}>
              <a href={p.href} {...external(p.href)}>
                {p.name}
              </a>
              <span className="detail">{p.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="b-else group" data-block="elsewhere" aria-label="elsewhere">
        <h2 className="lbl">elsewhere</h2>
        <ul>
          {ELSEWHERE.map((l) => (
            <li key={l.name}>
              <a href={l.href} {...external(l.href)}>
                {l.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="b-foot" data-block="foot">
        {footer}
      </footer>
    </div>
  );
});

export default Composition;
