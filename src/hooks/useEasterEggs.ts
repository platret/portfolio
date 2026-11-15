import { useEffect } from 'react'
import { toast } from '../lib/ui'
import { site } from '../content/site'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
const ACCENTS = ['#ff4a17', '#c6f432', '#4cc9f0', '#f72585', '#ffd60a']

let greeted = false

export function useEasterEggs() {
  useEffect(() => {
    if (!greeted) {
      greeted = true
      console.log(
        '%cHi, curious one.%c\nYou opened the console, so you are my kind of person.\nPress ⌘K (or Ctrl K) to get around, or say hi: ' + site.email,
        'font: 28px "Instrument Serif", serif; color: #ff4a17;',
        'font: 12px ui-monospace, monospace; color: inherit;',
      )
    }

    // Tab title nudges you back when you wander off.
    // The title is read when the tab is hidden, so each page gets its own title back.
    const NUDGE = 'Still here when you are ↩'
    let saved = document.title
    const onVisibility = () => {
      if (document.hidden) {
        if (document.title !== NUDGE) saved = document.title
        document.title = NUDGE
      } else if (document.title === NUDGE) {
        document.title = saved
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Konami code cycles the accent colour.
    let progress = 0
    let accent = 0
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0
      if (progress < KONAMI.length) return
      progress = 0
      accent = (accent + 1) % ACCENTS.length
      document.documentElement.style.setProperty('--color-accent', ACCENTS[accent])
      toast(accent === 0 ? 'Back to the original orange.' : 'Accent unlocked. Do it again for the next one.')
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('keydown', onKey)
    }
  }, [])
}
