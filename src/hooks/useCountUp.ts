import { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";
import { ease } from "@/lib/motion";

// Counts up to a real value like a gauge settling after power-on.
// Driven by motion's animate (batched). Under reduced motion it mounts final.
export function useCountUp(
  target: number,
  opts: { active: boolean; reduced: boolean; duration?: number; decimals?: number },
) {
  const { active, reduced, duration = 0.6, decimals = 0 } = opts;
  const [value, setValue] = useState(reduced ? target : 0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    if (reduced) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: ease.outQuint,
      onUpdate: (v) => setValue(decimals === 0 ? Math.round(v) : v),
    });
    return () => controls.stop();
  }, [active, reduced, target, duration, decimals]);

  return decimals === 0 ? Math.round(value) : Number(value.toFixed(decimals));
}
