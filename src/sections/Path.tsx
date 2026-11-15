import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { history } from '../content/history'
import { gsap, requestRefresh } from '../lib/gsap'
import { EASE_OUT, DUR } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { MaskedLines } from '../components/MaskedLines'
import { Link } from '../router/router'

export function Path() {
  const listRef = useRef<HTMLOListElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const list = listRef.current
    const line = lineRef.current
    if (!list || !line || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 60%', scrub: true },
        },
      )
    }, list)

    return () => {
      ctx.revert()
      requestRefresh()
    }
  }, [reduced])

  return (
    <section className="relative overflow-x-clip px-5 py-10 md:px-12 md:pb-[18vh] md:pt-[8vh]">
      <MaskedLines
        as="h1"
        tabIndex={-1}
        lines={['Where it', 'has gone.']}
        className="mb-12 font-display text-[clamp(2.6rem,6vw,7.5rem)] leading-[0.92] tracking-[-0.03em] outline-none md:mb-28 md:ml-[38vw]"
      />

      <div className="relative md:ml-[12vw]">
        <div className="absolute left-0 top-0 h-full w-px bg-paper/15" aria-hidden="true">
          <div ref={lineRef} className="h-full w-full origin-top bg-accent" style={reduced ? undefined : { transform: 'scaleY(0)' }} />
        </div>

        <ol ref={listRef}>
          {history.map((item, i) => {
            // The big year is printed once per year; later entries of that year leave the cell empty.
            const first = item.year !== history[i - 1]?.year
            return (
              <motion.li
                key={`${item.year}-${item.title}`}
                className={`relative grid grid-cols-1 gap-x-10 pl-8 md:grid-cols-[minmax(0,10vw)_1fr] md:pl-12 ${first ? 'py-10 md:py-14' : 'py-7 md:py-10'}`}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 0.1 * (i % 2) }}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 h-2 w-2 -translate-x-1/2 rounded-full ${first ? 'top-[3.1rem] md:top-[4.2rem]' : 'top-[2.2rem] md:top-[3.2rem]'} ${
                    item.upcoming ? 'border border-accent bg-ink' : 'bg-accent'
                  }`}
                />
                {first ? (
                  <span className={`font-display text-[clamp(2.4rem,5vw,6rem)] leading-none tracking-[-0.03em] ${item.upcoming ? 'text-paper/40' : ''}`}>
                    {item.year}
                  </span>
                ) : (
                  <span className="hidden pt-3 text-xs uppercase tracking-[0.08em] text-paper/50 md:block">{item.month}</span>
                )}
                <span className={first ? 'mt-4 md:mt-2' : 'md:mt-2'}>
                  <span className="block text-[0.85rem] md:text-base">
                    {!first && <span className="sr-only">{item.year}: </span>}
                    {item.to ? (
                      <Link to={item.to} data-cursor="hover" className="border-b border-paper/40 transition-colors duration-[600ms] ease-out-expo hover:border-paper">
                        {item.title}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </span>
                  <span className="mt-2 block max-w-[46ch] text-[0.7rem] leading-[1.7] text-paper/55 md:text-xs">{item.detail}</span>
                </span>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
