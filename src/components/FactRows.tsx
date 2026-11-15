import { useRef } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT, DUR } from '../lib/motion'
import { useCountUp } from '../hooks/useCountUp'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Link } from '../router/router'

export type FactRow = {
  label: string
  /** A number that counts up in the accent colour, followed by `note`. */
  figure?: number
  note?: string
  /** Shown joined with ' / ' when there is no figure. */
  list?: string[]
  /** App path that turns the whole row into a link. */
  to?: string
}

function FactValue({ row, active, instant }: { row: FactRow; active: boolean; instant: boolean }) {
  const n = useCountUp(row.figure ?? 0, active, instant)
  if (row.figure !== undefined) {
    return (
      <span className="max-w-[46vw] text-balance text-right md:max-w-none">
        <span className="tabular-nums text-accent">{n}</span>
        {row.note && <span className="ml-3 text-paper/60">{row.note}</span>}
      </span>
    )
  }
  return <span className="text-right">{row.list?.join(' / ')}</span>
}

const ROW = 'grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6 py-4 text-[0.75rem] md:py-5 md:text-sm'

/** The ledger used for facts and results: label left, value right, a hairline above every row. */
export function FactRows({ rows, className }: { rows: FactRow[]; className?: string }) {
  const listRef = useRef<HTMLUListElement>(null)
  const inView = useInView(listRef)
  const reduced = useReducedMotion()

  return (
    <ul ref={listRef} className={className}>
      {rows.map((row, i) => {
        const value = <FactValue row={row} active={inView} instant={reduced} />
        return (
          <motion.li
            key={row.label}
            className="hairline border-t"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: DUR.base, ease: EASE_OUT, delay: i * 0.1 }}
          >
            {row.to ? (
              <Link to={row.to} data-cursor="hover" className={`${ROW} group -outline-offset-2`}>
                <span className="text-paper/55 transition-[color,border-color] duration-[600ms] ease-out-expo group-hover:text-paper">{row.label}</span>
                {value}
              </Link>
            ) : (
              <div className={ROW}>
                <span className="text-paper/55">{row.label}</span>
                {value}
              </div>
            )}
          </motion.li>
        )
      })}
      <li aria-hidden="true" className="hairline border-t" />
    </ul>
  )
}
