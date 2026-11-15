import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { App, AppShot } from '../../content/apps'
import { useIsTouch } from '../../hooks/useIsTouch'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { linkLabel, shotSize } from '../../lib/apps'
import { asset } from '../../lib/paths'
import { BrowserFrame } from '../BrowserFrame'
import { PhoneFrame } from './PhoneFrame'

type Props = {
  app: App
  /** Screenshots of one family: all phones, or all wide frames. */
  shots: AppShot[]
  /** Shown above the strip when the app has both families: 'Phone', 'Browser', 'Desktop'. */
  label?: string
  /** The first strip on a page loads its first two images at once. */
  priority?: boolean
  /** The strip sits in a column of the page grid instead of spanning the page. */
  column?: boolean
}

const BUTTON =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 text-sm text-paper/70 transition-colors duration-[600ms] ease-out-expo hover:border-paper/40 hover:text-paper disabled:opacity-30 disabled:hover:border-paper/15 disabled:hover:text-paper/70'

/** A row of framed screenshots that scrolls sideways natively. Every shot is in the DOM and visible:
 *  no carousel, no slides, no tabs. */
export function ShotStrip({ app, shots, label, priority = false, column = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ overflow: false, start: true, end: false })
  const touch = useIsTouch()
  const reduced = useReducedMotion()

  // Arrow buttons only when there is something to scroll to.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const max = el.scrollWidth - el.clientWidth
      const next = { overflow: max > 4, start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 }
      setEdges((prev) => (prev.overflow === next.overflow && prev.start === next.start && prev.end === next.end ? prev : next))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    el.addEventListener('scroll', measure, { passive: true })
    return () => {
      observer.disconnect()
      el.removeEventListener('scroll', measure)
    }
  }, [])

  function step(direction: 1 | -1) {
    const el = ref.current
    const frame = el?.querySelector('figure')
    if (!el || !frame) return
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: direction * (frame.getBoundingClientRect().width + gap), behavior: reduced ? 'auto' : 'smooth' })
  }

  const wide = shots[0].frame !== 'phone'
  const alone = wide && shots.length === 1
  // Wide frames share one height from 768 px: the height of the flattest shot at full width.
  const ratio = Math.min(...shots.map((shot) => shotSize(shot).height / shotSize(shot).width))
  const buttons = edges.overflow && !touch

  return (
    <div className="relative">
      {/* The label row takes its space from the first render. The buttons arrive once the strip has been
          measured, so they are placed out of flow and never push the page down. A strip in a column
          keeps the row even when it is empty, because nothing above it leaves room for the buttons. */}
      {(label || column) && (
        <div className={`mb-5 min-h-11 items-center ${label ? 'flex' : 'hidden md:flex'}`}>
          {label && <p className="text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:text-xs">{label}</p>}
        </div>
      )}
      {buttons && (
        <div className={`absolute right-0 hidden gap-2 md:flex ${label || column ? 'top-0' : '-top-16'}`}>
          <button type="button" aria-label="Previous screenshot" disabled={edges.start} onClick={() => step(-1)} data-cursor="hover" className={BUTTON}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" aria-label="Next screenshot" disabled={edges.end} onClick={() => step(1)} data-cursor="hover" className={BUTTON}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}

      <div
        ref={ref}
        role="group"
        tabIndex={edges.overflow ? 0 : undefined}
        aria-label={`${app.name} screenshots, ${shots.length} ${shots.length === 1 ? 'image' : 'images'}`}
        data-lenis-prevent-horizontal
        data-cursor="hover"
        className={`strip -outline-offset-2 ${column ? 'strip--column' : ''}`}
        style={{ '--strip-ratio': ratio } as CSSProperties}
      >
        {shots.map((shot, i) => {
          const { width, height } = shotSize(shot)
          const first = priority && i === 0
          const image = (
            <img
              src={asset(shot.file)}
              alt={shot.alt}
              width={width}
              height={height}
              loading={priority && i < 2 ? 'eager' : 'lazy'}
              decoding={priority && i < 2 ? undefined : 'async'}
              fetchPriority={first ? 'high' : undefined}
              className="block h-auto w-full"
              style={{ aspectRatio: `${width} / ${height}` }}
            />
          )

          return (
            <figure key={shot.file}>
              {shot.frame === 'phone' ? (
                <div className="shot--phone">
                  <PhoneFrame>{image}</PhoneFrame>
                </div>
              ) : (
                <a
                  href={asset(shot.file)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open the full-size screenshot: ${shot.alt}`}
                  data-cursor="hover"
                  className={`shot--wide block ${alone ? 'shot--alone' : ''}`}
                  style={{ '--shot-aspect': width / height } as CSSProperties}
                >
                  {shot.frame === 'none' ? (
                    <div className="overflow-hidden rounded-[10px] border border-paper/[0.12]">{image}</div>
                  ) : shot.frame === 'desktop' ? (
                    <BrowserFrame title={app.name}>{image}</BrowserFrame>
                  ) : (
                    <BrowserFrame domain={shot.domain ?? (app.liveUrl ? linkLabel(app.liveUrl) : undefined)}>{image}</BrowserFrame>
                  )}
                </a>
              )}
              {shot.caption ? (
                // Zero width, so a caption never widens its frame's column.
                <figcaption className="mt-4 w-0 min-w-full text-[0.7rem] leading-[1.7] text-paper/60">
                  <span className="block max-w-[40ch]">{shot.caption}</span>
                </figcaption>
              ) : (
                <span aria-hidden="true" />
              )}
            </figure>
          )
        })}
      </div>
    </div>
  )
}
