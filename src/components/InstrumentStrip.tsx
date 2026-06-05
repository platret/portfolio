import { useId, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Project } from "@/lib/data";
import { StatusLED } from "./StatusLED";
import { SolverPanel } from "./SolverPanel";
import { schematics } from "./schematics";
import { asset } from "@/lib/asset";

export function InstrumentStrip({ project }: { project: Project }) {
  const reduced = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);
  const detailId = useId();
  const Schematic = schematics[project.id];
  const liveLabel = project.state === "live-app" ? "Open app" : project.state === "live-site" ? "Open site" : null;

  return (
    <article className="border-t border-seam">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={detailId}
          onClick={() => setOpen((v) => !v)}
          className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-5 text-left transition-colors hover:bg-panel/40 sm:gap-6"
        >
          <span className="readout tnum text-data text-ink-faint">{project.no}</span>
          <span className="min-w-0">
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-human text-h3 font-bold text-ink">{project.name}</span>
              <StatusLED state={project.state} />
            </span>
            <span className="mt-1 block truncate text-data text-ink-dim">{project.designation}</span>
          </span>
          <span
            className="readout grid size-8 place-content-center border border-seam text-ink-faint transition-colors group-hover:border-amber group-hover:text-amber"
            aria-hidden="true"
          >
            {open ? "−" : "+"}
          </span>
        </button>
      </h3>

      <div
        id={detailId}
        role="region"
        aria-label={`${project.name} detail`}
        hidden={!open}
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: reduced ? "none" : "grid-template-rows 320ms cubic-bezier(0.22,1,0.36,1)",
          contain: "content",
        }}
      >
        <div className="overflow-hidden">
          <div className="grid gap-6 pb-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="max-w-prose text-body text-ink-dim">{project.blurb}</p>

              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {project.readouts.map((r) => (
                  <li key={r.label} className="label">
                    {r.label} <span className="readout text-data text-amber">{r.value}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
                {project.stack.map((s) => (
                  <li key={s} className="readout border border-seam px-2 py-1 text-data text-ink-dim">
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl && liveLabel && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label bg-amber px-4 py-2 text-bg transition-opacity hover:opacity-90"
                    style={{ color: "var(--bg)" }}
                  >
                    {liveLabel} &rsaquo;
                  </a>
                )}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label border border-seam-bright px-4 py-2 text-ink transition-colors hover:border-amber hover:text-amber"
                >
                  Source &rsaquo;
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <figure className="plate p-4">
                <Schematic />
                <figcaption className="label mt-2 text-ink-faint">Fig. {project.no} / architecture</figcaption>
              </figure>
              {project.shotUrl && (
                <figure className="plate overflow-hidden">
                  <img
                    src={asset(project.shotUrl)}
                    alt={`${project.name} interface`}
                    loading="lazy"
                    decoding="async"
                    className="block w-full"
                  />
                </figure>
              )}
              {project.id === "sudoku" && <SolverPanel />}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
