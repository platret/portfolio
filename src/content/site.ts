export type Project = {
  title: string
  year: string
  stack: string
  image: string
  href?: string
}

export type Fact = {
  label: string
  value?: number
  note?: string
  list?: string[]
}

export const site = {
  name: 'Alex',
  nameLines: ['Alex'],
  role: 'Frontend developer',
  employer: 'Apprentice at UBS',
  location: 'Zurich, CH',
  email: 'hey@alex.ch',
  intro:
    'I build interfaces that feel considered: typography first, motion that earns its place, and code that stays readable a year later. Currently an apprentice at UBS in Zurich, shipping React and TypeScript by day and side projects by night.',
  projects: [
    { title: 'Listen Together', year: '2026', stack: 'Cider plugin · Apple Music sync engine', image: '/images/preview-1.png' },
    { title: 'SentieroAlpino', year: '2025', stack: 'Hiking route API', image: '/images/preview-2.png' },
    { title: 'ConcertAPI', year: '2025', stack: 'Spring Boot · JWT', image: '/images/preview-3.png' },
    { title: 'Multi-agent build pipeline', year: '2026', stack: 'Claude Code orchestration', image: '/images/preview-4.png' },
  ] as Project[],
  strip: [
    { src: '/images/strip-1.png', alt: 'Halftone study' },
    { src: '/images/strip-2.png', alt: 'Disc study' },
    { src: '/images/strip-3.png', alt: 'Diagonal study' },
    { src: '/images/strip-4.png', alt: 'Wave study' },
    { src: '/images/strip-5.png', alt: 'Grid study' },
    { src: '/images/strip-6.png', alt: 'Eclipse study' },
  ],
  about: {
    heading: ['Frontend,', 'mostly.'],
    text: 'Apprentice at UBS in Zurich. I care about the last ten percent: the easing curve, the letter-spacing, the empty state nobody tests. Off hours I play records.',
  },
  facts: [
    { label: 'ICT Skills Battle', value: 2026, note: 'Winner' },
    { label: 'National finalist', value: 2027, note: 'ICT Skills' },
    { label: 'Languages', list: ['TypeScript', 'Java'] },
    { label: 'Tools', list: ['React', 'Spring Boot'] },
    { label: 'Off hours', list: ['DJ'] },
  ] as Fact[],
  links: [
    { label: 'GitHub', href: 'https://github.com/ia24b-platreta' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
}
