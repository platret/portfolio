import { motion } from 'framer-motion'
import { EASE_OUT, DUR, LINE_STAGGER } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Props = {
  lines: string[]
  as?: 'h1' | 'h2' | 'p' | 'div'
  className?: string
  lineClassName?: string
  delay?: number
  once?: boolean
  inView?: boolean
}

export function MaskedLines({ lines, as = 'div', className, lineClassName, delay = 0, once = true, inView = false }: Props) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  const hidden = reduced ? { opacity: 0 } : { y: '110%' }
  const shown = reduced ? { opacity: 1 } : { y: '0%' }
  const viewport = inView ? { once, margin: '0px 0px -12% 0px' } : undefined

  return (
    <Tag
      className={className}
      initial="hidden"
      animate={inView ? undefined : 'shown'}
      whileInView={inView ? 'shown' : undefined}
      viewport={viewport}
    >
      {lines.map((line, i) => (
        <span key={i} className="-my-[0.12em] block overflow-hidden py-[0.12em]">
          <motion.span
            className={`block ${lineClassName ?? ''}`}
            variants={{ hidden, shown }}
            transition={{ duration: DUR.slow, ease: EASE_OUT, delay: delay + i * LINE_STAGGER }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
