// Every internal URL goes through here, so the site works at '/' (alexplatret.com)
// and at '/portfolio/' (GitHub Pages) without a root-relative path written by hand.

/** '' on alexplatret.com, '/portfolio' on GitHub Pages. */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/** URL of an app path. `to` always starts with '/': href('/apps') is '/apps' or '/portfolio/apps'. */
export const href = (to: string) => BASE + to

/** URL of a file in public/, written without a leading slash: asset('images/portrait.png'). */
export const asset = (path: string) => import.meta.env.BASE_URL + path
