import type { Metadata } from "next";
import { Intro, Plate } from "@/components/Card";
import { Link } from "@/components/Link";
import { span, WORK } from "@/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Where Dawang Zhang has worked: Upfront Ventures, the Waterloo HX Lab, Inference Health and more.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Work | Dawang Zhang", url: "/work", siteName: "Dawang Zhang", type: "website" },
};

// The same card as home. Only the middle changes: the bio and lists give
// way to every role, one line each.
export default function Work() {
  return (
    <main className="card">
      <Plate />
      <Intro back />

      <section className="jobs" aria-labelledby="work">
        <h2 id="work" className="label">
          work
        </h2>
        <ul>
          {WORK.map((job) => (
            <li key={job.name} className="job">
              <Link href={job.href}>{job.name}</Link>
              <span className="detail">{job.role}</span>
              <span className="year">{span(job)}</span>
              {job.body && (
                <details className="job-more">
                  <summary>what i did</summary>
                  {job.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </details>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
