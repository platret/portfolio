import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { hackathon as hack } from '../content/competitions'
import { ScrollTrigger, requestRefresh } from '../lib/gsap'
import { asset } from '../lib/paths'
import { EASE_OUT, DUR } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { MaskedLines } from '../components/MaskedLines'
import { BrowserFrame } from '../components/BrowserFrame'

const HOURS = 24
const pad = (n: number) => String(Math.floor(n)).padStart(2, '0')

function formatElapsed(progress: number) {
  const total = Math.round(progress * HOURS * 3600)
  return `${pad(total / 3600)}:${pad((total % 3600) / 60)}:${pad(total % 60)}`
}

// Beat i lights up once the clock passes its share of the 24 hours.
const beatAt = (i: number) => (i + 0.5) / hack.beats.length

export function Hackathon() {
  const sectionRef = useRef<HTMLElement>(null)
  const clockRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [lit, setLit] = useState(reduced ? hack.beats.length : 0)

  useEffect(() => {
    const section = sectionRef.current
    const clock = clockRef.current
    const bar = barRef.current
    if (!section || !clock || !bar) return

    const paint = (p: number) => {
      clock.textContent = formatElapsed(p)
      bar.style.transform = `scaleX(${p})`
      const n = hack.beats.filter((_, i) => p >= beatAt(i) - 0.0001).length
      setLit((prev) => (prev === n ? prev : n))
    }

    if (reduced) {
      paint(1)
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 65%',
      end: 'bottom 85%',
      onUpdate: (self) => paint(self.progress),
      onRefresh: (self) => paint(self.progress),
    })

    return () => {
      trigger.kill()
      requestRefresh()
    }
  }, [reduced])

  return (
    <section ref={sectionRef} id="zentralhack" aria-label={`${hack.event}: ${hack.name}`} className="relative px-5 py-16 md:px-12 md:pb-[10vh] md:pt-[20vh]">
      <div className="mb-10 flex items-end justify-between text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:mb-16 md:text-xs">
        <span>Hackathon</span>
        <span>{hack.month}</span>
      </div>

      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-12">
        <div className="md:sticky md:top-[max(14vh,calc(var(--header-h)+1.5rem))] md:col-span-5 md:self-start">
          <p className="mb-3 text-[0.65rem] uppercase tracking-[0.12em] text-accent md:text-xs">{hack.event}</p>
          <p aria-hidden="true" className="font-mono text-[clamp(3rem,6.4vw,7.6rem)] leading-none tracking-[-0.04em] tabular-nums">
            <span ref={clockRef}>{reduced ? '24:00:00' : '00:00:00'}</span>
          </p>
          <span className="sr-only">A 24 hour hackathon.</span>
          <div className="relative mt-5 h-px w-full bg-paper/15" aria-hidden="true">
            <div ref={barRef} className="absolute inset-0 origin-left bg-accent" style={{ transform: reduced ? 'scaleX(1)' : 'scaleX(0)' }} />
          </div>
          <div aria-hidden="true" className="mt-2 flex justify-between text-[0.6rem] text-paper/50 md:text-[0.65rem]">
            <span>Kick-off</span>
            <span>Pitch</span>
          </div>

          <ol className="mt-10 space-y-5 md:mt-14">
            {hack.beats.map((beat, i) => {
              const on = i < lit
              const current = i === lit - 1
              return (
                <li key={beat.label} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 text-[0.75rem] leading-[1.6] md:text-xs">
                  <span className={`pt-px tabular-nums transition-colors duration-500 ${on ? 'text-accent' : 'text-paper/30'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-35'}`}>
                    <span className="flex items-center gap-2 text-paper">
                      {beat.label}
                      {current && !reduced && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse" />}
                    </span>
                    <span className="mt-0.5 block max-w-[40ch] text-paper/55">{beat.detail}</span>
                  </span>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-16 min-w-0 md:col-span-7 md:mt-0">
          <p className="mb-6 flex flex-wrap gap-x-3 gap-y-1 text-[0.65rem] uppercase tracking-[0.12em] text-paper/50 md:text-xs">
            <span className="text-paper">{hack.name}</span>
            <span aria-hidden="true">/</span>
            <span>{hack.track}</span>
            <span aria-hidden="true">/</span>
            <span>{hack.team}</span>
          </p>
          <MaskedLines
            as="h2"
            lines={hack.title}
            inView
            className="font-display text-[clamp(2.6rem,5.6vw,6.8rem)] leading-[0.95] tracking-[-0.03em]"
          />
          <motion.p
            className="mt-8 max-w-[52ch] text-xs leading-[1.9] text-paper/70 md:text-sm"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 0.2 }}
          >
            {hack.text}
          </motion.p>

          <motion.div
            className="relative mt-12 pb-16 md:mt-16 md:pb-24"
            initial={reduced ? false : { opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: DUR.slow, ease: EASE_OUT }}
          >
            <BrowserFrame domain="roschade.alexplatret.com">
              <img src={asset(hack.shots.web.file)} alt={hack.shots.web.alt} width={1440} height={900} loading="lazy" decoding="async" className="block h-auto w-full" />
            </BrowserFrame>
            <div className="absolute -bottom-2 right-3 flex gap-3 md:right-6 md:gap-4">
              {hack.shots.phones.map((phone, i) => (
                <img
                  key={phone.file}
                  src={asset(phone.file)}
                  alt={phone.alt}
                  width={603}
                  height={1311}
                  loading="lazy"
                  decoding="async"
                  className={`w-[24vw] max-w-[150px] rounded-[18px] border border-paper/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] md:w-[11vw] md:max-w-[170px] md:rounded-[22px] ${i === 0 ? 'translate-y-6' : ''}`}
                />
              ))}
            </div>
          </motion.div>

          <div className="hairline mt-10 flex flex-col gap-6 border-t pt-6 sm:flex-row sm:items-start sm:justify-between">
            <ul className="flex flex-wrap gap-2" aria-label="Stack">
              {hack.stack.map((item) => (
                <li key={item} className="rounded-full border border-paper/15 px-3 py-1 text-[0.65rem] text-paper/60">{item}</li>
              ))}
            </ul>
            <ul className="flex shrink-0 gap-6 text-xs">
              {hack.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noreferrer" data-cursor="hover" className="group inline-flex min-h-11 items-center gap-3 border-b border-paper/40">
                    {link.label} <span aria-hidden="true" className="transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
