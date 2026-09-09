import type Lenis from 'lenis'

export const scroll: { lenis: Lenis | null } = { lenis: null }

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (scroll.lenis) {
    scroll.lenis.scrollTo(el, { duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
