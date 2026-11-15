// Pure data: no imports from the bundler, the DOM or React.

export const SITE_ORIGIN = 'https://alexplatret.com'

export type NavId = 'apps' | 'history' | 'competitions' | 'about'

export type NavItem = {
  id: NavId
  /** Header, phone menu, home row, palette. */
  label: string
  to: string
  /** Second line of the home row. */
  blurb: string
  /** document.title for the page. */
  title: string
  /** Meta description. '{n}' is replaced with the number of apps. */
  description: string
}

/** Tab title of an inner page: pageTitle('Apps') is 'Apps · Alex'. */
export const pageTitle = (page: string) => `${page} · Alex`

/** Header order. */
export const nav: NavItem[] = [
  {
    id: 'apps',
    label: 'Apps',
    to: '/apps',
    blurb: 'iPhone, web and desktop apps, browser games and developer tools.',
    title: pageTitle('Apps'),
    description: '{n} apps by Alex: iPhone apps, web apps, browser games, desktop apps and developer tools.',
  },
  {
    id: 'history',
    label: 'History',
    to: '/history',
    blurb: 'From the first lines of HTML to an apprenticeship and a startup.',
    title: pageTitle('History'),
    description: 'From first code in 2022 to the ICT Skills national final in 2027.',
  },
  {
    id: 'competitions',
    label: 'Competitions',
    to: '/competitions',
    blurb: 'One first place, one 24-hour hackathon, one national final ahead.',
    title: pageTitle('Competitions'),
    description: 'ICT Skills Battle 2026 winner, ZentralHack 2026 with ROCHADE, and the ICT Skills national final in 2027.',
  },
  {
    id: 'about',
    label: 'About',
    to: '/about',
    blurb: 'Frontend, mostly. What I care about and what I am doing now.',
    title: pageTitle('About'),
    description: 'Full-stack developer in Zurich who spends most of his time on the frontend.',
  },
]

/** The home page keeps the title and description that index.html ships with. */
export const home = {
  title: 'Alex — Frontend & Full-stack Developer',
  description: 'Alex — frontend-focused full-stack developer in Zurich. React, TypeScript, Java backends, iOS apps and AI workflows.',
}

/** Old in-page anchors of the one-page site, keyed by hash without '#'.
 *  '#intro' and '#contact' are not here: both still exist on '/'. */
export const legacyHashes: Record<string, string> = {
  work: '/apps',
  'feature-sponsuno': '/apps/sponsuno',
  'feature-lernspur': '/apps/lernspur',
  hackathon: '/competitions#zentralhack',
  now: '/about#now',
  about: '/about',
  path: '/history',
}
