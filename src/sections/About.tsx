import { useRef } from 'react'
import { motion } from 'framer-motion'
import { MaskedLines } from '../components/MaskedLines'
import { site, type Fact } from '../content/site'
import { EASE_OUT, DUR } from '../lib/motion'
import { useCountUp } from '../hooks/useCountUp'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

function FactValue({ fact, active, instant }: { fact: Fact; active: boolean; instant: boolean }) {
  const n = useCountUp(fact.value ?? 0, active, instant)
  if (fact.value !== undefined) {
    return (
      <span className="flex items-baseline gap-3">
        <span className="tabular-nums text-accent">{n}</span>
        {fact.note && <span className="text-paper/60">{fact.note}</span>}
      </span>
    )
  }
  return <span>{fact.list?.join(' / ')}</span>
}

export function About() {
  const listRef = useRef<HTMLUListElement>(null)
  const inView = useInView(listRef)
  const reduced = useReducedMotion()

  return (
    <section id="about" className="relative grid grid-cols-1 gap-x-8 px-5 py-[18vh] md:grid-cols-12 md:px-12 md:py-[24vh]">
      <div className="md:col-span-5">
        <p className="mb-8 text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:text-xs">04 / About</p>
        <MaskedLines
          as="h2"
          lines={site.about.heading}
          inView
          className="font-display text-[clamp(3rem,7.5vw,9rem)] leading-[0.9] tracking-[-0.03em]"
        />
        <motion.p
          className="mt-10 max-w-[38ch] text-[0.8rem] leading-[1.8] text-paper/75 md:mt-14 md:text-sm"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 0.3 }}
        >
          {site.about.text}
        </motion.p>
      </div>

      <ul ref={listRef} className="mt-16 md:col-span-6 md:col-start-7 md:mt-[26vh]">
        {site.facts.map((fact, i) => (
          <motion.li
            key={fact.label}
            className="hairline grid grid-cols-[1fr_auto] items-baseline gap-6 border-t py-4 text-[0.75rem] md:py-5 md:text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: DUR.base, ease: EASE_OUT, delay: i * 0.1 }}
          >
            <span className="text-paper/55">{fact.label}</span>
            <FactValue fact={fact} active={inView} instant={reduced} />
          </motion.li>
        ))}
        <li className="hairline border-t" />
      </ul>
    </section>
  )
}
