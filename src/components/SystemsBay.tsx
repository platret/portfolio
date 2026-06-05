import { projects } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { InstrumentStrip } from "./InstrumentStrip";
import { Scope } from "./Scope";

export function SystemsBay() {
  return (
    <section
      id="systems"
      data-sheet="01"
      className="mx-auto max-w-frame scroll-mt-6 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeader
        no="01"
        label="Systems bay"
        title="What I have built"
        aside={
          <div className="w-[200px]">
            <div className="label mb-1.5">Frame scanner</div>
            <Scope className="plate h-12 w-full" />
          </div>
        }
      />

      <p className="mt-4 label text-ink-faint">
        Status is honest:{" "}
        <span className="text-pass">LIVE</span> = a working URL,{" "}
        <span className="text-amber">REPO</span> = source only. Expand a row for the schematic.
      </p>

      <div className="mt-6">
        {projects.map((p) => (
          <InstrumentStrip key={p.id} project={p} />
        ))}
        <div className="border-t border-seam" />
      </div>

      <div className="mt-5 flex justify-end">
        <a
          href="https://github.com/platret"
          target="_blank"
          rel="noopener noreferrer"
          className="label text-ink-dim transition-colors hover:text-amber"
        >
          Full index on GitHub &rsaquo;
        </a>
      </div>
    </section>
  );
}
