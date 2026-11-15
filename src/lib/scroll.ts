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
let afterUnlock: (() => void) | null = null

/** Freeze page scrolling while a layer (the palette, the phone menu) is open. Calls must be paired. */
export function lockScroll(on: boolean) {
  locks = Math.max(0, locks + (on ? 1 : -1))
  const locked = locks > 0
  if (scroll.lenis) {
    if (locked) scroll.lenis.stop()
    else scroll.lenis.start()
  }
  document.documentElement.style.overflow = locked && !scroll.lenis ? 'hidden' : ''

  if (!locked && afterUnlock) {
    const run = afterUnlock
    afterUnlock = null
    run()
  }
}

/** Run a smooth scroll now, or once the open layer has released the lock.
 *  Lenis ignores a scroll while it is stopped, and restarting it cancels one already running. */
function whenUnlocked(run: () => void) {
  if (locks > 0) afterUnlock = run
  else run()
}

/** Hand keyboard and screen reader focus to an element without scrolling to it,
 *  so the next Tab continues from there instead of from wherever focus was before. */
export function focusTarget(el: HTMLElement) {
  if (el.tabIndex < 0 && !el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

/** Scroll to an element by id and move focus to it, or to the element `focus` selects inside the page.
 *  Smooth through Lenis; instant when Lenis is off (reduced motion). Both paths honour the element's
 *  scroll-margin-top, so the target lands below the header. */
export function scrollToId(id: string, focus?: string) {
  whenUnlocked(() => {
    const el = document.getElementById(id)
    if (!el) return
    if (scroll.lenis) scroll.lenis.scrollTo(el, { duration: 1.4, force: true })
    else window.scrollTo(0, topOf(el))
    focusTarget((focus && document.querySelector<HTMLElement>(focus)) || el)
  })
}

/** Contact is the footer of every page, not a page: scroll there and hand focus to the email link. */
export function goToContact() {
  scrollToId('contact', '[data-contact-link]')
}

export function scrollToTop() {
  whenUnlocked(() => {
    if (scroll.lenis) scroll.lenis.scrollTo(0, { duration: 1.6, force: true })
    else window.scrollTo(0, 0)
  })
}
