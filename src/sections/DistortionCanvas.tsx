import { useEffect, useRef, type RefObject } from 'react'
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl'
import { gsap } from '../lib/gsap'
import { vertex, fragment } from '../lib/shaders'

type Props = {
  sectionRef: RefObject<HTMLElement | null>
  trackRef: RefObject<HTMLDivElement | null>
  sources: string[]
  onReady: (ok: boolean) => void
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export function DistortionCanvas({ sectionRef, trackRef, sources, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    const track = trackRef.current
    if (!canvas || !section || !track) return

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
    const geometry = new Plane(gl)
    const uVelocity = { value: 0 }
    const figures = Array.from(track.querySelectorAll<HTMLElement>('figure'))
    let cancelled = false
    let loaded = 0

    const meshes = figures.map((_, i) => {
      const texture = new Texture(gl, { generateMipmaps: false })
      const uImageAspect = { value: 1.5 }
      const img = new Image()
      img.onload = () => {
        if (cancelled) return
        texture.image = img
        uImageAspect.value = img.naturalWidth / img.naturalHeight
        loaded += 1
        if (loaded === figures.length) onReady(true)
      }
      img.onerror = () => onReady(false)
      img.src = sources[i]

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: { tMap: { value: texture }, uVelocity, uPlaneAspect: { value: 1.5 }, uImageAspect },
      })
      const mesh = new Mesh(gl, { geometry, program })
      mesh.setParent(scene)
      return mesh
    })

    const resize = () => {
      const w = section.clientWidth
      const h = section.clientHeight
      renderer.setSize(w, h)
      camera.orthographic({ left: 0, right: w, top: 0, bottom: -h, near: -1, far: 1 })
    }

    let lastX = (gsap.getProperty(track, 'x') as number) || 0

    const tick = () => {
      const rect = section.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      const x = (gsap.getProperty(track, 'x') as number) || 0
      const dx = x - lastX
      lastX = x
      uVelocity.value += (clamp(dx / 60, -1, 1) - uVelocity.value) * 0.08

      figures.forEach((fig, i) => {
        const r = fig.getBoundingClientRect()
        const mesh = meshes[i]
        mesh.position.set(r.left - rect.left + r.width / 2, -(r.top - rect.top + r.height / 2), 0)
        mesh.scale.set(r.width, r.height, 1)
        mesh.program.uniforms.uPlaneAspect.value = r.width / r.height
      })

      renderer.render({ scene, camera })
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(section)
    gsap.ticker.add(tick)

    return () => {
      cancelled = true
      ro.disconnect()
      gsap.ticker.remove(tick)
    }
  }, [sectionRef, trackRef, sources, onReady])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}
