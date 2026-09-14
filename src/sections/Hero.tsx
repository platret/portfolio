import { motion } from 'framer-motion'
import { MaskedLines } from '../components/MaskedLines'
import { site } from '../content/site'
import { EASE_OUT, DUR } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative h-[60svh] min-h-[400px] max-h-[480px] overflow-hidden md:h-[100svh] md:min-h-[540px] md:max-h-none">
      <div className="absolute right-5 top-5 text-right md:right-12 md:top-8">
        <MaskedLines
          as="p"
          lines={[site.role, site.employer, site.location]}
          className="text-[0.7rem] uppercase leading-[1.7] tracking-[0.08em] md:text-xs"
          delay={0.9}
        />
      </div>

      <div className="absolute left-5 top-5 md:left-12 md:top-8">
        <MaskedLines
          as="p"
          lines={['Portfolio', '2026']}
          className="text-[0.7rem] uppercase leading-[1.7] tracking-[0.08em] text-paper/50 md:text-xs"
          delay={1.1}
        />
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute left-0 right-0 top-[34%] md:top-[56%] h-px origin-left bg-paper/30"
        initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
        animate={reduced ? { opacity: 1 } : { scaleX: 1 }}
        transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 0.5 }}
      />

      <motion.p
        className="absolute left-5 top-[34%] md:top-[56%] mt-4 max-w-[26ch] text-[0.7rem] leading-[1.7] text-paper/60 md:left-12 md:text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.base, ease: EASE_OUT, delay: 1.5 }}
      >
        Interfaces first. Everything behind them, too.
      </motion.p>

      <MaskedLines
        as="h1"
        lines={site.nameLines}
        className="absolute bottom-0 left-[-0.045em] font-display text-[62vw] leading-[0.78] md:text-[clamp(15vw,18vw,20vw)] tracking-[-0.03em] text-paper"
        delay={0.2}
      />
    </section>
  )
}
