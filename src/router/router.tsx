import { useEffect, useLayoutEffect, useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { legacyHashes } from '../content/nav'
import { requestRefresh, ScrollTrigger } from '../lib/gsap'
import { setHead } from '../lib/head'
import { BASE, href } from '../lib/paths'
import { focusTarget, jumpTo, scroll, scrollToId, scrollToTop, topOf } from '../lib/scroll'
import { ROUTE_EVENT } from '../lib/ui'
import LoadError from '../pages/LoadError'
import { decode, match, type PageComponent, type Params, type RouteDef } from './routes'

// A small router that owns the moment a page changes: load the chunk first, then swap,
// then restore scroll through Lenis, refresh ScrollTrigger, move focus and set the head.

// The functions and the two components below share one module store, so they stay in one file.
// Editing this file in dev reloads the page instead of hot-swapping it.
/* oxlint-disable react/only-export-components */

export type RouteState = {
  route: RouteDef
  params: Params
  /** App path: base stripped, no trailing slash. */
  pathname: string
  search: URLSearchParams
  hash: string
  Component: PageComponent
  /** History entry key. */
  key: string
  action: 'load' | 'push' | 'replace' | 'pop'
  /** Counts page commits. Filter and same-page anchor changes leave it alone. */
  commit: number
}

const STORAGE_KEY = 'portfolio:scroll'
const PENDING_DELAY = 150

let state: RouteState
let pending = false
let navigation = 0
const listeners = new Set<() => void>()
const pendingListeners = new Set<() => void>()
const scrollMemory = new Map<string, number>()

const emit = (set: Set<() => void>) => set.forEach((listener) => listener())

function setState(next: RouteState) {
  state = next
  emit(listeners)
}

function setPending(value: boolean) {
  if (pending === value) return
  pending = value
  emit(pendingListeners)
}

const newKey = () => (typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`)

/** location.pathname to app path: base stripped, '/index.html' and trailing slashes dropped. */
function appPath(pathname: string) {
  let path = pathname
  if (BASE && (path === BASE || path.startsWith(`${BASE}/`))) path = path.slice(BASE.length)
  if (path.endsWith('/index.html')) path = path.slice(0, -'index.html'.length)
  while (path.endsWith('/')) path = path.slice(0, -1)
  return path || '/'
}

function parse(to: string) {
  const url = new URL(to, window.location.origin)
  let pathname = url.pathname
  while (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1)
  return { pathname, search: url.search, hash: url.hash }
}

/** The element a '#hash' points at. A malformed hash ('#%E0') is looked up as written instead of throwing. */
const hashTarget = (hash: string) => (hash.length > 1 ? document.getElementById(decode(hash.slice(1))) : null)

function rememberScroll() {
  if (state) scrollMemory.set(state.key, window.scrollY)
}

/** Old one-page anchors ('/#work') land on the page that replaced them. */
function legacyTarget() {
  if (appPath(window.location.pathname) !== '/') return null
  const key = window.location.hash.slice(1)
  // Own keys only: '#toString' or '#constructor' must not find Object.prototype.
  return Object.hasOwn(legacyHashes, key) ? legacyHashes[key] : null
}

async function load(route: RouteDef, id: number) {
  const timer = window.setTimeout(() => {
    if (id === navigation) setPending(true)
  }, PENDING_DELAY)
  try {
    return await route.load()
  } finally {
    window.clearTimeout(timer)
  }
}

export async function initRouter(): Promise<void> {
  history.scrollRestoration = 'manual'
  ScrollTrigger.clearScrollMemory('manual')

  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '[]') as [string, number][]
    saved.forEach(([key, y]) => scrollMemory.set(key, y))
  } catch {
    // Private mode or a broken value: start without remembered positions.
  }

  const legacy = legacyTarget()
  if (legacy) history.replaceState(history.state, '', href(legacy))

  let key = (history.state as { key?: string } | null)?.key
  if (!key) {
    key = newKey()
    history.replaceState({ key }, '', window.location.href)
  }

  const pathname = appPath(window.location.pathname)
  const { route, params } = match(pathname)
  // A first visit to an inner page needs its chunk before anything renders. If it does not arrive
  // (a flaky network, a blocked file, a deploy in between), try once more, then draw an error page
  // instead of leaving the screen empty.
  const Component = await Promise.resolve()
    .then(route.load)
    .catch(route.load)
    .catch(() => LoadError)
  state = {
    route,
    params,
    pathname,
    search: new URLSearchParams(window.location.search),
    hash: window.location.hash,
    Component,
    key,
    action: 'load',
    commit: 0,
  }

  window.addEventListener('popstate', onPop)
  window.addEventListener('hashchange', onHashChange)
  window.addEventListener('pagehide', () => {
    rememberScroll()
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...scrollMemory].slice(-50)))
    } catch {
      // Nothing to do: the next load starts at the top.
    }
  })
}

function onHashChange() {
  const legacy = legacyTarget()
  if (legacy) void navigate(legacy, { replace: true })
}

async function onPop() {
  const legacy = legacyTarget()
  if (legacy) {
    void navigate(legacy, { replace: true })
    return
  }

  let key = (history.state as { key?: string } | null)?.key
  if (!key) {
    // A hash typed into the address bar makes an entry the router did not write.
    key = newKey()
    history.replaceState({ key }, '', window.location.href)
  }

  const pathname = appPath(window.location.pathname)
  const search = new URLSearchParams(window.location.search)
  const hash = window.location.hash
  rememberScroll()

  if (pathname === state.pathname) {
    // Same page: an anchor or the filter. No remount, no focus move.
    navigation++
    setPending(false)
    setState({ ...state, search, hash, key, action: 'pop' })
    setHead(state.route.head(state.params, search), pathname)
    const target = hashTarget(hash)
    jumpTo(scrollMemory.get(key) ?? (target ? topOf(target) : 0))
    return
  }

  const id = ++navigation
  const { route, params } = match(pathname)
  let Component: PageComponent
  try {
    Component = await load(route, id)
  } catch {
    // Only the newest navigation may act on a failure: an older one has already been left behind.
    if (id === navigation) window.location.reload()
    return
  }
  if (id !== navigation) return
  setState({ route, params, pathname, search, hash, Component, key, action: 'pop', commit: state.commit + 1 })
  setPending(false)
}

export async function navigate(to: string, opts: { replace?: boolean; scroll?: boolean } = {}): Promise<void> {
  const { pathname, search, hash } = parse(to)
  const url = href(pathname) + search + hash

  if (pathname === state.pathname) {
    navigation++
    setPending(false)
    const sameSearch = search === window.location.search

    if (!sameSearch || opts.scroll === false) {
      // The kind filter: a shareable URL, but no history entry, no scroll, no focus move.
      history.replaceState({ key: state.key }, '', url)
      const params = new URLSearchParams(search)
      setState({ ...state, search: params, hash })
      setHead(state.route.head(state.params, params), pathname)
      return
    }

    if (hash) {
      if (hash !== state.hash) {
        rememberScroll()
        const key = newKey()
        history.pushState({ key }, '', url)
        setState({ ...state, hash, key, action: 'push' })
      }
      scrollToId(decode(hash.slice(1)))
      return
    }

    // A link to the page we are on: go back to its top.
    if (state.hash) {
      history.replaceState({ key: state.key }, '', url)
      setState({ ...state, hash: '' })
    }
    scrollToTop()
    return
  }

  const id = ++navigation
  const { route, params } = match(pathname)
  let Component: PageComponent
  try {
    Component = await load(route, id)
  } catch {
    // The chunk did not arrive (offline, or a deploy replaced it): let the browser load the page,
    // unless the visitor has already moved on to a newer navigation.
    if (id === navigation) window.location.assign(url)
    return
  }
  if (id !== navigation) return

  rememberScroll()
  const key = opts.replace ? state.key : newKey()
  if (opts.replace) history.replaceState({ key }, '', url)
  else history.pushState({ key }, '', url)

  setState({
    route,
    params,
    pathname,
    search: new URLSearchParams(search),
    hash,
    Component,
    key,
    action: opts.replace ? 'replace' : 'push',
    commit: state.commit + 1,
  })
  setPending(false)
}

/** Fetch a page's chunk ahead of the click. */
export function prefetch(to: string): void {
  try {
    void Promise.resolve(match(parse(to).pathname).route.load()).catch(() => {})
  } catch {
    // A prefetch is never worth an error.
  }
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const subscribePending = (listener: () => void) => {
  pendingListeners.add(listener)
  return () => pendingListeners.delete(listener)
}

export function useRoute(): RouteState {
  return useSyncExternalStore(subscribe, () => state)
}

/** True once a navigation has waited on a chunk for more than 150 ms. */
export function usePending(): boolean {
  return useSyncExternalStore(subscribePending, () => pending)
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; replace?: boolean; scroll?: boolean }

/** An internal link: a real <a href> that the router takes over on a plain left click. */
export function Link({ to, replace, scroll: keepScroll, onClick, onPointerEnter, onFocus, onTouchStart, ...rest }: LinkProps) {
  function click(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || rest.target) return
    event.preventDefault()
    void navigate(to, { replace, scroll: keepScroll })
  }

  return (
    <a
      {...rest}
      href={href(to)}
      onClick={click}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        prefetch(to)
      }}
      onFocus={(event) => {
        onFocus?.(event)
        prefetch(to)
      }}
      onTouchStart={(event) => {
        onTouchStart?.(event)
        prefetch(to)
      }}
    />
  )
}

/** Renders the current page and runs the per-commit sequence around it. */
export function RouterView() {
  const current = useRoute()
  const { Component, commit } = current

  // Before paint: head, then the scroll position for this history entry.
  useLayoutEffect(() => {
    const { route, params, search, pathname, hash, key, action } = state
    setHead(route.head(params, search), pathname)
    scroll.lenis?.resize()

    const target = hashTarget(hash)
    const remembered = scrollMemory.get(key)
    let y = 0
    if (action === 'pop') y = remembered ?? 0
    else if (action === 'load') y = target ? topOf(target) : (remembered ?? 0)
    else if (target) y = topOf(target)
    jumpTo(y)

    if (action !== 'load') {
      // Replay the short fade on <main> (index.css).
      const main = document.getElementById('main')
      if (main) {
        main.removeAttribute('data-route-in')
        void main.offsetWidth
        main.setAttribute('data-route-in', '')
      }
    }
  }, [commit])

  // After the new page's own effects have created their ScrollTriggers.
  useEffect(() => {
    requestRefresh()
    if (state.action !== 'load') {
      // A link to an anchor hands focus to the anchor, so the next Tab continues from there.
      // Otherwise the new page is announced by its heading.
      const target = state.action !== 'pop' ? hashTarget(state.hash) : null
      const heading = target ?? document.querySelector<HTMLElement>('#main h1') ?? document.getElementById('main')
      if (heading) focusTarget(heading)
    }
    window.dispatchEvent(new Event(ROUTE_EVENT))
  }, [commit])

  return <Component key={current.pathname} params={current.params} />
}
