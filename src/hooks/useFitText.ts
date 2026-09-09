import { useLayoutEffect, type RefObject } from 'react'

export function useFitText(containerRef: RefObject<HTMLElement | null>, textRef: RefObject<HTMLElement | null>, content: string, max = 400) {
  useLayoutEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    const fit = () => {
      const probe = 100
      text.style.fontSize = `${probe}px`
      const width = text.scrollWidth
      const available = container.clientWidth
      const next = width > 0 ? Math.min(max, (available / width) * probe) : probe
      text.style.fontSize = `${next}px`
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(container)
    document.fonts.ready.then(fit)
    return () => ro.disconnect()
  }, [containerRef, textRef, content, max])
}
