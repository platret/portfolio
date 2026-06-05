import { useEffect } from "react";

// One perpetual requestAnimationFrame for the whole app. The frame readout and
// the oscilloscope share this single loop, never their own. Subscribers receive
// (now, dt) and should write to refs / canvas directly, never setState per frame.
type Frame = (now: number, dtMs: number) => void;

const subs = new Set<Frame>();
let rafId = 0;
let last = 0;

function loop(now: number) {
  const dt = last === 0 ? 16.7 : now - last;
  last = now;
  for (const cb of subs) cb(now, dt);
  rafId = requestAnimationFrame(loop);
}

export function subscribeRaf(cb: Frame): () => void {
  subs.add(cb);
  if (rafId === 0) {
    last = 0;
    rafId = requestAnimationFrame(loop);
  }
  return () => {
    subs.delete(cb);
    if (subs.size === 0 && rafId !== 0) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };
}

// React convenience wrapper. `active` gates subscription (e.g. only while in view
// and motion is allowed), so nothing runs off-screen.
export function useSharedRaf(cb: Frame, active: boolean) {
  useEffect(() => {
    if (!active) return;
    return subscribeRaf(cb);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
