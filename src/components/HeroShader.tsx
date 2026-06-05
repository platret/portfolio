import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// paper-shaders ships no reduced-motion, offscreen, or blur handling, and its
// "pause" keeps the GL context alive. So pausing == unmounting, owned here.
// Pinned to @paper-design/shaders-react 0.0.76 (colors-array API).
const MeshGradient = lazy(() =>
  import("@paper-design/shaders-react").then((m) => ({ default: m.MeshGradient })),
);

const COLORS = ["#100e0a", "#1a140d", "#2a1d10", "#3c2a14"];

export function HeroShader() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced) return; // never import the shader on the reduced path
    const el = ref.current;
    if (!el) return;

    let onScreen = false;
    const sync = () => setActive(onScreen && document.visibilityState === "visible");

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.01 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [reduced]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Static warm-graphite still: the only thing reduced-motion users get. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 18% 0%, oklch(0.245 0.03 70) 0%, oklch(0.18 0.018 76) 42%, var(--bg) 78%)",
        }}
      />
      {active && (
        <Suspense fallback={null}>
          <MeshGradient
            colors={COLORS}
            distortion={0.8}
            swirl={0.18}
            speed={0.26}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.85 }}
          />
        </Suspense>
      )}
      {/* Scrim keeps headline contrast intact over any shader frame. */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, oklch(0.165 0.012 78 / 0.1), var(--bg))" }}
      />
    </div>
  );
}
