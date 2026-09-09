import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    const ratios = new Map<string, number>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0))
        let best: string | null = null
        let max = 0
        ratios.forEach((r, id) => {
          if (r > max) {
            max = r
            best = id
          }
        })
        setActive(best)
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1], rootMargin: '-10% 0px -10% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}
