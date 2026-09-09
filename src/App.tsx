import { Cursor } from './components/Cursor'
import { Grain } from './components/Grain'
import { SectionIndex } from './components/SectionIndex'
import { useIsTouch } from './hooks/useIsTouch'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { Hero } from './sections/Hero'
import { Intro } from './sections/Intro'
import { WorkList } from './sections/WorkList'
import { Now } from './sections/Now'
import { About } from './sections/About'
import { Path } from './sections/Path'
import { Footer } from './sections/Footer'

export default function App() {
  const reduced = useReducedMotion()
  const touch = useIsTouch()
  useLenis(!reduced)

  return (
    <>
      {!touch && <Cursor />}
      <SectionIndex />
      <main>
        <Hero />
        <Intro />
        <WorkList />
        <Now />
        <About />
        <Path />
      </main>
      <Footer />
      <Grain />
    </>
  )
}
