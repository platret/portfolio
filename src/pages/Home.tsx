import { useEffect } from 'react'
import { prefetch } from '../router/router'
import { Hero } from '../sections/Hero'
import { HomeDoors } from '../sections/HomeDoors'
import { Intro } from '../sections/Intro'

export default function Home() {
  // The apps index is the likeliest next page: fetch its chunk once the browser is idle.
  useEffect(() => {
    const run = () => prefetch('/apps')
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run)
      return () => window.cancelIdleCallback(id)
    }
    const timer = setTimeout(run, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Hero />
      <Intro />
      <HomeDoors />
    </>
  )
}
