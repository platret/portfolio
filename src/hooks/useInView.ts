import { useEffect, useRef, useState } from "react";

// Fires once when the element enters the viewport. Used to gate count-ups,
// canvas loops, and self-draws so nothing animates off-screen.
export function useInView<T extends HTMLElement>(
  opts: IntersectionObserverInit = { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      }
    }, opts);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView } as const;
}
