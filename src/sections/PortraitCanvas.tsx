import { useEffect, useRef, type RefObject } from 'react'
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl'
import { gsap } from '../lib/gsap'
import { vertex, fragment } from '../lib/shaders'

type Props = {
  frameRef: RefObject<HTMLElement | null>
  src: string
  onReady: (ok: boolean) => void
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export function PortraitCanvas({ frameRef, src, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const frame = frameRef.current
    if (!canvas || !frame) return

    let renderer: Renderer
    try {
      renderer = new Renderer({ canvas, alpha: true, antialias: false, dpr: Math.min(2, window.devicePixelRatio || 1) })
      if (!renderer.gl) throw new Error('no gl')
    } catch {
      onReady(false)
      return
    }

    const gl = renderer.gl
    const camera = new Camera(gl)
    const scene = new Transform()
    const texture = new Texture(gl, { generateMipmaps: false })
    const uniforms = {
      tMap: { value: texture },
      uVelocity: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: [0.5, 0.5] },
      uPlaneAspect: { value: 0.8 },
      uImageAspect: { value: 0.8 },
    }
    const mesh = new Mesh(gl, { geometry: new Plane(gl), program: new Program(gl, { vertex, fragment, uniforms }) })
    mesh.setParent(scene)

    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      texture.image = img
      uniforms.uImageAspect.value = img.naturalWidth / img.naturalHeight
      onReady(true)
    }
    img.onerror = () => onReady(false)
    img.src = src

    const target = { x: 0.5, y: 0.5, hover: 0 }
    const onMove = (e: PointerEvent) => {
      const r = frame.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = 1 - (e.clientY - r.top) / r.height
    }
    const onEnter = () => (target.hover = 1)
    const onLeave = () => (target.hover = 0)

    const resize = () => {
      const w = frame.clientWidth
      const h = frame.clientHeight
      renderer.setSize(w, h)
      camera.orthographic({ left: 0, right: w, top: 0, bottom: -h, near: -1, far: 1 })
      mesh.position.set(w / 2, -h / 2, 0)
      mesh.scale.set(w, h, 1)
      uniforms.uPlaneAspect.value = w / h
    }

    let lastY = window.scrollY
    const tick = () => {
      const r = frame.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      const dy = window.scrollY - lastY
      lastY = window.scrollY
      uniforms.uVelocity.value += (clamp(dy / 60, -1, 1) - uniforms.uVelocity.value) * 0.08
      uniforms.uHover.value += (target.hover - uniforms.uHover.value) * 0.06
      const m = uniforms.uMouse.value
      m[0] += (target.x - m[0]) * 0.08
      m[1] += (target.y - m[1]) * 0.08
      renderer.render({ scene, camera })
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(frame)
    frame.addEventListener('pointermove', onMove, { passive: true })
    frame.addEventListener('pointerenter', onEnter)
    frame.addEventListener('pointerleave', onLeave)
    gsap.ticker.add(tick)

    return () => {
      cancelled = true
      ro.disconnect()
      frame.removeEventListener('pointermove', onMove)
      frame.removeEventListener('pointerenter', onEnter)
      frame.removeEventListener('pointerleave', onLeave)
      gsap.ticker.remove(tick)
    }
  }, [frameRef, src, onReady])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}
