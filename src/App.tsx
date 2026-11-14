import { Cursor } from './components/Cursor'
import { Grain } from './components/Grain'
import { CommandPalette } from './components/CommandPalette'
import { Toaster } from './components/Toast'
import { useEasterEggs } from './hooks/useEasterEggs'
import { SectionIndex } from './components/SectionIndex'
import { useIsTouch } from './hooks/useIsTouch'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { Hero } from './sections/Hero'
import { Intro } from './sections/Intro'
import { WorkList } from './sections/WorkList'
import { Hackathon } from './sections/Hackathon'
import { Now } from './sections/Now'
import { About } from './sections/About'
import { Path } from './sections/Path'
import { Footer } from './sections/Footer'

export default function App() {
  const reduced = useReducedMotion()
  const touch = useIsTouch()
  useLenis(!reduced)
  useEasterEggs()

  return (
    <>
      {!touch && <Cursor />}
      <SectionIndex />
      <main>
        <Hero />
        <Intro />
        <WorkList />
        <Hackathon />
        <Now />
        <About />
        <Path />
      </main>
      <Footer />
      <CommandPalette />
      <Toaster />
      <Grain />
    </>
  )
}
