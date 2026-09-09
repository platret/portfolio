import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

export function useCountUp(target: number, active: boolean, instant: boolean) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (instant || !active || started.current) return
    started.current = true

    const obj = { n: 0 }
    const tween = gsap.to(obj, {
      n: target,
      duration: 1.2,
      ease: 'expo.out',
      onUpdate: () => setValue(Math.round(obj.n)),
    })

    return () => {
      tween.kill()
    }
  }, [target, active, instant])

  return instant ? target : value
}
