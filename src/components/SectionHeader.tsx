import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  no,
  label,
  title,
  aside,
}: {
  no: string;
  label: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-seam pb-5">
      <div>
        <div className="label">
          {no} <span className="text-seam-bright">/</span> {label}
        </div>
        <h2 className="mt-2 font-human text-h2 font-bold tracking-[-0.01em] text-ink">{title}</h2>
      </div>
      {aside}
    </Reveal>
  );
}
