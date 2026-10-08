import { Intro, Plate } from "@/components/Card";
import { inline, Link } from "@/components/Link";
import { BIO, CARD_COUNT, cardYear, GITHUB, PROJECTS, WORK } from "@/content";

const PREVIOUSLY = WORK.slice(1, 1 + CARD_COUNT);

export default function Home() {
  return (
    <main className="card">
      <Plate />
      <Intro home />

      <p className="bio">{inline(BIO)}</p>

      <section className="previously" aria-labelledby="previously">
        <h2 id="previously" className="label">
          previously
        </h2>
        <ul>
          {PREVIOUSLY.map((r) => (
            <li key={r.name}>
              <Link href={r.href}>{r.name}</Link>
              <span className="year">{cardYear(r)}</span>
            </li>
          ))}
          <li>
            <a className="more" href="/work">
              view all work <span className="arrow">&rarr;</span>
            </a>
          </li>
        </ul>
      </section>

      <section className="projects" aria-labelledby="projects">
        <h2 id="projects" className="label">
          projects
        </h2>
        <ul>
          {PROJECTS.slice(0, CARD_COUNT).map((p) => (
            <li key={p.name}>
              <Link href={p.href}>{p.name}</Link>
              <span className="detail">{p.detail}</span>
            </li>
          ))}
          <li>
            <a className="more" href={GITHUB} target="_blank" rel="noopener noreferrer">
              view on github <span className="arrow">&#8599;</span>
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
