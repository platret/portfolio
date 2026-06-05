import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { subscribeRaf } from "@/hooks/useSharedRaf";
import { PUZZLE, solveCollect, type SolveResult } from "@/engine/solver";

type Phase = "idle" | "running" | "done";

// A real backtracking solver, run live. The proof is the interaction.
export function SolverPanel() {
  const reduced = useReducedMotion() ?? false;
  const [grid, setGrid] = useState<Uint8Array>(() => Uint8Array.from(PUZZLE));
  const [active, setActive] = useState(-1);
  const [phase, setPhase] = useState<Phase>("idle");
  const [stats, setStats] = useState<{ placements: number; backtracks: number; ms: number; unique: boolean } | null>(null);
  const givens = useRef<Uint8Array>(PUZZLE).current;

  const run = () => {
    if (phase === "running") return;
    setPhase("running");
    setStats(null);

    const t0 = performance.now();
    const result: SolveResult = solveCollect(PUZZLE);
    const ms = performance.now() - t0;
    const finalStats = {
      placements: result.placements,
      backtracks: result.backtracks,
      ms: Math.max(0.1, ms),
      unique: result.unique,
    };

    if (reduced) {
      setGrid(result.solution);
      setActive(-1);
      setStats(finalStats);
      setPhase("done");
      return;
    }

    const display = Uint8Array.from(PUZZLE);
    let i = 0;
    let acc = 0;
    const stepsPerTick = 3;
    const unsub = subscribeRaf((_now, dt) => {
      acc += dt;
      if (acc < 28) return;
      acc = 0;
      let last = -1;
      for (let k = 0; k < stepsPerTick && i < result.steps.length; k++, i++) {
        const s = result.steps[i];
        display[s.idx] = s.kind === "set" ? s.val : 0;
        last = s.idx;
      }
      setGrid(Uint8Array.from(display));
      setActive(last);
      if (i >= result.steps.length) {
        unsub();
        setGrid(result.solution);
        setActive(-1);
        setStats(finalStats);
        setPhase("done");
      }
    });
  };

  return (
    <div className="plate p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="label">Live backtracking solver</span>
        <button
          type="button"
          onClick={run}
          disabled={phase === "running"}
          className="label border border-seam-bright px-3 py-1.5 text-amber transition-colors hover:bg-amber-soft disabled:opacity-50"
        >
          {phase === "running" ? "Solving" : phase === "done" ? "Run again" : "Run solver"}
        </button>
      </div>

      <div
        className="mt-3 grid aspect-square w-full max-w-[280px] grid-cols-9 gap-px bg-seam"
        role="img"
        aria-label={
          stats
            ? `Solved. ${stats.placements} placements, ${stats.backtracks} backtracks, unique solution.`
            : "Sudoku grid, solver idle"
        }
      >
        {Array.from(grid).map((v, idx) => {
          const isGiven = givens[idx] !== 0;
          const isActive = idx === active;
          const box = (Math.floor(idx / 27) + Math.floor((idx % 9) / 3)) % 2 === 0;
          return (
            <div
              key={idx}
              className="readout tnum grid place-content-center text-[clamp(0.6rem,2.4vw,0.85rem)]"
              style={{
                background: isActive ? "var(--amber-soft)" : box ? "var(--panel-2)" : "var(--panel)",
                color: isGiven ? "var(--ink)" : v ? (phase === "done" ? "var(--pass)" : "var(--amber)") : "transparent",
                fontWeight: isGiven ? 700 : 400,
              }}
            >
              {v || "."}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
        {stats ? (
          <>
            <Stat label="Placements" value={String(stats.placements)} />
            <Stat label="Backtracks" value={String(stats.backtracks)} />
            <Stat label="Time" value={`${stats.ms.toFixed(1)} ms`} />
            <Stat label="Result" value={stats.unique ? "unique" : "multiple"} good={stats.unique} />
          </>
        ) : (
          <span className="text-data text-ink-faint">
            The same class of solver that verifies every published puzzle has one and only one solution.
          </span>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return (
    <span className="label">
      {label}{" "}
      <span className="readout tnum" style={{ color: good ? "var(--pass)" : "var(--amber)" }}>
        {value}
      </span>
    </span>
  );
}
