// Vite plugin: writes robots.txt and sitemap.xml into the build from the content files,
// so a new app page is listed the moment it is added to apps.ts.
// Both hosts get the same files. URLs always point at the canonical domain, the one in index.html.

import type { Plugin } from 'vite'
import { apps } from '../src/content/apps.ts'
import { nav } from '../src/content/nav.ts'

const ORIGIN = 'https://alexplatret.com'

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function sitemapPaths(): string[] {
  const paths = ['/', ...nav.map((item) => item.to), ...apps.map((app) => `/apps/${app.slug}`)]
  return [...new Set(paths)]
}

export function seo(): Plugin {
  return {
    name: 'portfolio-seo',
    apply: 'build',
    generateBundle() {
      const urls = sitemapPaths()
        .map((path) => `  <url><loc>${escape(ORIGIN + path)}</loc></url>`)
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
      })
    },
  }
}
