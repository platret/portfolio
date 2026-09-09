import { useEffect, useRef } from 'react'
import type { Project } from '../content/site'
import { gsap } from '../lib/gsap'
import { EASE_OUT_CSS, DUR } from '../lib/motion'

type Props = {
  projects: Project[]
  active: number | null
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export function WorkPreview({ projects, active }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const activeRef = useRef(active)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const target = { x: -9999, y: -9999 }
    const pos = { x: -9999, y: -9999 }
    let prevX = -9999
    let rot = 0
    let scale = 0.85
    let size = { w: el.offsetWidth, h: el.offsetHeight }

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (pos.x < -999) {
        pos.x = target.x
        pos.y = target.y
        prevX = target.x
      }
    }
    const onResize = () => {
      size = { w: el.offsetWidth, h: el.offsetHeight }
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.06
      pos.y += (target.y - pos.y) * 0.06
      const vx = pos.x - prevX
      prevX = pos.x
      rot += (clamp(vx * 0.6, -14, 14) - rot) * 0.12
      const wanted = activeRef.current === null ? 0.85 : 1
      scale += (wanted - scale) * 0.08
      el.style.transform = `translate3d(${pos.x - size.w / 2}px, ${pos.y - size.h / 2}px, 0) rotate(${rot}deg) scale(${scale})`
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', onResize)
    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] aspect-[4/5] w-[22vw] max-w-[360px] will-change-transform"
      style={{ opacity: active === null ? 0 : 1, transition: `opacity ${DUR.fast}s ${EASE_OUT_CSS}` }}
    >
      {projects.map((p, i) => (
        <img
          key={p.title}
          src={p.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: active === i ? 1 : 0, transition: `opacity ${DUR.fast}s ${EASE_OUT_CSS}` }}
        />
      ))}
    </div>
  )
}
