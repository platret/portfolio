import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { subscribeRaf } from "@/hooks/useSharedRaf";

// Honest telemetry: shows the page's actual measured frame time and rate,
// read off the single shared rAF. Writes to the DOM directly (no per-frame
// React render). Under reduced motion it reports a static label instead.
export function FrameReadout() {
  const reduced = useReducedMotion() ?? false;
  const msRef = useRef<HTMLSpanElement>(null);
  const hzRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) return;
    let avg = 16.7;
    let acc = 0;
    let frames = 0;
    const unsub = subscribeRaf((_now, dt) => {
      avg += (dt - avg) * 0.08; // smooth
      acc += dt;
      frames++;
      if (acc >= 250) {
        if (msRef.current) msRef.current.textContent = avg.toFixed(1);
        if (hzRef.current) hzRef.current.textContent = (1000 / avg).toFixed(1);
        acc = 0;
        frames = 0;
      }
    });
    return unsub;
  }, [reduced]);

  return (
    <span className="readout text-label tracking-[0.12em] text-ink-faint uppercase">
      <span className="text-ink-dim">Frame</span>{" "}
      {reduced ? (
        <span className="text-ink-dim">static</span>
      ) : (
        <>
          <span ref={msRef} className="tnum text-amber">16.7</span>
          <span className="text-ink-faint">ms</span>{" "}
          <span className="text-seam-bright">/</span>{" "}
          <span ref={hzRef} className="tnum text-amber">60.0</span>
          <span className="text-ink-faint">hz</span>
        </>
      )}
    </span>
  );
}
