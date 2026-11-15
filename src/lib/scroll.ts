import type Lenis from 'lenis'

export const scroll: { lenis: Lenis | null } = { lenis: null }

/** Document position of an element's top edge, minus its scroll-margin-top (the header offset set in index.css). */
export function topOf(el: Element) {
  const margin = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - margin)
}

/** Set the scroll position at once, through Lenis when it runs so it does not ease back. */
export function jumpTo(y: number) {
  if (scroll.lenis) scroll.lenis.scrollTo(y, { immediate: true, force: true })
  else window.scrollTo(0, y)
}

let locks = 0

/** Freeze page scrolling while a layer (the palette, the phone menu) is open. Calls must be paired. */
export function lockScroll(on: boolean) {
  locks = Math.max(0, locks + (on ? 1 : -1))
  const locked = locks > 0
  if (scroll.lenis) {
    if (locked) scroll.lenis.stop()
    else scroll.lenis.start()
  }
  document.documentElement.style.overflow = locked && !scroll.lenis ? 'hidden' : ''
}

/** Scroll to an element by id. Smooth through Lenis; instant when Lenis is off (reduced motion).
 *  Both paths honour the element's scroll-margin-top, so the target lands below the header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (scroll.lenis) scroll.lenis.scrollTo(el, { duration: 1.4 })
  else window.scrollTo(0, topOf(el))
}

export function scrollToTop() {
  if (scroll.lenis) scroll.lenis.scrollTo(0, { duration: 1.6 })
  else window.scrollTo(0, 0)
}
