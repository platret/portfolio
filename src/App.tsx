import type { MouseEvent } from 'react'
import { MotionConfig } from 'framer-motion'
import { CommandPalette } from './components/CommandPalette'
import { Cursor } from './components/Cursor'
import { Grain } from './components/Grain'
import { Header } from './components/Header'
import { PageBoundary } from './components/PageBoundary'
import { Toaster } from './components/Toast'
import { useEasterEggs } from './hooks/useEasterEggs'
import { useIsTouch } from './hooks/useIsTouch'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { RouterView, useRoute } from './router/router'
import { Footer } from './sections/Footer'

function skipToContent(event: MouseEvent<HTMLAnchorElement>) {
  // Move focus without touching the URL.
  event.preventDefault()
  document.getElementById('main')?.focus()
}

/** The shell around every page. Lenis, the cursor, the grain, the palette, toasts and the
 *  easter eggs live here for the whole session; only the page inside <main> changes. */
export default function App() {
  const reduced = useReducedMotion()
  const touch = useIsTouch()
  const route = useRoute()
  useLenis(!reduced)
  useEasterEggs()

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main" onClick={skipToContent}>
        Skip to content
      </a>
      <div id="top-sentinel" aria-hidden="true" />
      {!touch && <Cursor />}
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <PageBoundary key={route.commit}>
          <RouterView />
        </PageBoundary>
      </main>
      <Footer compact={route.route.id !== 'home'} />
      <CommandPalette />
      <Toaster />
      <Grain />
    </MotionConfig>
  )
}
