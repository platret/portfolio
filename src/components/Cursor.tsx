import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { EASE_OUT_CSS } from '../lib/motion'

const HOVER_SELECTOR = 'a, button, [data-cursor="hover"]'

export function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ring.current
    const inner = dot.current
    if (!el || !inner) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { x: target.x, y: target.y }
    let visible = false

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!visible) {
        visible = true
        el.style.opacity = '1'
      }
    }
    const onLeave = () => {
      visible = false
      el.style.opacity = '0'
    }
    const onOver = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest?.(HOVER_SELECTOR)
      inner.style.transform = hit ? 'scale(3.2)' : 'scale(1)'
      inner.style.opacity = hit ? '0.9' : '1'
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.16
      pos.y += (target.y - pos.y) * 0.16
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] opacity-0"
      style={{ transition: `opacity 0.6s ${EASE_OUT_CSS}` }}
    >
      <div
        ref={dot}
        className="-ml-[6px] -mt-[6px] h-3 w-3 rounded-full bg-paper mix-blend-difference"
        style={{ transition: `transform 0.6s ${EASE_OUT_CSS}, opacity 0.6s ${EASE_OUT_CSS}` }}
      />
    </div>
  )
}
