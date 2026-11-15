// Pure data: no imports from the bundler, the DOM or React.
// Results are written exactly as they happened. Never round a placement up.

export type Competition = {
  /** Anchor on /competitions and the value of App.competition. */
  id: 'ict-skills-battle' | 'regional-championships' | 'zentralhack' | 'national-final'
  /** Left side of the results row: 'ICT Skills Battle'. */
  name: string
  /** The number that counts up in the results row: 2026, 24, 2027. */
  figure: number
  /** The words after the number: 'Winner', 'hours to an MVP', 'ICT Skills'. */
  note: string
  upcoming?: boolean
  /** The block under the results. ZentralHack has none: the Hackathon section is its block.
   *  A competition with nothing more to say than its result has none either. */
  block?: {
    /** The label row that opens the block, left and right: ['ICT Skills Battle', '2026']. */
    label: [string, string]
    /** Accent label above the heading. Leave out when the label row already says it all. */
    kicker?: string
    /** Heading, one string per line. */
    title: string[]
    text: string
    /** Slug of the app this produced. Renders a link to its page and its first screenshots. */
    app?: string
  }
}

/** Order of the results rows and of the blocks. The first place leads, the rest follow as they happened. */
export const competitions: Competition[] = [
  {
    id: 'ict-skills-battle',
    name: 'ICT Skills Battle',
    figure: 2026,
    note: 'Winner',
    block: {
      label: ['ICT Skills Battle', '2026'],
      kicker: 'Winner, Application Development',
      title: ['First place,', 'under pressure.'],
      text: 'A Killer Sudoku desktop app in Electron, React and SQLite, built under competition time pressure.',
      app: 'killer-sudoku',
    },
  },
  {
    id: 'regional-championships',
    name: 'Regional ICT Championships',
    figure: 2026,
    note: '4th in Zurich, 11th in Switzerland',
  },
  { id: 'zentralhack', name: 'ZentralHack', figure: 24, note: 'hours to an MVP' },
  {
    id: 'national-final',
    name: 'National finalist',
    figure: 2027,
    note: 'ICT Skills',
    upcoming: true,
    block: {
      label: ['Up next', '2027'],
      title: ['National final.'],
      text: 'Qualified for the ICT Skills national final.',
    },
  },
]

export type Hackathon = {
  event: string
  track: string
  month: string
  team: string
  name: string
  title: string[]
  text: string
  beats: { label: string; detail: string }[]
  stack: string[]
  links: { label: string; href: string }[]
  /** Slug of the app page that tells the rest. */
  app: string
  /** Paths under public/. */
  shots: { web: { file: string; alt: string }; phones: { file: string; alt: string }[] }
}

export const hackathon: Hackathon = {
  event: 'ZentralHack 2026',
  track: 'EntrepreneurSkills Challenge · SDG 11',
  month: 'October 2026',
  team: 'With Francesco Rocca',
  name: 'ROCHADE',
  title: ['Renovate without', 'evicting anyone.'],
  text: 'When a housing cooperative renovates, residents move into temporary flats for months. ROCHADE works out who moves where and when, rebuilds the plan the moment a construction phase shifts, and says exactly what is missing when no plan fits.',
  beats: [
    { label: 'Problem', detail: 'Renovations push tenants out. Cooperatives juggle the temporary flats by hand.' },
    { label: 'Solver', detail: 'An allocation solver that replans in place and explains every conflict.' },
    { label: 'Two apps', detail: 'An iPhone app for residents and a web dashboard for the cooperative.' },
    { label: 'Live sync', detail: 'Shift a phase on the dashboard; about two seconds later the resident’s phone updates.' },
    { label: 'Pitch', detail: 'Two minutes on stage, a working MVP, and 24 passing tests behind it.' },
  ],
  stack: ['Expo', 'React 19', 'Supabase realtime', 'TypeScript', 'Vite 8'],
  links: [
    { label: 'Live site', href: 'https://roschade.alexplatret.com' },
    { label: 'Code', href: 'https://github.com/platret/ROCHADE' },
  ],
  app: 'rochade',
  shots: {
    web: { file: 'images/rochade/web.jpg', alt: 'ROCHADE website: “Sanieren, ohne jemanden rauszuwerfen” above a live plan of three houses' },
    phones: [
      { file: 'images/rochade/mein-umzug.jpg', alt: 'ROCHADE iPhone app: a resident’s move with status, dates and checklist' },
      { file: 'images/rochade/siedlung.jpg', alt: 'ROCHADE iPhone app: the estate view with the renovation phases as a timeline' },
    ],
  },
}

/** A startup programme, shown at the end of the page and kept apart from the results:
 *  it is a course, not a contest, and there is no placement to report. */
export type Programme = {
  /** Anchor on /competitions. */
  id: string
  /** Accent label above the heading. */
  kicker: string
  /** Heading, one string per line. */
  title: string[]
  text: string
  link?: { label: string; href: string }
}

export const programme: Programme = {
  id: 'youngpreneurs',
  kicker: 'Youngpreneurs Zurich 2026/27',
  title: ['Sponsuno,', 'at Youngpreneurs.'],
  text: 'Youngpreneurs is a startup programme, not a contest, so there is no result to report here. I am building Sponsuno in it with a team of four, and I look after the technology. Sponsuno matches athletes and clubs in sport and culture with sponsors from their own region. The platform is not live yet. The website is.',
  link: { label: 'Visit sponsuno.ch', href: 'https://sponsuno.ch' },
}
