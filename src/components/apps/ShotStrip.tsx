import { useEffect, useRef, useState, type CSSProperties, type FocusEvent } from 'react'
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

// aria-disabled instead of disabled: a disabled button drops keyboard focus to <body>
// the moment the strip reaches its end.
const BUTTON =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 text-sm text-paper/70 transition-[color,border-color] duration-[600ms] ease-out-expo hover:border-paper/40 hover:text-paper aria-disabled:opacity-30 aria-disabled:hover:border-paper/15 aria-disabled:hover:text-paper/70'

/** A transparent pixel. Frames far to the right of the visible part of a strip wait with this
 *  until a sideways scroll brings them near; the box keeps its size from width, height and aspect-ratio. */
const PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// A strip that would overflow by less than one gap and a fifth of a frame is shrunk to fit instead,
// so a nudge of a few pixels never needs arrow buttons.
const FIT_SLACK = 0.2

/** A row of framed screenshots that scrolls sideways natively. Every shot is in the DOM and visible:
 *  no carousel, no slides, no tabs. */
export function ShotStrip({ app, shots, label, priority = false, column = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ overflow: false, start: true, end: false })
  // Frames up to this index get their real image. The first two always do.
  const [reach, setReach] = useState(1)
  const [fitHeight, setFitHeight] = useState<number | null>(null)
  const touch = useIsTouch()
  const reduced = useReducedMotion()

  const wide = shots[0].frame !== 'phone'
  const alone = wide && shots.length === 1
  // Wide frames share one height from 768 px: the height of the flattest shot at full width.
  const ratio = Math.min(...shots.map((shot) => shotSize(shot).height / shotSize(shot).width))
  const aspects = shots.reduce((sum, shot) => sum + shotSize(shot).width / shotSize(shot).height, 0)
  const widest = Math.max(...shots.map((shot) => shotSize(shot).width / shotSize(shot).height))

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

  // Wide frames from 768 px: the same sizes index.css computes, worked out here to see whether the
  // strip only just overflows. The natural sizes are used, so shrinking never feeds back into the test.
  useEffect(() => {
    const el = ref.current
    if (!el || !wide || alone) return
    const fit = () => {
      const style = getComputedStyle(el)
      const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      const vw = window.innerWidth / 100
      if (window.innerWidth < 48 * rem) return setFitHeight(null)
      const gap = Number.parseFloat(style.columnGap) || 0
      const available = el.clientWidth - (Number.parseFloat(style.paddingLeft) || 0) - (Number.parseFloat(style.paddingRight) || 0)
      const shotWidth = column ? Math.min(44 * rem, 46 * vw) : Math.min(60 * rem, 74 * vw)
      const height = Math.min(shotWidth * ratio, 40 * rem)
      const gaps = gap * (shots.length - 1)
      const overflow = height * aspects + gaps - available
      setFitHeight(overflow > 0 && overflow < gap + FIT_SLACK * height * widest ? Math.floor((available - gaps) / aspects) : null)
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [wide, alone, column, ratio, aspects, widest, shots.length])

  // Load a frame's image once a sideways scroll brings it within half a strip of view.
  useEffect(() => {
    const el = ref.current
    if (!el || reach >= shots.length - 1) return
    const observer = new IntersectionObserver(
      (entries) => {
        const near = entries.filter((entry) => entry.isIntersecting).map((entry) => Number((entry.target as HTMLElement).dataset.index))
        if (near.length) setReach((prev) => Math.max(prev, ...near.map((i) => i + 1)))
      },
      { root: el, rootMargin: '0px 50% 0px 0px' },
    )
    el.querySelectorAll('figure').forEach((figure) => observer.observe(figure))
    return () => observer.disconnect()
  }, [reach, shots.length])

  function step(direction: 1 | -1) {
    const el = ref.current
    const frame = el?.querySelector('figure')
    if (!el || !frame) return
    if ((direction === -1 && edges.start) || (direction === 1 && edges.end)) return
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: direction * (frame.getBoundingClientRect().width + gap), behavior: reduced ? 'auto' : 'smooth' })
  }

  /** Tabbing onto a frame that is only partly in view scrolls the strip to it. */
  function reveal(event: FocusEvent<HTMLElement>) {
    const el = ref.current
    const figure = event.currentTarget.closest('figure')
    if (!el || !figure) return
    const strip = el.getBoundingClientRect()
    const frame = figure.getBoundingClientRect()
    const style = getComputedStyle(el)
    const left = strip.left + (Number.parseFloat(style.scrollPaddingLeft) || 0)
    const right = strip.right - (Number.parseFloat(style.scrollPaddingRight) || 0)
    if (frame.left >= left - 1 && frame.right <= right + 1) return
    el.scrollBy({ left: frame.left - left, behavior: reduced ? 'auto' : 'smooth' })
  }

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
          <button type="button" aria-label="Previous screenshot" aria-disabled={edges.start} onClick={() => step(-1)} data-cursor="hover" className={BUTTON}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" aria-label="Next screenshot" aria-disabled={edges.end} onClick={() => step(1)} data-cursor="hover" className={BUTTON}>
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
        style={{ '--strip-ratio': ratio, ...(fitHeight ? { '--shot-h-fit': `${fitHeight}px` } : {}) } as CSSProperties}
      >
        {shots.map((shot, i) => {
          const { width, height } = shotSize(shot)
          const first = priority && i === 0
          const image = (
            <img
              src={i <= reach ? asset(shot.file) : PLACEHOLDER}
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
            <figure key={shot.file} data-index={i}>
              {shot.frame === 'phone' ? (
                <div className="shot--phone">
                  <PhoneFrame>{image}</PhoneFrame>
                </div>
              ) : (
                <a
                  href={asset(shot.file)}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  onFocus={reveal}
                  className={`shot--wide relative block -outline-offset-2 ${alone ? 'shot--alone' : ''}`}
                  style={{ '--shot-aspect': width / height } as CSSProperties}
                >
                  {/* The link is named by this prefix and the image's alt text. The link is positioned
                      so the hidden prefix stays inside the strip and cannot widen the page. */}
                  <span className="sr-only">Open the full-size screenshot: </span>
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
