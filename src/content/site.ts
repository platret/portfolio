export type Project = {
  title: string
  year: string
  stack: string
  image: string
  icon?: string
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
export const LINKEDIN_URL = 'https://ch.linkedin.com/in/alex-platret-087b2b351'

const repo = (slug: string) => `${GITHUB_URL}/${slug}`
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const site = {
  name: 'Alex',
  nameLines: ['Alex'],
  role: 'Full-stack developer',
  employer: 'Apprentice at UBS',
  location: 'Zurich, CH',
  email: 'platret.alex@gmail.com',
  intro:
    'Frontend is where I spend most of my time. I build considered interfaces in React and TypeScript, and take projects from the first screen to the backend behind it. Currently an apprentice at UBS in Zurich, building apps and exploring AI workflows on the side.',
  projects: [
    {
      title: 'Lernspur',
      icon: asset('images/apps/lernspur.png'),
      year: '2026',
      stack: 'SwiftUI · Local learning journal',
      image: asset('images/lernspur.png'),
      description: 'A local learning journal for capturing progress and turning it into reports.',
      href: 'https://lernspur.alexplatret.com',
    },
    {
      title: 'What Was That?',
      icon: asset('images/apps/whatwasthat.png'),
      year: '2026',
      stack: 'SwiftUI · Recommendations & widgets',
      image: asset('images/whatwasthat.svg'),
      description: 'Keep recommendations and remember who shared them, with quick access through widgets.',
      href: 'https://whatwasthat.alexplatret.com',
    },
    {
      title: 'Is it raining on me?',
      icon: asset('images/apps/isitraining.png'),
      year: '2026',
      stack: 'SwiftUI · Rain radar & widgets',
      image: asset('images/isitraining.png'),
      description: 'A focused answer to one question: will it rain here in the next 90 minutes?',
      href: 'https://isitraining.alexplatret.com',
    },
    { title: 'SentieroAlpino', year: '2026', stack: 'Hiking route API', image: asset('images/preview-2.png'), description: 'A hiking project that taught me to design the API before writing the implementation.', href: repo('sentiero-alpino') },
  ] as Project[],
  portrait: { src: asset('images/portrait.png'), alt: 'Illustrated halftone portrait' },
  now: [
    { label: 'Location', value: 'Zurich, CH', clock: 'Europe/Zurich' },
    { label: 'Currently', value: 'Entrepreneur at Youngpreneurs' },
    { label: 'Day job', value: 'Apprentice at UBS' },
    { label: 'Building', value: 'iOS apps & AI workflows' },
    { label: 'Next', value: 'ICT Skills national final, 2027' },
    { label: 'Off hours', value: 'Gym, gaming, DJ sets' },
  ] as NowItem[],
  about: {
    heading: ['Frontend,', 'mostly.'],
    text: 'I care about how an interface feels, down to the easing curve and the empty state. I also dabble in full-stack: Java backends, native iOS apps, AI agent pipelines and automated workflows. I like building the whole application and figuring out how the pieces fit together. Off hours I play records.',
  },
  facts: [
    { label: 'ICT Skills Battle', value: 2026, note: 'Winner' },
    { label: 'National finalist', value: 2027, note: 'ICT Skills' },
    { label: 'Languages', list: ['TypeScript', 'Java', 'Swift'] },
    { label: 'Tools', list: ['React', 'Spring Boot', 'SwiftUI'] },
    { label: 'Off hours', list: ['Gym', 'Gaming', 'DJ'] },
  ] as Fact[],
  path: [
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
      title: 'SentieroAlpino',
      detail: 'Built a hiking route API. Learned to design an API before writing it.',
    },
    {
      year: '2026',
      title: 'ICT Skills Battle, winner',
      detail: 'First place. A Killer Sudoku desktop app in Electron, React and SQLite built under competition time pressure.',
    },
    {
      year: '2026',
      title: 'Youngpreneurs',
      detail: 'Joined Youngpreneurs as an entrepreneur. Scoping products, pricing them, pitching them.',
    },
    {
      year: '2027',
      title: 'National final',
      detail: 'ICT Skills national finalist. Up next.',
      upcoming: true,
    },
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
