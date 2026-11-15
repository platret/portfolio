import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { nav } from '../content/nav'
import { site } from '../content/site'
import { useIsTouch } from '../hooks/useIsTouch'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { EASE_OUT } from '../lib/motion'
import { lockScroll, scrollToId } from '../lib/scroll'
import { copyText, isMac, openPalette, ROUTE_EVENT } from '../lib/ui'
import { Link, usePending, useRoute } from '../router/router'

const LABEL = 'text-[0.7rem] uppercase tracking-[0.08em] md:text-xs'
const ITEM = 'inline-flex min-h-11 items-center transition-colors duration-[600ms] ease-out-expo hover:text-paper'
// Wait for the menu or the palette to release the scroll lock before scrolling.
const AFTER_CLOSE = 60
const shortcut = `${isMac ? '⌘' : 'Ctrl'} K`

/** The accent dot that marks the current item. Its slot is always reserved, so nothing shifts. */
function Dot({ on, large = false }: { on: boolean; large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`shrink-0 rounded-full bg-accent transition-opacity duration-[600ms] ease-out-expo ${large ? 'mr-3 h-2 w-2' : 'mr-2 h-1.5 w-1.5'}`}
      style={{ opacity: on ? 1 : 0 }}
    />
  )
}

/** Contact is the footer of every page, not a page: scroll there and hand focus to the email link. */
function goToContact() {
  scrollToId('contact')
  document.querySelector<HTMLElement>('[data-contact-link]')?.focus({ preventScroll: true })
}

/** The 1 px accent line on the header's bottom edge, shown while a page chunk is slow to arrive. */
function Progress() {
  const pending = usePending()
  const [last, setLast] = useState(pending)
  const [finishing, setFinishing] = useState(false)

  if (last !== pending) {
    setLast(pending)
    setFinishing(!pending)
  }

  useEffect(() => {
    if (!finishing) return
    const timer = window.setTimeout(() => setFinishing(false), 500)
    return () => window.clearTimeout(timer)
  }, [finishing])

  const style = pending
    ? { transform: 'scaleX(0.7)', opacity: 1, transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)' }
    : finishing
      ? { transform: 'scaleX(1)', opacity: 0, transition: 'transform 0.2s linear, opacity 0.3s linear 0.2s' }
      : { transform: 'scaleX(0)', opacity: 0, transition: 'none' }

  return <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-accent" style={style} />
}

/** A phone menu row: the label rises out of a mask, as the headings do. */
function Rise({ index, children }: { index: number; children: ReactNode }) {
  return (
    <span className="-my-[0.12em] block overflow-hidden py-[0.12em]">
      <motion.span className="block" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.6, ease: EASE_OUT, delay: index * 0.05 }}>
        {children}
      </motion.span>
    </span>
  )
}

export function Header() {
  const route = useRoute()
  const touch = useIsTouch()
  const reduced = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // Only the very first load of the home page fades the header in, with the hero's role lines.
  const [intro] = useState(() => route.action === 'load' && route.route.id === 'home')
  const menuButton = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const restoreFocus = useRef(true)

  const isHome = route.route.id === 'home'
  const current = (id: string, to: string) => (route.route.nav === id ? (route.pathname === to ? 'page' : 'true') : undefined)

  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel')
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const close = useCallback((restore = true) => {
    restoreFocus.current = restore
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return

    // inert keeps focus inside the header without a hand-written trap.
    const button = menuButton.current
    const behind = document.querySelectorAll<HTMLElement>('.skip-link, #main, #contact')
    behind.forEach((el) => (el.inert = true))
    lockScroll(true)
    restoreFocus.current = true
    panel.current?.querySelector<HTMLElement>('a, button')?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return
      event.preventDefault()
      close()
    }
    // After a route change focus belongs to the new page's heading, not to the Menu button.
    const onRoute = () => close(false)
    const wide = window.matchMedia('(min-width: 768px)')
    const onWide = () => wide.matches && close(false)

    window.addEventListener('keydown', onKey)
    window.addEventListener(ROUTE_EVENT, onRoute)
    wide.addEventListener('change', onWide)

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(ROUTE_EVENT, onRoute)
      wide.removeEventListener('change', onWide)
      behind.forEach((el) => (el.inert = false))
      lockScroll(false)
      if (restoreFocus.current) button?.focus()
    }
  }, [open, close])

  function contact(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    if (open) {
      close(false)
      window.setTimeout(goToContact, AFTER_CLOSE)
    } else {
      goToContact()
    }
  }

  function search() {
    close()
    window.setTimeout(openPalette, AFTER_CLOSE)
  }

  return (
    <motion.header
      className="site-header"
      data-scrolled={scrolled && !open}
      initial={intro && !reduced ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.9 }}
    >
      <div className={`relative z-10 flex h-[var(--header-h)] items-center justify-between px-5 md:px-12 ${LABEL}`}>
        {/* Read out as "Alex, home". The visible word stays part of the name, so voice control can target it. */}
        <Link to="/" aria-current={isHome ? 'page' : undefined} onClick={() => open && close()} className={`${ITEM} text-paper`}>
          <Dot on={isHome} />
          Alex<span className="sr-only">, home</span>
          <span aria-hidden="true" className="ml-4 hidden text-paper/50 lg:inline">
            Portfolio 2026
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => {
              const state = current(item.id, item.to)
              return (
                <li key={item.id}>
                  <Link to={item.to} aria-current={state} className={`${ITEM} ${state ? 'text-paper' : 'text-paper/50'}`}>
                    <Dot on={Boolean(state)} />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a href="#contact" onClick={contact} className={`${ITEM} text-paper/50`}>
            Contact
          </a>
          {!touch && (
            <button type="button" onClick={openPalette} aria-label={`Open command menu, ${shortcut}`} className="group inline-flex min-h-11 items-center">
              <kbd className="rounded border border-paper/20 px-1.5 py-0.5 text-[0.65rem] text-paper/80 transition-colors duration-[600ms] ease-out-expo group-hover:border-paper/50 group-hover:text-paper">
                {shortcut}
              </kbd>
            </button>
          )}
        </div>

        <button
          ref={menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => (open ? close() : setOpen(true))}
          className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-end px-2 uppercase tracking-[0.08em] md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {!reduced && <Progress />}

      {open && (
        <motion.div
          ref={panel}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          className="fixed inset-0 flex flex-col overflow-y-auto overscroll-contain bg-ink px-5 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] pt-[calc(var(--header-h)+env(safe-area-inset-top,0px))] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <nav aria-label="Main">
            <ul className="hairline border-t">
              {nav.map((item, i) => {
                const state = current(item.id, item.to)
                return (
                  <li key={item.id} className="hairline border-b">
                    <Link
                      to={item.to}
                      aria-current={state}
                      onClick={() => close()}
                      className="flex min-h-[72px] items-center font-display text-[min(13vw,4rem)] leading-none tracking-[-0.02em] -outline-offset-2"
                    >
                      <Dot on={Boolean(state)} large />
                      <Rise index={i}>{item.label}</Rise>
                    </Link>
                  </li>
                )
              })}
              <li className="hairline border-b">
                <a href="#contact" onClick={contact} className="flex min-h-[72px] items-center font-display text-[min(13vw,4rem)] leading-none tracking-[-0.02em] -outline-offset-2">
                  <Dot on={false} large />
                  <Rise index={nav.length}>Contact</Rise>
                </a>
              </li>
            </ul>
          </nav>

          <ul className={`mt-auto flex flex-wrap items-center gap-x-6 pt-8 text-paper/60 ${LABEL}`}>
            <li>
              <button type="button" onClick={search} className="inline-flex min-h-11 items-center uppercase tracking-[0.08em]">
                Search
              </button>
            </li>
            <li>
              <button type="button" onClick={() => copyText(site.email, 'Email copied. Talk soon.')} className="inline-flex min-h-11 items-center uppercase tracking-[0.08em]">
                Copy email
              </button>
            </li>
            {site.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noreferrer" onClick={() => close()} className="inline-flex min-h-11 items-center">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
