import { motion, useReducedMotion } from "motion/react";
import type { DeployState } from "@/lib/data";

// Status is never color alone (WCAG 1.4.1): each state carries a distinct shape
// AND a persistent word, so it survives colorblindness and reduced motion.
const MAP: Record<DeployState, { color: string; word: string; sub: string; shape: "ring" | "dot" }> = {
  "live-app": { color: "var(--pass)", word: "LIVE", sub: "APP", shape: "ring" },
  "live-site": { color: "var(--pass)", word: "LIVE", sub: "SITE", shape: "ring" },
  repo: { color: "var(--amber)", word: "REPO", sub: "ONLY", shape: "dot" },
};

export function StatusLED({ state }: { state: DeployState }) {
  const reduced = useReducedMotion();
  const m = MAP[state];

  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <motion.svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        aria-hidden="true"
        initial={reduced ? false : { scale: 0.6 }}
        animate={reduced ? undefined : { scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ color: m.color }}
      >
        {m.shape === "ring" ? (
          <>
            <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M4.4 7.2 L6.2 9 L9.6 4.9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <circle cx="7" cy="7" r="4" fill="currentColor" />
        )}
      </motion.svg>
      <span className="label" style={{ color: m.color, letterSpacing: "0.14em" }}>
        {m.word}
        <span className="text-ink-faint"> {m.sub}</span>
      </span>
    </span>
  );
}
