import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { site, type NowItem } from '../content/site'
import { EASE_OUT, EASE_OUT_CSS, DUR } from '../lib/motion'
import { useClock } from '../hooks/useClock'
import { useIsTouch } from '../hooks/useIsTouch'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { MaskedLines } from '../components/MaskedLines'
import { PortraitCanvas } from './PortraitCanvas'

function Clock({ zone }: { zone: string }) {
  const time = useClock(zone)
  return (
    <span className="tabular-nums text-accent">
      {time}
    </span>
  )
}

function NowRow({ item, index }: { item: NowItem; index: number }) {
  return (
    <motion.li
      className="hairline grid grid-cols-[1fr_auto] items-baseline gap-6 border-t py-4 text-[0.75rem] md:py-5 md:text-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: DUR.base, ease: EASE_OUT, delay: 0.2 + index * 0.1 }}
    >
      <span className="text-paper/55">{item.label}</span>
      <span className="flex items-baseline gap-3 text-right">
        <span>{item.value}</span>
        {item.clock && <Clock zone={item.clock} />}
      </span>
    </motion.li>
  )
}

export function Now() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [gl, setGl] = useState(false)
  const onReady = useCallback((ok: boolean) => setGl(ok), [])
  const touch = useIsTouch()
  const reduced = useReducedMotion()
  const webgl = !touch && !reduced

  return (
    <section id="now" className="relative grid grid-cols-1 gap-x-8 px-5 py-16 md:grid-cols-12 md:px-12 md:py-[22vh]">
      <p className="mb-8 text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:col-span-12 md:mb-16 md:text-xs">03 / Now</p>

      <motion.div
        className="md:col-span-5 md:-ml-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: DUR.slow, ease: EASE_OUT }}
      >
        <div ref={frameRef} className="relative aspect-[4/5] w-full overflow-hidden" data-cursor="hover">
          <img
            src={site.portrait.src}
            alt={site.portrait.alt}
            className="h-full w-full object-cover"
            style={{ opacity: gl ? 0 : 1, transition: `opacity ${DUR.fast}s ${EASE_OUT_CSS}` }}
          />
          {webgl && <PortraitCanvas frameRef={frameRef} src={site.portrait.src} onReady={onReady} />}
        </div>
        <p className="mt-4 text-[0.7rem] text-paper/40 md:text-xs">Away from the screen: DJ sets, the gym and a good game.</p>
      </motion.div>

      <div className="mt-16 md:col-span-6 md:col-start-7 md:mt-[18vh]">
        <MaskedLines
          as="h2"
          lines={['Right now,', 'in Zurich.']}
          inView
          className="mb-10 font-display text-[clamp(2.6rem,6vw,7.5rem)] leading-[0.92] tracking-[-0.03em] md:mb-16"
        />
        <ul>
          {site.now.map((item, i) => (
            <NowRow key={item.label} item={item} index={i} />
          ))}
          <li className="hairline border-t" />
        </ul>
      </div>
    </section>
  )
}
