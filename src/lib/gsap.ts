import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// The phone address bar showing and hiding must not re-measure every trigger.
ScrollTrigger.config({ ignoreMobileResize: true })

let queued = 0

/** One ScrollTrigger.refresh() on the next animation frame, however often it is asked for. */
export function requestRefresh() {
  if (queued) return
  queued = requestAnimationFrame(() => {
    queued = 0
    ScrollTrigger.refresh()
  })
}

export { gsap, ScrollTrigger }
