import { Cursor } from './components/Cursor'
import { Grain } from './components/Grain'
import { useIsTouch } from './hooks/useIsTouch'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { Hero } from './sections/Hero'
import { Intro } from './sections/Intro'
import { WorkList } from './sections/WorkList'
import { DistortionStrip } from './sections/DistortionStrip'
import { About } from './sections/About'
import { Footer } from './sections/Footer'

export default function App() {
  const reduced = useReducedMotion()
  const touch = useIsTouch()
  useLenis(!reduced)

  return (
    <>
      {!touch && <Cursor />}
      <main>
        <Hero />
        <Intro />
        <WorkList />
        <DistortionStrip />
        <About />
      </main>
      <Footer />
      <Grain />
    </>
  )
}
