import { useEffect } from "react";
import { person, achievement, contact, projects, skills } from "@/lib/data";

// Static, fully accessible skim view. No canvas, no motion, semantic HTML.
// Always one tap from the first viewport so a recruiter is never trapped.
export function Resume() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto max-w-prose px-5 py-12 sm:px-8 sm:py-16">
      <a href="#/" className="label text-ink-dim transition-colors hover:text-amber">
        &lsaquo; Back to the site
      </a>

      <header className="mt-8 border-b border-seam pb-6">
        <h1 className="font-human text-display font-extrabold leading-[0.95] text-ink">{person.name}</h1>
        <p className="mt-3 text-h3 text-ink-dim">
          {person.role}. {person.status}, {person.city}.
        </p>
        <p className="mt-2 text-data text-ink-faint">
          <a className="hover:text-amber" href={`mailto:${contact.email}`}>{contact.email}</a> ·{" "}
          <a className="hover:text-amber" href={contact.github} target="_blank" rel="noopener noreferrer">github.com/{contact.githubHandle}</a> ·{" "}
          <a className="hover:text-amber" href={contact.x} target="_blank" rel="noopener noreferrer">@{contact.xHandle}</a>
        </p>
      </header>

      <section className="mt-8">
        <h2 className="label text-amber">Recognition</h2>
        <p className="mt-2 text-body text-ink">
          {achievement.event}: {achievement.rankZurich}th in Zurich, {achievement.rankSwitzerland}th in Switzerland.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="label text-amber">Selected work</h2>
        <ul className="mt-3 space-y-5">
          {projects.map((p) => (
            <li key={p.id} className="border-t border-seam pt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-human text-h3 font-bold text-ink">{p.name}</h3>
                <span className="readout text-data text-ink-faint">
                  {p.state === "repo" ? "source" : "live"}
                </span>
              </div>
              <p className="mt-1 text-data text-ink-dim">{p.designation}</p>
              <p className="mt-2 text-body text-ink-dim">{p.blurb}</p>
              <p className="mt-2 text-data">
                {p.liveUrl && (
                  <>
                    <a className="text-amber hover:underline" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                      {p.liveUrl.replace("https://", "")}
                    </a>{" "}
                    ·{" "}
                  </>
                )}
                <a className="text-ink-dim hover:text-amber" href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                  source
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="label text-amber">Stack</h2>
        <dl className="mt-3 space-y-2">
          {skills.map((g) => (
            <div key={g.label} className="grid gap-1 sm:grid-cols-[140px_1fr]">
              <dt className="label">{g.label}</dt>
              <dd className="text-data text-ink-dim">{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="mt-10 border-t border-seam pt-6">
        <a href="#/" className="label text-ink-dim transition-colors hover:text-amber">
          &lsaquo; Back to the site
        </a>
      </footer>
    </div>
  );
}
