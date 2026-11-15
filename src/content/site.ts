export type NowItem = {
  label: string
  value: string
  clock?: string
  /** App path that turns the value into a link: '/competitions#zentralhack'. */
  to?: string
}

export type Fact = {
  label: string
  list: string[]
}

export const GITHUB_URL = 'https://github.com/platret'
export const LINKEDIN_URL = 'https://ch.linkedin.com/in/alex-platret-087b2b351'

// Image paths are relative to public/ and resolved in components with asset().

export const site = {
  name: 'Alex',
  nameLines: ['Alex'],
  role: 'Full-stack developer',
  employer: 'Apprentice at UBS',
  location: 'Zurich, CH',
  email: 'platret.alex@gmail.com',
  /** The toast after copying the email address. */
  copiedEmail: 'Email copied. Talk soon.',
  status: { label: 'Now building', value: 'Sponsuno', to: '/apps/sponsuno' },
  intro:
    'Frontend is where I spend most of my time. I build considered interfaces in React and TypeScript, and take projects from the first screen to the backend behind it. Apprentice at UBS in Zurich by day; on the side I am building a startup, shipping iOS apps and pitching hackathon prototypes.',
  portrait: { src: 'images/portrait.png', alt: 'Illustrated halftone portrait' },
  now: [
    { label: 'Location', value: 'Zurich, CH', clock: 'Europe/Zurich' },
    { label: 'Currently', value: 'Building Sponsuno at Youngpreneurs', to: '/apps/sponsuno' },
    { label: 'Day job', value: 'Apprentice at UBS' },
    { label: 'Latest', value: 'ZentralHack 2026, ROCHADE', to: '/competitions#zentralhack' },
    { label: 'Building', value: 'iOS apps & AI workflows' },
    { label: 'Next', value: 'ICT Skills national final, 2027', to: '/competitions#national-final' },
  ] as NowItem[],
  about: {
    heading: ['Frontend,', 'mostly.'],
    text: 'I care about how an interface feels, down to the easing curve and the empty state. I also dabble in full-stack: Java backends, native iOS apps, AI agent pipelines and automated workflows. I like building the whole application and figuring out how the pieces fit together.',
  },
  facts: [
    { label: 'Languages', list: ['TypeScript', 'Java', 'Swift'] },
    { label: 'Tools', list: ['React', 'Spring Boot', 'SwiftUI'] },
  ] as Fact[],
  links: [
    { label: 'GitHub', href: GITHUB_URL },
    { label: 'LinkedIn', href: LINKEDIN_URL },
  ],
}
