import { motion } from 'framer-motion'
import { FactRows } from '../components/FactRows'
import { MaskedLines } from '../components/MaskedLines'
import { site } from '../content/site'
import { EASE_OUT, DUR } from '../lib/motion'

export function About() {
  return (
    <section className="relative grid grid-cols-1 gap-x-8 px-5 py-10 md:grid-cols-12 md:px-12 md:pb-0 md:pt-[8vh]">
      <div className="md:col-span-5">
        <MaskedLines
          as="h1"
          tabIndex={-1}
          lines={site.about.heading}
          className="font-display text-[clamp(3rem,7.5vw,9rem)] leading-[0.9] tracking-[-0.03em] outline-none"
        />
        <motion.p
          className="mt-10 max-w-[38ch] text-[0.8rem] leading-[1.8] text-paper/75 md:mt-14 md:text-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 0.3 }}
        >
          {site.about.text}
        </motion.p>
      </div>

      <FactRows rows={site.facts} className="mt-14 md:col-span-6 md:col-start-7 md:mt-[22vh]" />
    </section>
  )
}
