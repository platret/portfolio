import { apps, SHELVES, SHOT_DEFAULT_SIZE, type App, type AppShot } from '../content/apps'

// Helpers around the catalogue in content/apps.ts. No React, no DOM.

export type ShelfDef = (typeof SHELVES)[number]

export const appBySlug = (slug: string): App | undefined => apps.find((app) => app.slug === slug)

export const shelfOf = (app: App): ShelfDef => SHELVES.find((shelf) => (shelf.kinds as readonly string[]).includes(app.kind)) ?? SHELVES[0]

export const shelfById = (id: string | null): ShelfDef | undefined => SHELVES.find((shelf) => shelf.id === id)

export const appsOf = (shelf: ShelfDef): App[] => apps.filter((app) => shelfOf(app) === shelf)

/** Shelves that hold at least one app, in display order. */
export const shelves: ShelfDef[] = SHELVES.filter((shelf) => appsOf(shelf).length > 0)

/** apps sorted by shelf order, stable inside a shelf: the order of the index and of the pager. */
export const orderedApps: App[] = shelves.flatMap(appsOf)

/** The icons of the home page's Apps row, in the order their `featured` numbers give. */
export const featuredApps: App[] = apps
  .filter((app) => app.featured !== undefined)
  .sort((a, b) => a.featured! - b.featured!)
  .slice(0, 8)

/** The apps before and after this one in index order. Wraps around at both ends. */
export function neighbours(slug: string): { prev: App; next: App } {
  const i = orderedApps.findIndex((app) => app.slug === slug)
  const n = orderedApps.length
  return { prev: orderedApps[(i - 1 + n) % n], next: orderedApps[(i + 1) % n] }
}

export const monogramOf = (app: App): string => app.monogram ?? app.name.charAt(0).toUpperCase()

/** Pixel size of a screenshot: the declared one, else the default of its frame. */
export const shotSize = (shot: AppShot): { width: number; height: number } =>
  shot.width && shot.height ? { width: shot.width, height: shot.height } : (SHOT_DEFAULT_SIZE[shot.frame] ?? { width: 1440, height: 900 })

/** 'https://platret.github.io/afterdrop/' becomes 'platret.github.io/afterdrop'. */
export function linkLabel(url: string): string {
  try {
    const { hostname, pathname } = new URL(url)
    const path = pathname.replace(/\/+$/, '')
    return hostname.replace(/^www\./, '') + path
  } catch {
    return url
  }
}

/** 'https://github.com/platret/lernspur' becomes 'platret/lernspur'. */
export function repoLabel(url: string): string {
  try {
    return new URL(url).pathname.split('/').filter(Boolean).slice(0, 2).join('/')
  } catch {
    return url
  }
}

/** Tab title of a filtered index: 'iPhone apps', 'Web apps', 'Games', 'Desktop apps', 'Tools'. */
export const shelfTitle = (shelf: ShelfDef): string => (shelf.label.endsWith('s') ? shelf.label : `${shelf.label} apps`)
