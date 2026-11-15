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
}

/** The top of every inner page: a label row, a hairline that draws from the left, and the h1. */
export function PageHead({ left, right, title }: Props) {
  const reduced = useReducedMotion()

  return (
    <div className="px-5 pt-[calc(var(--header-h)+2.5rem)] md:px-12 md:pt-[calc(var(--header-h)+10vh)]">
      <div className="flex items-end justify-between gap-6 text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:text-xs">
        <span>{left}</span>
        {right !== undefined && <span className="text-right">{right}</span>}
      </div>
      <motion.div
        aria-hidden="true"
        className="mt-3 h-px origin-left bg-paper/30 md:mt-4"
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: DUR.base, ease: EASE_OUT }}
      />
      {title && (
        <MaskedLines
          as="h1"
          tabIndex={-1}
          lines={title}
          className="mt-8 font-display text-[clamp(3rem,7.5vw,9rem)] leading-[0.9] tracking-[-0.03em] outline-none md:mt-12"
        />
      )}
    </div>
  )
}
