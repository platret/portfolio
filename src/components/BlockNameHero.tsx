import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { subscribeRaf } from "@/hooks/useSharedRaf";

// 3x5 block font for the glyphs in "ALEX PLATRET".
const FONT: Record<string, string[]> = {
  A: ["111", "101", "111", "101", "101"],
  L: ["100", "100", "100", "100", "111"],
  E: ["111", "100", "111", "100", "111"],
  X: ["101", "101", "010", "101", "101"],
  P: ["111", "101", "111", "100", "100"],
  R: ["111", "101", "111", "110", "101"],
  T: ["111", "010", "010", "010", "010"],
  " ": ["000", "000", "000", "000", "000"],
};

const LINES = ["ALEX", "PLATRET"];
const AMBER = [243, 175, 73];
const INK = [239, 235, 226];

type Block = { tx: number; ty: number; startY: number; delay: number; lockAt: number };

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Attract sequence: tetromino-style blocks rain down and assemble the name,
// then drop away as the real wordmark resolves in. Decorative, aria-hidden.
export function BlockNameHero({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion() ?? false;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      onDone();
      return;
    }

    let blocks: Block[] = [];
    let cell = 12;
    let originX = 0;
    let originY = 0;
    let W = 0;
    let H = 0;

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.max(...LINES.map((l) => l.length * 4 - 1));
      const rows = LINES.length * 5 + (LINES.length - 1) * 2;
      cell = Math.floor(Math.min((W * 0.86) / cols, (H * 0.8) / rows));
      cell = Math.max(6, cell);
      const gridW = cols * cell;
      const gridH = rows * cell;
      originX = (W - gridW) / 2;
      originY = (H - gridH) / 2;

      blocks = [];
      LINES.forEach((line, li) => {
        const lineCols = line.length * 4 - 1;
        const lineOffset = (cols - lineCols) / 2;
        let cursor = 0;
        for (const ch of line) {
          const glyph = FONT[ch] ?? FONT[" "];
          for (let gy = 0; gy < 5; gy++) {
            for (let gx = 0; gx < 3; gx++) {
              if (glyph[gy][gx] !== "1") continue;
              const col = lineOffset + cursor + gx;
              const row = li * 7 + gy;
              blocks.push({
                tx: originX + col * cell,
                ty: originY + row * cell,
                startY: -cell * (4 + ((col * 7) % 9)),
                delay: col * 24 + (gy % 3) * 26,
                lockAt: -1,
              });
            }
          }
          cursor += 4;
        }
      });
    };

    layout();

    const fall = 540;
    const maxDelay = blocks.reduce((m, b) => Math.max(m, b.delay), 0);
    const settleEnd = maxDelay + fall;
    const holdEnd = settleEnd + 520;
    let t0 = -1;
    let exitFired = false;

    const draw = (now: number, _dt: number) => {
      if (t0 < 0) t0 = now;
      const e = now - t0;
      ctx.clearRect(0, 0, W, H);
      const inExit = e > holdEnd;
      const exitT = inExit ? (e - holdEnd) / 520 : 0;

      const gap = Math.max(1, Math.round(cell * 0.12));
      const size = cell - gap;

      for (const b of blocks) {
        const local = e - b.delay;
        const t = Math.max(0, Math.min(1, local / fall));
        let y = lerp(b.startY, b.ty, easeOutQuint(t));
        if (t >= 1 && b.lockAt < 0) b.lockAt = e;

        let r = AMBER[0], g = AMBER[1], bl = AMBER[2];
        if (b.lockAt >= 0) {
          const settle = Math.max(0, Math.min(1, (e - b.lockAt - 160) / 320));
          r = lerp(AMBER[0], INK[0], settle);
          g = lerp(AMBER[1], INK[1], settle);
          bl = lerp(AMBER[2], INK[2], settle);
        }

        let alpha = 1;
        if (inExit) {
          y += easeOutQuint(Math.min(1, exitT)) * (H - b.ty + cell * 6);
          alpha = 1 - Math.min(1, exitT);
        }

        ctx.fillStyle = `rgba(${r | 0},${g | 0},${bl | 0},${alpha})`;
        ctx.fillRect(b.tx, y, size, size);
      }

      if (e > settleEnd && !exitFired && !doneRef.current) {
        // fire onDone as blocks begin dropping away, so the wordmark overlaps in
        exitFired = true;
      }
      if (e > holdEnd && !doneRef.current) {
        doneRef.current = true;
        onDone();
      }
      if (inExit && exitT >= 1) {
        ctx.clearRect(0, 0, W, H);
        unsub();
      }
    };

    const unsub = subscribeRaf(draw);
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
