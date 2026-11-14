import { useRef, useState, type KeyboardEvent } from 'react'
import { BrowserFrame } from '../components/BrowserFrame'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type { Feature } from '../content/site'

const src = (file: string) => `${import.meta.env.BASE_URL}images/${file}`

export function FeaturedProject({ feature, flip = false }: { feature: Feature; flip?: boolean }) {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const reduced = useReducedMotion()
  const { screens, id } = feature

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % screens.length
    else if (event.key === 'ArrowLeft') next = (index + screens.length - 1) % screens.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = screens.length - 1
    else return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  const wide = feature.frame === 'browser'

  return (
    <article
      id={`feature-${id}`}
      aria-labelledby={`${id}-title`}
      className={`hairline mb-16 grid min-w-0 gap-10 border-t pt-8 md:mb-24 md:gap-16 md:pt-12 ${
        wide ? 'md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]' : 'md:grid-cols-2'
      }`}
    >
      <div className={`min-w-0 md:py-10 ${flip ? 'md:order-2' : ''}`}>
        <p className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.65rem] uppercase tracking-[0.12em] text-accent md:text-xs">
          {feature.kicker}
          {feature.status && (
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 px-2.5 py-0.5 normal-case tracking-[0.02em] text-paper/70">
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {feature.status}
            </span>
          )}
        </p>
        <h2 id={`${id}-title`} className="max-w-[13ch] font-display text-[clamp(2.7rem,5.7vw,6.8rem)] leading-[0.98] tracking-[-0.03em]">
          {feature.title.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>
        <p className="mt-6 max-w-[48ch] text-xs leading-[1.9] text-paper/70 md:text-sm">{feature.lede}</p>
        <dl className="mt-8 max-w-[48ch] space-y-6 text-xs leading-[1.9]">
          <div>
            <dt className="mb-1 text-paper">What I built</dt>
            <dd className="text-paper/60">{feature.built}</dd>
          </div>
          <div>
            <dt className="mb-1 text-paper">One deliberate choice</dt>
            <dd className="text-paper/60">{feature.choice}</dd>
          </div>
        </dl>
        <a href={feature.href} target="_blank" rel="noreferrer" data-cursor="hover" className="group mt-8 inline-flex min-h-11 items-center gap-6 border-b border-paper/40 text-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          {feature.cta} <span aria-hidden="true" className="transition-transform motion-safe:group-hover:translate-x-1">↗</span>
        </a>
      </div>

      <div className={`min-w-0 ${flip ? 'md:order-1' : ''}`}>
        <div role="tablist" aria-label={`${feature.title.join(' ')} screens`} className="hairline mb-6 grid grid-cols-3 border-b">
          {screens.map((screen, index) => (
            <button key={screen.label} ref={element => { tabs.current[index] = element }} id={`${id}-tab-${index}`} role="tab" type="button" aria-selected={active === index} aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)} data-cursor="hover" className={`min-h-12 border-b-2 px-2 text-[0.7rem] transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${active === index ? 'border-accent text-paper' : 'border-transparent text-paper/50 hover:text-paper'}`}>
              {screen.label}
            </button>
          ))}
        </div>
        {screens.map((screen, index) => (
          <div key={screen.label} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0} className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <motion.figure initial={false} animate={{ opacity: active === index ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.25 }}>
              {wide ? (
                <BrowserFrame domain={feature.domain}>
                  <img src={src(screen.file)} alt={screen.alt} width={1440} height={900} loading="lazy" decoding="async" className="block h-auto w-full" />
                </BrowserFrame>
              ) : (
                <div className="bg-[#141614] px-6 py-8 md:py-10">
                  <img src={src(screen.file)} alt={screen.alt} width={1206} height={2622} loading="lazy" decoding="async" className="mx-auto h-auto w-full max-w-[260px] rounded-[24px] md:max-w-[280px]" />
                </div>
              )}
              <figcaption className="mt-4 min-h-[4.5em] text-[0.7rem] leading-[1.7] text-paper/60"><span className="mr-3 text-accent">0{index + 1}</span>{screen.caption}<span className="mt-1 block text-paper/40">{feature.note}</span></figcaption>
            </motion.figure>
          </div>
        ))}
      </div>
    </article>
  )
}
