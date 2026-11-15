import { home, SITE_ORIGIN } from '../content/nav'

export type Head = { title: string; description?: string; noindex?: boolean }

function meta(selector: string, create: () => HTMLElement) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el
}

function named(attr: 'name' | 'property', key: string, content: string) {
  meta(`meta[${attr}="${key}"]`, () => {
    const el = document.createElement('meta')
    el.setAttribute(attr, key)
    return el
  }).setAttribute('content', content)
}

/** Title, description, canonical and Open Graph for the page at `pathname` (app path, no base).
 *  The canonical always points at alexplatret.com, so the GitHub Pages mirror never competes with it. */
export function setHead(head: Head, pathname: string) {
  const description = head.description ?? home.description
  const url = SITE_ORIGIN + pathname

  document.title = head.title
  named('name', 'description', description)
  named('property', 'og:title', head.title)
  named('property', 'og:description', description)
  named('property', 'og:url', url)

  meta('link[rel="canonical"]', () => {
    const el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    return el
  }).setAttribute('href', url)

  const robots = document.head.querySelector('meta[name="robots"]')
  if (head.noindex) named('name', 'robots', 'noindex')
  else robots?.remove()
}
