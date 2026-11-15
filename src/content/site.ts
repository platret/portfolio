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
  /** App path that turns the value into a link: '/competitions#zentralhack'. */
  to?: string
}

export type Screen = {
  label: string
  file: string
  caption: string
  alt: string
}

export type Feature = {
  id: string
  kicker: string
  title: string[]
  lede: string
  built: string
  choice: string
  status?: string
  href: string
  cta: string
  frame: 'phone' | 'browser'
  domain?: string
  note: string
  screens: Screen[]
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
  status: { label: 'Now building', value: 'Sponsuno', to: '/apps/sponsuno' },
  intro:
    'Frontend is where I spend most of my time. I build considered interfaces in React and TypeScript, and take projects from the first screen to the backend behind it. Apprentice at UBS in Zurich by day; on the side I am building a startup, shipping iOS apps and pitching hackathon prototypes.',
  projects: [
    {
      title: 'Sponsuno',
      icon: 'images/apps/sponsuno/icon.png',
      year: '2026',
      stack: 'Startup · React, Vite, Cloudflare',
      image: 'images/apps/sponsuno/01-home.jpg',
      description: 'Matching athletes and clubs in sport and culture with sponsors from their own region.',
      href: 'https://sponsuno.ch',
    },
    {
      title: 'ROCHADE',
      icon: 'images/apps/rochade/icon.png',
      year: '2026',
      stack: 'ZentralHack · Expo, Supabase',
      image: 'images/rochade/web.jpg',
      description: 'Built in 24 hours: temporary-flat planning for housing cooperatives that renovate.',
      href: 'https://roschade.alexplatret.com',
    },
    {
      title: 'Lernspur',
      icon: 'images/apps/lernspur/icon.png',
      year: '2026',
      stack: 'SwiftUI · Local learning journal',
      image: 'images/lernspur.png',
      description: 'A local learning journal for capturing progress and turning it into reports.',
      href: 'https://lernspur.alexplatret.com',
    },
    {
      title: 'What Was That?',
      icon: 'images/apps/what-was-that/icon.png',
      year: '2026',
      stack: 'SwiftUI · Recommendations & widgets',
      image: 'images/whatwasthat.svg',
      description: 'Keep recommendations and remember who shared them, with quick access through widgets.',
      href: 'https://whatwasthat.alexplatret.com',
    },
    {
      title: 'Is it raining on me?',
      icon: 'images/apps/is-it-raining-on-me/icon.png',
      year: '2026',
      stack: 'SwiftUI · Rain radar & widgets',
      image: 'images/isitraining.png',
      description: 'A focused answer to one question: will it rain here in the next 90 minutes?',
      href: 'https://isitraining.alexplatret.com',
    },
    { title: 'SentieroAlpino', year: '2026', stack: 'Hiking route API', image: 'images/preview-2.png', description: 'A hiking project that taught me to design the API before writing the implementation.', href: 'https://github.com/platret/sentiero-alpino' },
  ] as Project[],
  features: [
    {
      id: 'sponsuno',
      kicker: 'In focus / Sponsuno',
      title: ['Sponsoring', 'that fits.'],
      lede: 'Clubs and athletes in sport and culture spend weeks writing to companies that were never a match. Sponsuno is the startup I am building with a team of four in the Youngpreneurs programme: it pairs them with sponsors from their own region, starting in German-speaking Switzerland.',
      built: 'The whole public side: sponsuno.ch, a clickable product preview, the AI sponsoring-manager concept, SEO guide pages and the deploy pipeline on Cloudflare.',
      choice: 'Honest by design. The platform is not live yet, so every screen is labelled as a preview with example data and the waitlist is the only promise.',
      status: 'Pre-launch · Waitlist open',
      href: 'https://sponsuno.ch',
      cta: 'Visit sponsuno.ch',
      frame: 'browser',
      domain: 'sponsuno.ch',
      note: 'Live site, in German · Example data',
      screens: [
        { label: 'Landing', file: 'apps/sponsuno/01-home.jpg', caption: 'Two audiences, one match: clubs looking for support and local companies that want to give it.', alt: 'Sponsuno homepage: “Sponsoring, das zusammenpasst” with matched athlete and sponsor cards' },
        { label: 'Preview', file: 'apps/sponsuno/02-demo.jpg', caption: 'A clickable preview of the athlete dashboard, running on example data in the browser.', alt: 'Sponsuno preview dashboard greeting an example athlete with partnerships and upcoming dates' },
        { label: 'AI manager', file: 'apps/sponsuno/03-ki-manager.jpg', caption: 'The AI manager drafts requests and reminders. Nothing goes out before you approve it.', alt: 'Sponsuno AI manager page with a drafted sponsoring request' },
      ],
    },
    {
      id: 'lernspur',
      kicker: 'Also in focus / Lernspur',
      title: ['Small moments.', 'A visible learning path.'],
      lede: 'An apprenticeship is full of things worth remembering. Lernspur gives those small moments a home, from a quick note to a learning report.',
      built: 'A native SwiftUI app for capturing notes, revisiting learning and writing structured reports, with PDF export.',
      choice: 'Save first, organise later. The journal lives locally in SQLite, so capturing a thought does not depend on a server.',
      href: 'https://lernspur.alexplatret.com',
      cta: 'Explore Lernspur',
      frame: 'phone',
      note: 'Native app screenshot · Example content',
      screens: [
        { label: 'Capture', file: 'apps/lernspur/01-capture.png', caption: 'Save a thought, photo or voice memo. Organise it later.', alt: 'Lernspur capture screen with a note field, photo and voice memo controls' },
        { label: 'Practice', file: 'apps/lernspur/02-cards.png', caption: 'Turn what you learn into cards you can come back to.', alt: 'Lernspur practice screen showing a database JOIN question and its answer' },
        { label: 'Reports', file: 'apps/lernspur/03-report.png', caption: 'Reflect on the work, then export a structured learning report.', alt: 'Lernspur learning report with reflection sections and a PDF export button' },
      ],
    },
  ] as Feature[],
  portrait: { src: 'images/portrait.png', alt: 'Illustrated halftone portrait' },
  now: [
    { label: 'Location', value: 'Zurich, CH', clock: 'Europe/Zurich' },
    { label: 'Currently', value: 'Building Sponsuno at Youngpreneurs', to: '/apps/sponsuno' },
    { label: 'Day job', value: 'Apprentice at UBS' },
    { label: 'Latest', value: 'ZentralHack 2026, ROCHADE', to: '/competitions#zentralhack' },
    { label: 'Building', value: 'iOS apps & AI workflows' },
    { label: 'Next', value: 'ICT Skills national final, 2027', to: '/competitions#national-final' },
    { label: 'Off hours', value: 'Gym, gaming, DJ sets' },
  ] as NowItem[],
  about: {
    heading: ['Frontend,', 'mostly.'],
    text: 'I care about how an interface feels, down to the easing curve and the empty state. I also dabble in full-stack: Java backends, native iOS apps, AI agent pipelines and automated workflows. I like building the whole application and figuring out how the pieces fit together. Off hours I play records.',
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
