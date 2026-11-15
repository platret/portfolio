import { useState } from 'react'
import { motion } from 'framer-motion'
import { competitions } from '../content/competitions'
import { history } from '../content/history'
import { nav, type NavId } from '../content/nav'
import { site } from '../content/site'
import { useIsTouch } from '../hooks/useIsTouch'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { EASE_OUT, EASE_OUT_CSS, DUR } from '../lib/motion'
import { asset } from '../lib/paths'
import { Link } from '../router/router'

// Stage 2 reads the count and the eight featured icons from content/apps.ts.
const icons = site.projects.flatMap((project) => (project.icon ? [project.icon] : [])).slice(0, 8)
const result = competitions.find((competition) => !competition.upcoming)

/** The first line of each row's right column, computed from the content. */
const datum: Record<NavId, string> = {
  apps: `${site.projects.length} apps`,
  history: `${history[0].year} – ${history[history.length - 1].year}`,
  competitions: result ? `${result.name} ${result.figure}, ${result.note.toLowerCase()}` : '',
  about: site.location,
}

/** The four doors of the home page: one row per section, each a single link. */
export function HomeDoors() {
  const [hovered, setHovered] = useState<number | null>(null)
  const touch = useIsTouch()
  const reduced = useReducedMotion()
  const interactive = !touch && !reduced

  return (
    <nav aria-label="Sections" className="px-5 pb-4 md:px-12 md:pb-[4vh]" onPointerLeave={() => setHovered(null)}>
      <ul>
        {nav.map((item, i) => {
          const isHover = hovered === i
          const dim = hovered !== null && !isHover
          const transform = isHover
            ? 'translate3d(2vw, 0, 0)'
            : hovered === i + 1
              ? 'translate3d(0, -0.9vw, 0)'
              : hovered === i - 1
                ? 'translate3d(0, 0.9vw, 0)'
                : 'translate3d(0, 0, 0)'

          return (
            <li key={item.id} onPointerEnter={interactive ? () => setHovered(i) : undefined} onPointerLeave={interactive ? () => setHovered(null) : undefined}>
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: DUR.slow, ease: EASE_OUT, delay: i * 0.1 }}
              >
                <Link
                  to={item.to}
                  className="hairline grid border-t py-6 -outline-offset-2 md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-8 md:py-[2.6vw]"
                  style={{
                    transform,
                    opacity: dim ? 0.3 : 1,
                    transition: `transform ${DUR.base}s ${EASE_OUT_CSS}, opacity ${DUR.fast}s ${EASE_OUT_CSS}`,
                  }}
                >
                  <span className="block">
                    <span className="block font-display text-[9vw] leading-[0.95] tracking-[-0.02em] md:text-[clamp(2.2rem,5vw,6.5rem)]">{item.label}</span>
                    {item.id === 'apps' && icons.length > 0 && (
                      <span className="mt-4 flex gap-2 md:mt-5">
                        {icons.map((icon) => (
                          <img key={icon} src={asset(icon)} alt="" width={40} height={40} loading="lazy" decoding="async" className="h-10 w-10 rounded-[22%] bg-panel object-cover" />
                        ))}
                      </span>
                    )}
                  </span>
                  <span className="mt-4 block text-[0.7rem] leading-[1.6] text-paper/60 md:mt-0 md:max-w-[38ch] md:pt-[0.6vw] md:text-right md:text-xs">
                    <span className="block text-paper">{datum[item.id]}</span>
                    <span className="block">{item.blurb}</span>
                  </span>
                </Link>
              </motion.div>
            </li>
          )
        })}
      </ul>
      <div className="hairline border-t" />
    </nav>
  )
}
