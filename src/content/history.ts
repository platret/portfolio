// Pure data: no imports from the bundler, the DOM or React.

export type HistoryItem = {
  /** Four digits: '2026'. Entries are in display order; the big year is printed once per year. */
  year: string
  /** Optional, shown in place of a repeated year: 'October'. */
  month?: string
  title: string
  detail: string
  /** Not happened yet: hollow dot, dimmed year. */
  upcoming?: boolean
  /** App path that turns the title into a link: '/apps/sponsuno', '/competitions#zentralhack'. */
  to?: string
}

export const history: HistoryItem[] = [
  {
    year: '2022',
    title: 'Foundations',
    detail: 'First real code. Programming basics, HTML and CSS, then JavaScript. Enough small projects to know this was the direction.',
  },
  {
    year: '2024',
    title: 'Apprenticeship at UBS',
    detail: 'Started the application development apprenticeship in Zurich. Frontend work in React and TypeScript, backend in Java and Spring Boot, real teams, real reviews.',
  },
  {
    year: '2026',
    title: 'Regional ICT Championships',
    detail: 'Placed 4th in Zurich and 11th in Switzerland.',
    to: '/competitions',
  },
  {
    year: '2026',
    title: 'ICT Skills Battle, winner',
    detail: 'First place. A Killer Sudoku desktop app in Electron, React and SQLite built under competition time pressure.',
    to: '/competitions#ict-skills-battle',
  },
  {
    year: '2026',
    title: 'SentieroAlpino',
    detail: 'Built a frontend for a course hiking API in plain JavaScript, with every business rule checked in the browser.',
    to: '/apps/sentiero-alpino',
  },
  {
    year: '2026',
    title: 'Youngpreneurs',
    detail: 'Joined Youngpreneurs as an entrepreneur. Scoping products, pricing them, pitching them.',
  },
  {
    year: '2026',
    title: 'Sponsuno',
    detail: 'Started a sponsoring startup with a team of four. Built sponsuno.ch, its design system and the pipeline that ships it.',
    to: '/apps/sponsuno',
  },
  {
    year: '2026',
    title: 'ZentralHack, ROCHADE',
    detail: '24 hours, one housing problem. Shipped a solver, an iPhone app and a live dashboard, then pitched it in two minutes.',
    to: '/competitions#zentralhack',
  },
  {
    year: '2027',
    title: 'National final',
    detail: 'ICT Skills national finalist. Up next.',
    upcoming: true,
    to: '/competitions#national-final',
  },
]
