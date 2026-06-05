import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BlockNameHero } from "./BlockNameHero";
import { HeroShader } from "./HeroShader";
import { FrameReadout } from "./FrameReadout";
import { IctGauge } from "./Gauge";
import { person } from "@/lib/data";
import { ease } from "@/lib/motion";

export function Masthead() {
  const reduced = useReducedMotion() ?? false;
  const [nameShown, setNameShown] = useState(reduced);

  return (
    <header data-sheet="00" className="relative min-h-[100svh] overflow-hidden">
      <HeroShader />

      {/* HUD bar */}
      <div className="mx-auto flex max-w-frame items-center justify-between px-5 pt-6 sm:px-8">
        <span className="label">AP&middot;2026 / Operator</span>
        <div className="flex items-center gap-5">
          <FrameReadout />
          <a
            href="#/resume"
            className="label border border-seam px-3 py-1.5 text-ink-dim transition-colors hover:border-amber hover:text-amber"
          >
            Resume &rsaquo;
          </a>
        </div>
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-frame flex-col justify-center px-5 sm:px-8">
        {/* Name: blocks assemble, then the wordmark resolves in */}
        <div className="relative h-[26vh] min-h-[150px] w-full sm:h-[30vh]">
          <BlockNameHero onDone={() => setNameShown(true)} />
          <motion.h1
            className="absolute inset-0 flex items-center font-human font-extrabold leading-[0.9] tracking-[-0.02em] text-ink"
            style={{ fontSize: "var(--step-display)" }}
            initial={false}
            animate={{ opacity: nameShown ? 1 : 0, y: nameShown ? 0 : 10 }}
            transition={{ duration: 0.5, ease: ease.outExpo }}
          >
            Alex Platret
          </motion.h1>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 1.1, duration: 0.6 }}
          className="mt-6 max-w-prose"
        >
          <p className="font-human text-h2 text-ink">
            {person.role}
            <span className="text-ink-faint"> / </span>
            <span className="text-ink-dim">{person.status}</span>
          </p>
          <p className="mt-3 text-body text-ink-dim">{person.line}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="label">
              Age <span className="readout tnum text-ink-dim">{person.age}</span>
            </span>
            <span className="label">
              Base <span className="readout text-ink-dim">{person.city}</span>
            </span>
            <span className="label">
              School <span className="readout text-ink-dim">{person.school}</span>
            </span>
          </div>
        </motion.div>

        <div className="mt-10 border-t border-seam pt-6">
          <IctGauge />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2">
        <span className="label text-ink-faint">scroll</span>
      </div>
    </header>
  );
}
