import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { MaskedLines } from './MaskedLines'
import { DUR, EASE_OUT } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Props = {
  /** Left side of the label row: the page name or a breadcrumb. */
  left: ReactNode
  /** Right side of the label row: a count, a range of years, a place. */
  right?: ReactNode
  /** The page heading, one string per line. Pages without it render their own h1. */
  title?: string[]
  /** A short paragraph beside the heading from 768 px, under it on phones. Needs `title`. */
  lead?: ReactNode
}

const TITLE = 'font-display text-[clamp(3rem,7.5vw,9rem)] leading-[0.9] tracking-[-0.03em] outline-none'

/** The top of every inner page: a label row, a hairline that draws from the left, and the h1. */
export function PageHead({ left, right, title, lead }: Props) {
  const reduced = useReducedMotion()

  return (
    <div className="px-5 pt-[calc(var(--header-h)+2.5rem)] md:px-12 md:pt-[calc(var(--header-h)+10vh)]">
      <div className="flex items-end justify-between gap-6 text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:text-xs">
        <div>{left}</div>
        {right !== undefined && <div className="text-right">{right}</div>}
      </div>
      <motion.div
        aria-hidden="true"
        className="mt-3 h-px origin-left bg-paper/30 md:mt-4"
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: DUR.base, ease: EASE_OUT }}
      />
      {title && !lead && <MaskedLines as="h1" tabIndex={-1} lines={title} className={`mt-8 md:mt-12 ${TITLE}`} />}
      {title && lead && (
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 md:mt-12 md:grid-cols-12 md:items-end">
          <MaskedLines as="h1" tabIndex={-1} lines={title} className={`md:col-span-6 ${TITLE}`} />
          <motion.div
            className="md:col-span-6 md:col-start-7 md:pb-[0.6vw]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.base, ease: EASE_OUT, delay: 0.3 }}
          >
            {lead}
          </motion.div>
        </div>
      )}
    </div>
  )
}
