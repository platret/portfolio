import { useRef, useState, type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { site } from '../content/site'

const screens = [
  { label: 'Capture', file: 'capture.png', caption: 'Save a thought, photo or voice memo. Organise it later.', alt: 'Lernspur capture screen with a note field, photo and voice memo controls' },
  { label: 'Practice', file: 'cards.png', caption: 'Turn what you learn into cards you can come back to.', alt: 'Lernspur practice screen showing a database JOIN question and its answer' },
  { label: 'Reports', file: 'report.png', caption: 'Reflect on the work, then export a structured learning report.', alt: 'Lernspur learning report with reflection sections and a PDF export button' },
]

export function FeaturedProject() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const reduced = useReducedMotion()

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

  return (
    <article aria-labelledby="featured-title" className="hairline mb-16 grid min-w-0 gap-10 border-t pt-8 md:mb-24 md:grid-cols-2 md:gap-16 md:pt-12">
      <div className="min-w-0 md:py-10">
        <p className="mb-6 text-[0.65rem] uppercase tracking-[0.12em] text-accent md:text-xs">In focus / Lernspur</p>
        <h2 id="featured-title" className="max-w-[13ch] font-display text-[clamp(2.7rem,5.7vw,6.8rem)] leading-[0.98] tracking-[-0.03em]">Small moments.<br />A visible learning path.</h2>
        <p className="mt-6 max-w-[48ch] text-xs leading-[1.9] text-paper/70 md:text-sm">An apprenticeship is full of things worth remembering. Lernspur gives those small moments a home, from a quick note to a learning report.</p>
        <dl className="mt-8 max-w-[48ch] space-y-6 text-xs leading-[1.9]">
          <div>
            <dt className="mb-1 text-paper">What I built</dt>
            <dd className="text-paper/60">A native SwiftUI app for capturing notes, revisiting learning and writing structured reports, with PDF export.</dd>
          </div>
          <div>
            <dt className="mb-1 text-paper">One deliberate choice</dt>
            <dd className="text-paper/60">Save first, organise later. The journal lives locally in SQLite, so capturing a thought does not depend on a server.</dd>
          </div>
        </dl>
        <a href={site.projects[0].href} target="_blank" rel="noreferrer" data-cursor="hover" className="group mt-8 inline-flex min-h-11 items-center gap-6 border-b border-paper/40 text-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          Explore Lernspur <span aria-hidden="true" className="transition-transform motion-safe:group-hover:translate-x-1">↗</span>
        </a>
      </div>

      <div className="min-w-0">
        <div role="tablist" aria-label="Lernspur app screens" className="hairline mb-6 grid grid-cols-3 border-b">
          {screens.map((screen, index) => (
            <button key={screen.label} ref={element => { tabs.current[index] = element }} id={`lernspur-tab-${index}`} role="tab" type="button" aria-selected={active === index} aria-controls={`lernspur-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)} data-cursor="hover" className={`min-h-12 border-b-2 px-2 text-[0.7rem] transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${active === index ? 'border-accent text-paper' : 'border-transparent text-paper/50 hover:text-paper'}`}>
              {screen.label}
            </button>
          ))}
        </div>
        {screens.map((screen, index) => (
          <div key={screen.label} id={`lernspur-panel-${index}`} role="tabpanel" aria-labelledby={`lernspur-tab-${index}`} hidden={active !== index} tabIndex={0} className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <motion.figure initial={false} animate={{ opacity: active === index ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.25 }}>
              <div className="bg-[#141614] px-6 py-8 md:py-10">
                <img src={`${import.meta.env.BASE_URL}images/lernspur/${screen.file}`} alt={screen.alt} width={1206} height={2622} loading="lazy" decoding="async" className="mx-auto h-auto w-full max-w-[260px] rounded-[24px] md:max-w-[280px]" />
              </div>
              <figcaption className="mt-4 min-h-[4.5em] text-[0.7rem] leading-[1.7] text-paper/60"><span className="mr-3 text-accent">0{index + 1}</span>{screen.caption}<span className="mt-1 block text-paper/40">Native app screenshot · Example content</span></figcaption>
            </motion.figure>
          </div>
        ))}
      </div>
    </article>
  )
}
