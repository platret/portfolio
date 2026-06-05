import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { subscribeRaf } from "@/hooks/useSharedRaf";
import { useInView } from "@/hooks/useInView";

// Frame-time oscilloscope. Allocation-free: a Float32Array ring buffer sized
// once, a single cursor, no per-frame literals, sampled at ~30fps inside the
// one shared rAF. Off-screen it never subscribes. Reduced motion draws a single
// static snapshot. It graphs the spikes its own existence would cause, honestly.
const N = 96;

export function Scope({ className }: { className?: string }) {
  const reduced = useReducedMotion() ?? false;
  const { ref: holderRef, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buf = new Float32Array(N).fill(16.7);
    let cursor = 0;
    let W = 0;
    let H = 0;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      // baseline
      ctx.strokeStyle = "rgba(120,110,95,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, H * 0.5);
      ctx.lineTo(W, H * 0.5);
      ctx.stroke();
      // trace: map 8..40ms -> H..0
      ctx.strokeStyle = "rgba(243,175,73,0.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const idx = (cursor + i) % N;
        const ms = buf[idx];
        const norm = Math.max(0, Math.min(1, (ms - 8) / 32));
        const x = (i / (N - 1)) * W;
        const y = H - norm * H;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    if (reduced || !inView) {
      // static representative snapshot, drawn once
      for (let i = 0; i < N; i++) buf[i] = 16.7 + Math.sin(i * 0.4) * 1.6;
      size();
      render();
      window.removeEventListener("resize", size);
      return () => window.removeEventListener("resize", size);
    }

    let acc = 0;
    const unsub = subscribeRaf((_now, dt) => {
      acc += dt;
      if (acc < 33) return; // throttle to ~30fps
      acc = 0;
      buf[cursor] = dt;
      cursor = (cursor + 1) % N;
      render();
    });
    return () => {
      unsub();
      window.removeEventListener("resize", size);
    };
  }, [reduced, inView]);

  return (
    <div ref={holderRef} className={className}>
      <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
    </div>
  );
}
