import { useReducedMotion } from "motion/react";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { achievement } from "@/lib/data";

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
}

// The ICT result as a dial readout. The number is the real datum; ticks are the
// instrument face. Amber debuts here as a settling gauge, not a colored word.
export function IctGauge() {
  const reduced = useReducedMotion() ?? false;
  const { ref, inView } = useInView<HTMLDivElement>();
  const zurich = useCountUp(achievement.rankZurich, { active: inView, reduced, duration: 0.7 });
  const ch = useCountUp(achievement.rankSwitzerland, { active: inView, reduced, duration: 0.9 });

  const ticks = Array.from({ length: 25 }, (_, i) => {
    const deg = 135 + (270 * i) / 24;
    const lit = i <= 5; // a fixed marker arc near the strong end, not a fake percentage
    const [x1, y1] = polar(60, 60, 41, deg);
    const [x2, y2] = polar(60, 60, i % 6 === 0 ? 48 : 45, deg);
    return { x1, y1, x2, y2, lit };
  });

  return (
    <div ref={ref} className="flex items-center gap-5">
      <div className="relative shrink-0" aria-hidden="true">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.lit ? "var(--amber)" : "var(--seam-bright)"}
              strokeWidth={t.lit ? 2 : 1}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <div className="readout tnum text-amber leading-none" style={{ fontSize: "2rem", fontWeight: 700 }}>
            {zurich}
            <span style={{ fontSize: "0.9rem" }}>th</span>
          </div>
        </div>
      </div>

      <div>
        <div className="label">Regional ICT Championships 2026</div>
        <div className="mt-1 font-human text-h3 text-ink">
          {zurich}th in Zurich
        </div>
        <div className="mt-1 readout tnum text-data text-ink-dim">
          <span className="text-amber">{ch}th</span> in Switzerland
        </div>
      </div>
    </div>
  );
}
