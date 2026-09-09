import { motion } from 'framer-motion'
import type { Project } from '../content/site'
import { EASE_OUT, EASE_OUT_CSS, DUR } from '../lib/motion'

type Props = {
  project: Project
  index: number
  order: number
  hovered: number | null
  interactive: boolean
  compact?: boolean
  onEnter: (i: number) => void
  onLeave: () => void
}

export function WorkRow({ project, index, order, hovered, interactive, compact = false, onEnter, onLeave }: Props) {
  const isHover = hovered === index
  const isAbove = hovered === index + 1
  const isBelow = hovered === index - 1
  const dim = hovered !== null && !isHover

  const transform = isHover
    ? 'translate3d(2vw, 0, 0)'
    : isAbove
      ? 'translate3d(0, -0.9vw, 0)'
      : isBelow
        ? 'translate3d(0, 0.9vw, 0)'
        : 'translate3d(0, 0, 0)'

  const Tag = project.href ? 'a' : 'div'
  const rowClass = compact
    ? 'hairline grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-t py-5 pr-5 md:grid-cols-[5rem_1fr_auto] md:gap-x-8 md:py-[1.7vw] md:pr-12'
    : 'hairline grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-t py-6 pr-5 md:grid-cols-[5rem_1fr_auto] md:gap-x-8 md:py-[2.6vw] md:pr-12'
  const titleClass = compact
    ? 'font-display text-[5.5vw] leading-[0.95] tracking-[-0.02em] md:text-[clamp(1.4rem,3vw,3.9rem)]'
    : 'font-display text-[9vw] leading-[0.95] tracking-[-0.02em] md:text-[clamp(2.2rem,5vw,6.5rem)]'

  return (
    <li
      onPointerEnter={interactive ? () => onEnter(index) : undefined}
      onPointerLeave={interactive ? onLeave : undefined}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: DUR.slow, ease: EASE_OUT, delay: order * 0.1 }}
      >
        <Tag
          href={project.href}
          target={project.href ? '_blank' : undefined}
          rel={project.href ? 'noreferrer' : undefined}
          className={rowClass}
          style={{
            transform,
            opacity: dim ? 0.3 : 1,
            transition: `transform ${DUR.base}s ${EASE_OUT_CSS}, opacity ${DUR.fast}s ${EASE_OUT_CSS}`,
          }}
          data-cursor={project.href ? 'hover' : undefined}
        >
          <span
            className="text-[0.7rem] md:text-xs"
            style={{ color: isHover ? '#FF4A17' : 'rgba(242,240,235,0.5)', transition: `color ${DUR.fast}s ${EASE_OUT_CSS}` }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={titleClass}>{project.title}</span>
          <span className="col-start-2 mt-3 flex flex-col gap-y-1 text-[0.7rem] leading-[1.6] text-paper/60 md:col-start-3 md:mt-0 md:max-w-[34ch] md:items-end md:text-right md:text-xs">
            <span>{project.year}</span>
            <span>{project.stack}</span>
            {project.description && <span className="mt-1 text-paper/40">{project.description}</span>}
          </span>
        </Tag>
      </motion.div>
    </li>
  )
}
