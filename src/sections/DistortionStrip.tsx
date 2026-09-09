import { useCallback, useEffect, useRef, useState } from 'react'
import { site } from '../content/site'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { EASE_OUT_CSS, DUR } from '../lib/motion'
import { useIsMobile } from '../hooks/useIsTouch'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { DistortionCanvas } from './DistortionCanvas'

const sources = site.strip.map((s) => s.src)

export function DistortionStrip() {
  const mobile = useIsMobile()
  const reduced = useReducedMotion()
  const pinned = !mobile && !reduced

  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [gl, setGl] = useState(false)
  const onReady = useCallback((ok: boolean) => setGl(ok), [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!pinned || !section || !track) return

    const distance = () => Math.max(0, track.offsetWidth - window.innerWidth)
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -distance(),
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [pinned])

  if (!pinned) {
    return (
      <section className="py-[14vh]">
        <p className="mb-6 px-5 text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:px-12 md:text-xs">03 / Studies</p>
        <div className="strip-scroll flex gap-3 overflow-x-auto px-5 md:px-12">
          {site.strip.map((img) => (
            <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className="aspect-[3/2] w-[72vw] shrink-0 object-cover md:w-[36vw]" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative h-[100svh] overflow-hidden">
      <p className="absolute left-12 top-8 z-10 text-xs uppercase tracking-[0.08em] text-paper/50">03 / Studies</p>
      <p className="absolute right-12 top-8 z-10 text-xs uppercase tracking-[0.08em] text-paper/50">Scroll to travel</p>

      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <div ref={trackRef} className="flex w-max gap-[3vw] pl-[32vw] pr-[10vw]">
          {site.strip.map((img, i) => (
            <figure key={img.src} className="relative aspect-[3/2] w-[38vw] shrink-0">
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
                style={{ opacity: gl ? 0 : 1, transition: `opacity ${DUR.fast}s ${EASE_OUT_CSS}` }}
              />
              <figcaption className="absolute -bottom-7 left-0 text-[0.7rem] text-paper/50">
                {String(i + 1).padStart(2, '0')} — {img.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <DistortionCanvas sectionRef={sectionRef} trackRef={trackRef} sources={sources} onReady={onReady} />
    </section>
  )
}
