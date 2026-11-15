import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MaskedLines } from '../components/MaskedLines'
import { site } from '../content/site'
import { EASE_OUT, DUR } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Link } from '../router/router'

// The full choreography plays once per session. Coming back to Home, it runs four times faster.
let heroPlayed = false

export function Hero() {
  const reduced = useReducedMotion()
  const [pace] = useState(() => (heroPlayed ? 0.25 : 1))

  useEffect(() => {
    heroPlayed = true
  }, [])

  return (
    <section className="relative h-[60svh] min-h-[400px] max-h-[480px] overflow-hidden md:h-[100svh] md:min-h-[540px] md:max-h-none">
      <div className="absolute right-5 top-14 text-right md:right-12 md:top-[56%] md:mt-4">
        <MaskedLines
          as="p"
          lines={[site.role, site.employer, site.location]}
          className="text-[0.7rem] uppercase leading-[1.7] tracking-[0.08em] md:text-xs"
          delay={0.9 * pace}
        />
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute left-0 right-0 top-[34%] md:top-[56%] h-px origin-left bg-paper/30"
        initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
        animate={reduced ? { opacity: 1 } : { scaleX: 1 }}
        transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 0.5 * pace }}
      />

      <motion.div
        className="absolute left-5 right-5 top-[34%] mt-4 flex flex-col items-start gap-3 md:left-12 md:right-auto md:top-[56%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.base, ease: EASE_OUT, delay: 1.5 * pace }}
      >
        <p className="max-w-[26ch] text-[0.7rem] leading-[1.7] text-paper/60 md:text-xs">Interfaces first. Everything behind them, too.</p>
        <Link
          to={site.status.to}
          data-cursor="hover"
          className="group inline-flex items-center gap-2.5 rounded-full border border-paper/15 bg-paper/[0.03] py-1 pl-2.5 pr-3 text-[0.65rem] text-paper/70 transition-colors hover:border-accent/60 hover:text-paper md:text-[0.7rem]"
        >
          <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="text-paper/50">{site.status.label}</span>
          {site.status.value}
        </Link>
      </motion.div>

      <MaskedLines
        as="h1"
        tabIndex={-1}
        lines={site.nameLines}
        className="absolute bottom-0 left-[-0.045em] font-display text-[62vw] leading-[0.78] md:text-[clamp(15vw,18vw,20vw)] tracking-[-0.03em] text-paper outline-none"
        delay={0.2 * pace}
      />
    </section>
  )
}
