export type Project = {
  title: string
  year: string
  stack: string
  image: string
  description?: string
  href?: string
}

export type NowItem = {
  label: string
  value: string
  clock?: string
}

export type PathItem = {
  year: string
  title: string
  detail: string
  upcoming?: boolean
}

export type Fact = {
  label: string
  value?: number
  note?: string
  list?: string[]
}

export const GITHUB_URL = 'https://github.com/platret'
export const LINKEDIN_URL = 'TODO'

const repo = (slug: string) => `${GITHUB_URL}/${slug}`

export const site = {
  name: 'Alex',
  nameLines: ['Alex'],
  role: 'Frontend developer',
  employer: 'Apprentice at UBS',
  location: 'Zurich, CH',
  email: 'platret.alex@gmail.com',
  intro:
    'I build interfaces that feel considered: typography first, motion that earns its place, and code that stays readable a year later. Currently an apprentice at UBS in Zurich, shipping React and TypeScript by day and side projects by night.',
  projects: [
    { title: 'Listen Together', year: '2026', stack: 'Cider plugin · Apple Music sync engine', image: '/images/preview-1.png' },
    { title: 'SentieroAlpino', year: '2025', stack: 'Hiking route API', image: '/images/preview-2.png', href: repo('sentiero-alpino') },
    { title: 'ConcertAPI', year: '2025', stack: 'Spring Boot · JWT', image: '/images/preview-3.png' },
    { title: 'Multi-agent build pipeline', year: '2026', stack: 'Claude Code orchestration', image: '/images/preview-4.png' },
  ] as Project[],
  moreProjects: [
    {
      title: 'AthliTrack',
      year: '2025',
      stack: 'React · TypeScript',
      image: '/images/preview-5.png',
      description: 'Workout and progression tracker. Session logging, volume tracking and personal record detection.',
    },
    {
      title: 'SwissFlow AI',
      year: '2026',
      stack: 'Concept · Automation',
      image: '/images/preview-6.png',
      description: 'Automation agency concept for Swiss SMBs. Scoped, priced and pitched. Shelved before launch, kept here because the research was the point.',
    },
    {
      title: 'LottoAPI',
      year: '2026',
      stack: 'Java · Spring Boot · Jersey',
      image: '/images/preview-7.png',
      description: 'Stateless JAX-RS lottery service. Tip submission, draw generation and hit evaluation, no persistence layer.',
    },
    {
      title: 'MVC Converter',
      year: '2026',
      stack: 'Java · Servlets · JSP · JUnit',
      image: '/images/preview-8.png',
      description: 'Classic MVC web app doing decimal to binary conversion. Client and server side validation, logic covered by unit tests.',
    },
    {
      title: 'CiderDeck Fix',
      year: '2026',
      stack: 'JavaScript · Stream Deck SDK',
      image: '/images/preview-9.png',
      description: 'Traced and fixed a state-layer bug in the Cider Stream Deck plugin where album art painted onto a hidden button state.',
    },
  ] as Project[],
  portrait: { src: '/images/portrait.png', alt: 'Portrait of Alex' },
  now: [
    { label: 'Location', value: 'Zurich, CH', clock: 'Europe/Zurich' },
    { label: 'Currently', value: 'Apprentice at UBS' },
    { label: 'Building', value: 'Listen Together' },
    { label: 'Next', value: 'ICT Skills national final, 2027' },
    { label: 'Off hours', value: 'Gym, gaming, DJ sets' },
  ] as NowItem[],
  about: {
    heading: ['Frontend,', 'mostly.'],
    text: 'Apprentice at UBS in Zurich. I care about the last ten percent: the easing curve, the letter-spacing, the empty state nobody tests. Off hours I play records.',
  },
  facts: [
    { label: 'ICT Skills Battle', value: 2026, note: 'Winner' },
    { label: 'National finalist', value: 2027, note: 'ICT Skills' },
    { label: 'Languages', list: ['TypeScript', 'Java'] },
    { label: 'Tools', list: ['React', 'Spring Boot'] },
    { label: 'Off hours', list: ['Gym', 'Gaming', 'DJ'] },
  ] as Fact[],
  path: [
    { year: '2025', title: 'SentieroAlpino, ConcertAPI', detail: 'Two backend projects shipped. Hiking route API, then a Spring Boot concert service with JWT auth.' },
    { year: '2026', title: 'ICT Skills Battle, winner', detail: 'First place. Killer Sudoku desktop app built under time pressure.' },
    { year: '2026', title: 'Listen Together', detail: 'Cider plugin syncing Apple Music playback across listeners. Plus a multi-agent build pipeline on Claude Code.' },
    { year: '2027', title: 'National final', detail: 'ICT Skills national finalist. Up next.', upcoming: true },
  ] as PathItem[],
  sections: [
    { id: 'intro', label: 'Intro' },
    { id: 'work', label: 'Work' },
    { id: 'now', label: 'Now' },
    { id: 'about', label: 'About' },
    { id: 'path', label: 'Path' },
    { id: 'contact', label: 'Contact' },
  ],
  links: [
    { label: 'GitHub', href: GITHUB_URL },
    { label: 'LinkedIn', href: LINKEDIN_URL },
  ],
}
