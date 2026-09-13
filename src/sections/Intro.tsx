import { useEffect, useMemo, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { site } from '../content/site'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useIsMobile, useIsTouch } from '../hooks/useIsTouch'

export function Intro() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const touch = useIsTouch()
  const mobile = useIsMobile()
  const staticText = reduced || touch || mobile
  const words = useMemo(() => site.intro.split(' '), [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const spans = el.querySelectorAll<HTMLSpanElement>('[data-word]')
    if (staticText) {
      gsap.set(spans, { opacity: 1 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: 'power2.inOut',
          stagger: { each: 0.04 },
          duration: 0.6,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: true,
          },
        },
      )
    }, el)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [staticText])

  return (
    <section id="intro" className="relative px-5 py-16 md:px-12 md:py-[28vh]">
      <p className="mb-8 text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:absolute md:left-12 md:top-[28vh] md:mb-0 md:text-xs">
        01 / Intro
      </p>
      <p
        ref={ref}
        className="max-w-[60ch] font-display text-[clamp(1.75rem,3.4vw,3.6rem)] leading-[1.12] tracking-[-0.01em] md:ml-[26vw]"
      >
        {words.map((word, i) => (
          <span key={i} data-word className="inline-block" style={{ opacity: staticText ? 1 : 0.15 }}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </p>
    </section>
  )
}
