import { skills } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export function TechRack() {
  return (
    <section
      id="stack"
      data-sheet="02"
      className="mx-auto max-w-frame scroll-mt-6 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeader no="02" label="Material schedule" title="Tools I work with" />

      <dl className="mt-8 border-l border-seam">
        {skills.map((group, i) => (
          <Reveal
            key={group.label}
            as="div"
            delay={i * 0.04}
            className="grid gap-3 border-b border-seam py-5 pl-5 sm:grid-cols-[160px_1fr] sm:gap-6"
          >
            <dt className="label pt-1 text-amber">{group.label}</dt>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="readout border border-seam px-2.5 py-1 text-data text-ink-dim transition-colors hover:border-seam-bright hover:text-ink"
                >
                  {item}
                </span>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
