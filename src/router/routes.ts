import type { ComponentType } from 'react'
import { home, nav, pageTitle, type NavId } from '../content/nav'
import { site } from '../content/site'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

export type Params = Record<string, string>
export type PageComponent = ComponentType<{ params: Params }>
export type RouteId = 'home' | 'apps' | 'app' | 'history' | 'competitions' | 'about' | 'notfound'
export type RouteHead = { title: string; description?: string; noindex?: boolean }

export type RouteDef = {
  id: RouteId
  /** '/apps/:slug'. A segment that starts with ':' captures. */
  pattern: string
  /** The header item this page belongs to. */
  nav?: NavId
  load: () => PageComponent | Promise<PageComponent>
  /** false renders the Not found page in place. */
  valid?: (params: Params) => boolean
  head: (params: Params, search: URLSearchParams) => RouteHead
}

const navHead = (id: NavId) => (): RouteHead => {
  const item = nav.find((n) => n.id === id)!
  // Stage 2 counts apps.ts here.
  return { title: item.title, description: item.description.replace('{n}', String(site.projects.length)) }
}

/** Home and Not found ship in the entry chunk; every other page is its own chunk. */
export const routes: RouteDef[] = [
  { id: 'home', pattern: '/', load: () => Home, head: () => home },
  { id: 'apps', pattern: '/apps', nav: 'apps', load: () => import('../pages/Apps').then((m) => m.default), head: navHead('apps') },
  { id: 'history', pattern: '/history', nav: 'history', load: () => import('../pages/History').then((m) => m.default), head: navHead('history') },
  { id: 'competitions', pattern: '/competitions', nav: 'competitions', load: () => import('../pages/Competitions').then((m) => m.default), head: navHead('competitions') },
  { id: 'about', pattern: '/about', nav: 'about', load: () => import('../pages/About').then((m) => m.default), head: navHead('about') },
]

export const notFound: RouteDef = {
  id: 'notfound',
  pattern: '*',
  load: () => NotFound,
  head: () => ({ title: pageTitle('Page not found'), noindex: true }),
}

const segments = (path: string) => path.split('/').filter(Boolean)

function decode(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

/** Match an app path (base already stripped). No match, or valid() false, gives notFound. */
export function match(pathname: string): { route: RouteDef; params: Params } {
  const parts = segments(pathname)
  for (const route of routes) {
    const pattern = segments(route.pattern)
    if (pattern.length !== parts.length) continue
    const params: Params = {}
    const hit = pattern.every((segment, i) => {
      if (segment.startsWith(':')) {
        params[segment.slice(1)] = decode(parts[i])
        return true
      }
      return segment === parts[i]
    })
    if (!hit) continue
    if (route.valid && !route.valid(params)) return { route: notFound, params }
    return { route, params }
  }
  return { route: notFound, params: {} }
}
