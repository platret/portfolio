import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav } from '../content/nav'
import { site } from '../content/site'
import { lockScroll, scrollToId, scrollToTop } from '../lib/scroll'
import { EASE_OUT } from '../lib/motion'
import { copyText, isMac, PALETTE_EVENT, ROUTE_EVENT } from '../lib/ui'
import { navigate } from '../router/router'

const GROUPS = ['Go to', 'Projects', 'Do'] as const

type Command = {
  id: string
  group: (typeof GROUPS)[number]
  label: string
  hint?: string
  keywords?: string
  run: () => void
}

const external = (href: string) => () => window.open(href, '_blank', 'noopener,noreferrer')

function buildCommands(): Command[] {
  const go = (id: string, label: string, run: () => void, keywords?: string): Command => ({ id: `go-${id}`, group: 'Go to', label, keywords, run })
  const pages: Command[] = [
    go('home', 'Home', () => void navigate('/'), 'start hero'),
    ...nav.map((item) => go(item.id, item.label, () => void navigate(item.to), item.blurb)),
    go('contact', 'Contact', () => scrollToId('contact'), 'email say hi'),
  ]

  const projects: Command[] = site.projects
    .filter((p) => p.href)
    .map((p) => ({
      id: `project-${p.title}`,
      group: 'Projects',
      label: p.title,
      hint: p.stack,
      keywords: p.description,
      run: external(p.href!),
    }))

  const linked = site.projects.filter((p) => p.href)
  const actions: Command[] = [
    { id: 'copy-email', group: 'Do', label: 'Copy email address', hint: site.email, keywords: 'contact mail', run: () => copyText(site.email, 'Email copied. Talk soon.') },
    { id: 'mail', group: 'Do', label: 'Write me an email', keywords: 'contact hire', run: () => { window.location.href = `mailto:${site.email}` } },
    ...site.links.map((l) => ({ id: `link-${l.label}`, group: 'Do' as const, label: `Open ${l.label}`, run: external(l.href) })),
    {
      id: 'surprise',
      group: 'Do',
      label: 'Surprise me',
      hint: 'Random project',
      keywords: 'random lucky',
      run: () => {
        const pick = linked[Math.floor(Math.random() * linked.length)]
        if (pick?.href) window.open(pick.href, '_blank', 'noopener,noreferrer')
      },
    },
    { id: 'top', group: 'Do', label: 'Back to the top', keywords: 'scroll start', run: scrollToTop },
  ]

  return [...pages, ...projects, ...actions]
}

// Every typed character must appear in order; earlier, tighter matches score higher.
function score(command: Command, query: string) {
  if (!query) return 1
  const hay = `${command.label} ${command.hint ?? ''} ${command.keywords ?? ''}`.toLowerCase()
  const q = query.toLowerCase().trim()
  const direct = hay.indexOf(q)
  if (direct !== -1) return 1000 - direct
  let pos = -1
  let gaps = 0
  for (const ch of q) {
    if (ch === ' ') continue
    const next = hay.indexOf(ch, pos + 1)
    if (next === -1) return 0
    gaps += next - pos - 1
    pos = next
  }
  return Math.max(1, 50 - gaps)
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const commands = useMemo(() => buildCommands(), [])

  const results = useMemo(() => {
    const scored = commands.map((c) => ({ c, s: score(c, query) })).filter((r) => r.s > 0)
    // When something matches the query directly, hide the looser subsequence hits.
    const direct = scored.filter((r) => r.s > 500)
    const pool = direct.length ? direct : scored
    if (!query) return pool.map((r) => r.c)
    return pool
      .sort((a, b) => GROUPS.indexOf(a.c.group) - GROUPS.indexOf(b.c.group) || b.s - a.s)
      .map((r) => r.c)
  }, [commands, query])

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null
    setQuery('')
    setActive(0)
    setOpen(true)
  }, [])

  const hide = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing = target?.closest('input, textarea, [contenteditable="true"]')
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (open) hide()
        else show()
      } else if (e.key === '/' && !typing && !open) {
        e.preventDefault()
        show()
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener(PALETTE_EVENT, show)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(PALETTE_EVENT, show)
    }
  }, [open, show, hide])

  useEffect(() => {
    if (!open) return
    lockScroll(true)
    inputRef.current?.focus()
    // A page change under the open palette closes it; focus then belongs to the new page.
    const onRoute = () => {
      returnFocus.current = null
      setOpen(false)
    }
    window.addEventListener(ROUTE_EVENT, onRoute)
    return () => {
      window.removeEventListener(ROUTE_EVENT, onRoute)
      lockScroll(false)
      returnFocus.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  function run(command: Command | undefined) {
    if (!command) return
    setOpen(false)
    // Let the dialog close (and Lenis restart) before scrolling or navigating.
    window.setTimeout(command.run, 60)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[active])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      hide()
    } else if (e.key === 'Tab') {
      e.preventDefault()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-start justify-center bg-ink/70 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) hide()
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-[560px] overflow-hidden rounded-[14px] border border-paper/15 bg-[#121212] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)]"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <div className="flex items-center gap-3 border-b border-paper/10 px-4">
              <span aria-hidden="true" className="text-accent">›</span>
              <input
                ref={inputRef}
                autoFocus
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
                aria-autocomplete="list"
                aria-label="Type a command or search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onKeyDown}
                placeholder="Jump to a page, find an app…"
                spellCheck={false}
                autoComplete="off"
                className="h-14 w-full bg-transparent text-sm text-paper outline-none placeholder:text-paper/35"
              />
              <kbd className="rounded border border-paper/15 px-1.5 py-0.5 text-[0.6rem] text-paper/45">esc</kbd>
            </div>

            <ul ref={listRef} id="palette-list" role="listbox" aria-label="Commands" className="max-h-[min(52vh,420px)] overflow-y-auto overscroll-contain py-2" data-lenis-prevent>
              {results.length === 0 && <li className="px-4 py-6 text-center text-xs text-paper/45">Nothing for “{query}”. Try “apps” or “email”.</li>}
              {results.map((c, i) => {
                const header = c.group !== results[i - 1]?.group ? c.group : null
                const on = i === active
                return (
                  <li key={c.id} role="presentation">
                    {header && <p className="px-4 pb-1 pt-3 text-[0.6rem] uppercase tracking-[0.12em] text-paper/35">{header}</p>}
                    <div
                      id={`palette-${c.id}`}
                      role="option"
                      aria-selected={on}
                      data-index={i}
                      onPointerMove={() => setActive(i)}
                      onClick={() => run(c)}
                      className={`mx-2 flex cursor-pointer items-center justify-between gap-4 rounded-[8px] px-3 py-2.5 text-xs ${on ? 'bg-paper/[0.07] text-paper' : 'text-paper/70'}`}
                    >
                      <span className="flex items-center gap-3">
                        <span aria-hidden="true" className={`h-1 w-1 rounded-full ${on ? 'bg-accent' : 'bg-transparent'}`} />
                        {c.label}
                      </span>
                      {c.hint && <span className="truncate text-[0.65rem] text-paper/35">{c.hint}</span>}
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-paper/10 px-4 py-2.5 text-[0.6rem] text-paper/35">
              <span>
                <kbd>↑</kbd> <kbd>↓</kbd> to move · <kbd>↵</kbd> to run
              </span>
              <span>{isMac ? '⌘' : 'Ctrl'} K anywhere</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
