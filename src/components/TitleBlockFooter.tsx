import { useEffect, useState } from "react";

const SHEETS = ["00", "01", "02", "03"];

// Persistent ISO-7200-style title block, bottom-right on large screens.
// The REV ticks in discrete steps as you pass each sheet. Decorative: the same
// info lives in the resume and contact sections, so it is aria-hidden.
export function TitleBlockFooter() {
  const [sheet, setSheet] = useState("00");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-sheet]"));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setSheet(e.target.getAttribute("data-sheet") ?? "00");
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const rev = Math.max(0, SHEETS.indexOf(sheet));

  return (
    <div aria-hidden="true" className="pointer-events-none fixed bottom-4 right-4 z-20 hidden lg:block">
      <div className="border border-seam-bright bg-panel px-4 py-2.5">
        <div className="label text-ink-faint">Drawn by</div>
        <div className="readout text-data text-ink">A. PLATRET</div>
        <div className="mt-1.5 flex gap-4">
          <span className="label">
            Sheet <span className="readout tnum text-amber">{sheet}/03</span>
          </span>
          <span className="label">
            Rev <span className="readout tnum text-amber">{String(rev).padStart(2, "0")}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
