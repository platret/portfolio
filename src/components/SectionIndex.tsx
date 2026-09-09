import { motion } from 'framer-motion'
import { site } from '../content/site'
import { EASE_OUT, EASE_OUT_CSS, DUR } from '../lib/motion'
import { scrollToId } from '../lib/scroll'
import { useActiveSection } from '../hooks/useActiveSection'

const ids = site.sections.map((s) => s.id)

export function SectionIndex() {
  const active = useActiveSection(ids)

  return (
    <motion.nav
      aria-label="Sections"
      className="fixed right-5 top-1/2 z-[70] hidden -translate-y-1/2 md:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: DUR.base, ease: EASE_OUT }}
    >
      <ol className="flex flex-col items-end gap-3">
        {site.sections.map((s, i) => {
          const on = s.id === active
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => scrollToId(s.id)}
                className="flex items-baseline gap-3 text-[0.65rem] uppercase tracking-[0.1em]"
                style={{ color: on ? '#FF4A17' : 'rgba(242,240,235,0.4)', transition: `color ${DUR.fast}s ${EASE_OUT_CSS}` }}
              >
                <span
                  className="overflow-hidden whitespace-nowrap"
                  style={{
                    maxWidth: on ? '8rem' : '0px',
                    opacity: on ? 1 : 0,
                    transition: `max-width ${DUR.base}s ${EASE_OUT_CSS}, opacity ${DUR.fast}s ${EASE_OUT_CSS}`,
                  }}
                >
                  {s.label}
                </span>
                <span>{String(i + 1).padStart(2, '0')}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </motion.nav>
  )
}
