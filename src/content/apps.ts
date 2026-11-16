// Pure data: no imports from the bundler, the DOM or React.
// `npm run check` reads this file with Node and fails the build when an image is missing,
// a size is wrong or a tagline is too long. Run it after every edit.

/** The seven precise kinds. The index groups them into the five SHELVES below. */
export type AppKind = 'ios' | 'mac' | 'web' | 'game' | 'desktop' | 'tool' | 'extension'

/** How a screenshot is framed on the app page. */
export type ShotFrame = 'phone' | 'browser' | 'desktop' | 'none'

export type AppShot = {
  /** Path under public/, e.g. 'images/apps/afterdrop/01-menu.jpg'. */
  file: string
  /** Required. What is on the screen, in one sentence, for people who cannot see it. */
  alt: string
  frame: ShotFrame
  /** One sentence shown under the frame. Leave out for no caption. */
  caption?: string
  /** Pixel size. Needed only when it differs from the frame default
   *  (phone 900x1956, browser 1440x900, desktop 1600x1000) and always for frame 'none'. */
  width?: number
  height?: number
  /** Browser frame only: the address shown in the frame. Defaults to the address of liveUrl. */
  domain?: string
}

export type App = {
  /** URL segment: /apps/<slug>. Lowercase letters, digits, hyphens. Never change it once published. */
  slug: string
  name: string
  /** One sentence, 80 characters or fewer. Shown in the index row and under the name. */
  tagline: string
  /** Paragraphs separated by a blank line ('\n\n'). */
  description: string
  /** Four digits, as text: '2026'. */
  year: string
  kind: AppKind
  /** Shown joined with ' / ': ['iPhone (iOS 17+)', 'Web preview']. */
  platforms: string[]
  stack: string[]
  /** Free text, shown as written: 'Live', 'Preview, not yet on the App Store'. */
  status: string
  /** Three to five short lines. */
  highlights: string[]
  /** Public repository URL. Leave out when there is none or it is private. */
  repoUrl?: string
  /** Public URL of the running app, its site or its web preview. */
  liveUrl?: string
  /** A download, a release with a build in it, or a store page. Needs installLabel.
   *  A release that only holds the source is not an install: link the repository instead. */
  installUrl?: string
  /** The words shown in the Install row: 'Download DMG from GitHub Releases'. */
  installLabel?: string
  /** True when the code exists but is private. Shows 'Private repository' instead of a link. */
  isPrivateRepo: boolean
  /** Path under public/, e.g. 'images/apps/afterdrop/icon.png'. Leave out for the lettered plate. */
  icon?: string
  /** Any number, including none. Order is display order. */
  screenshots: AppShot[]

  /** One or two characters for the lettered plate. Defaults to the first character of name. */
  monogram?: string
  /** Position of the icon in the Apps row on the home page: 1 is first. Eight at most, no number twice. */
  featured?: number
  /** Id of an entry in competitions.ts when the app was built for one. */
  competition?: string
  /** Two short paragraphs under the description: what I built and one decision I stand by. */
  story?: { built: string; choice: string }
}

export const KIND_LABEL: Record<AppKind, string> = {
  ios: 'iPhone app',
  mac: 'Mac menu bar app',
  web: 'Web app',
  game: 'Browser game',
  desktop: 'Desktop app',
  tool: 'Developer tool',
  extension: 'Browser extension',
}

export type Shelf = { id: string; label: string; kinds: readonly AppKind[] }

/** The filter and the groups of the index. Order is display order. A shelf with no apps is not shown. */
export const SHELVES = [
  { id: 'iphone', label: 'iPhone', kinds: ['ios'] },
  { id: 'web', label: 'Web', kinds: ['web'] },
  { id: 'games', label: 'Games', kinds: ['game'] },
  { id: 'desktop', label: 'Desktop', kinds: ['mac', 'desktop'] },
  { id: 'tools', label: 'Tools', kinds: ['tool', 'extension'] },
] as const satisfies readonly Shelf[]

export type ShelfId = (typeof SHELVES)[number]['id']

/** Slugs of the apps shown large at the top of the Apps page, in this order. */
export const NOTABLE: readonly string[] = ['sponsuno', 'switchboard', 'lernspur']

/** Pixel size a screenshot is assumed to have when it declares none. */
export const SHOT_DEFAULT_SIZE: Record<ShotFrame, { width: number; height: number } | null> = {
  phone: { width: 900, height: 1956 },
  browser: { width: 1440, height: 900 },
  desktop: { width: 1600, height: 1000 },
  none: null,
}

/** Order inside a shelf is the order here. Move an entry to reorder the index. */
export const apps: App[] = [
  // iPhone

  {
    slug: 'lernspur',
    name: 'Lernspur',
    tagline: 'A local learning journal for apprentices, from quick note to report.',
    description:
      'An apprenticeship is full of small things worth remembering. Lernspur is a native iPhone app that gives them a home: save a note, photo or voice memo first, and sort it into modules and competences later. From those entries come weekly goals, reviews and learning reports structured after IPERKA, with PDF export.\n\nThe app is not on the App Store yet. The preview website shows the real screens with example content.',
    year: '2026',
    kind: 'ios',
    platforms: ['iPhone', 'Web preview'],
    stack: ['SwiftUI', 'SQLite', 'StoreKit 2', 'TypeScript', 'Vite'],
    status: 'Preview, not yet on the App Store',
    highlights: [
      'Capture a note, photo or voice memo and organise it later',
      'Weekly goals and reviews of what I learned',
      'Learning reports structured after IPERKA, exported as PDF',
      'Stored locally in SQLite: no account, no tracking, no cloud sync',
    ],
    repoUrl: 'https://github.com/platret/lernspur-preview',
    liveUrl: 'https://lernspur.alexplatret.com',
    isPrivateRepo: false,
    icon: 'images/apps/lernspur/icon.png',
    featured: 4,
    story: {
      built: 'A native SwiftUI app for capturing notes, revisiting learning and writing structured reports, with PDF export.',
      choice: 'Save first, organise later. The journal lives locally in SQLite, so capturing a thought does not depend on a server.',
    },
    screenshots: [
      {
        file: 'images/apps/lernspur/01-capture.png',
        alt: 'Lernspur capture screen with a note field, photo and voice memo controls',
        frame: 'phone',
        width: 1206,
        height: 2622,
        caption: 'Save a thought, photo or voice memo. Organise it later.',
      },
      {
        file: 'images/apps/lernspur/04-goals.jpg',
        alt: 'Lernspur weekly goals screen with one completed goal and a button to set another',
        frame: 'phone',
        caption: 'Weekly goals, one step after the other.',
      },
      {
        file: 'images/apps/lernspur/02-cards.png',
        alt: 'Lernspur practice screen showing a database JOIN question and its answer',
        frame: 'phone',
        width: 1206,
        height: 2622,
        caption: 'Practice cards, part of an optional Plus subscription that is not on sale yet.',
      },
    ],
  },
  {
    slug: 'what-was-that',
    name: 'What Was That?',
    tagline: 'An iPhone app for recommendations from friends, and who gave them.',
    description:
      'What Was That? is a native SwiftUI iPhone app for the things friends tell me I would love: films, food, games and places, each saved with the person and a short note. When nobody knows what to do, Pick for me draws a random idea I have not tried yet.\n\nEverything stays on the device, with collections that can be shared as a file and configurable Home Screen widgets. The app is not on the App Store. The source is public and builds with Xcode, and the website shows the screens.',
    year: '2026',
    kind: 'ios',
    platforms: ['iPhone (iOS 26+)', 'Web preview'],
    stack: ['Swift', 'SwiftUI', 'WidgetKit', 'App Intents', 'HTML/CSS/JS', 'Cloudflare', 'GitHub Pages'],
    status: 'Source release, not on the App Store',
    highlights: [
      'Saves each recommendation with the friend, a note and an optional link',
      'Pick for me chooses a random untried idea, optionally by category',
      'Small and medium Home Screen widgets with category, collection and colour',
      'Local JSON storage, no account, no network requests from the app',
    ],
    repoUrl: 'https://github.com/platret/what-was-that',
    liveUrl: 'https://whatwasthat.alexplatret.com',
    isPrivateRepo: false,
    icon: 'images/apps/what-was-that/icon.png',
    featured: 5,
    screenshots: [
      { file: 'images/apps/what-was-that/01-saved.jpg', alt: 'Saved recommendations list with category filters and the friend who suggested each one', frame: 'phone' },
      { file: 'images/apps/what-was-that/02-detail.jpg', alt: "Detail view of a film recommendation with the friend's note", frame: 'phone' },
      { file: 'images/apps/what-was-that/03-pick-for-me.jpg', alt: 'Pick for me screen that draws a random untried idea', frame: 'phone' },
      { file: 'images/apps/what-was-that/04-collections.jpg', alt: 'Collections screen with two example collections', frame: 'phone' },
    ],
  },
  {
    slug: 'is-it-raining-on-me',
    name: 'Is it raining on me?',
    tagline: 'One screen that answers whether it rains at your spot in the next 90 minutes.',
    description:
      'Is it raining on me? answers one question with a yes or a no for my exact position, plus a short timeline of the next 90 minutes. The native SwiftUI iPhone app reads the public precipitation radar of the Deutscher Wetterdienst, which covers Germany and parts of neighbouring countries including northern Switzerland, and shows no answer at all when the radar has no data.\n\nThere are Home Screen and Lock Screen widgets and a matching web preview. The iPhone app is not released yet. The web preview is live.',
    year: '2026',
    kind: 'ios',
    platforms: ['iPhone (iOS 17+)', 'Web preview'],
    stack: ['Swift', 'SwiftUI', 'WidgetKit', 'CoreLocation', 'DWD radar WMS', 'HTML/CSS/JS', 'Cloudflare', 'GitHub Pages'],
    status: 'Web preview live, iPhone app not released',
    highlights: [
      'Yes or no for the current GPS position, with a 90 minute radar timeline',
      'Radar data from the Deutscher Wetterdienst, no model forecast fallback',
      'Home Screen and Lock Screen widgets',
      'No account, ads, tracking SDKs, backend or API keys',
    ],
    repoUrl: 'https://github.com/platret/is-it-raining-on-me',
    liveUrl: 'https://isitraining.alexplatret.com',
    isPrivateRepo: false,
    icon: 'images/apps/is-it-raining-on-me/icon.png',
    featured: 6,
    screenshots: [
      { file: 'images/apps/is-it-raining-on-me/01-dry.jpg', alt: 'Dry state: a large No and the line Dry for the next 90 minutes', frame: 'phone' },
      { file: 'images/apps/is-it-raining-on-me/02-rain.jpg', alt: 'Rain state: a large Yes with a bar timeline showing rain easing in about 40 minutes', frame: 'phone' },
    ],
  },
  {
    slug: 'thek',
    name: 'Thek',
    tagline: 'Homework and reminders in one calm iPhone app.',
    description:
      'Thek is Swiss German for school bag. It is an iPhone dashboard for homework, tests and dates. Tasks come in through calendar links, pasted lists or a typed line such as "Mathe bis morgen 8:00", and local notifications bundle everything into a morning and an evening check-in.\n\nEverything stays on the phone, with no account and no server.',
    year: '2026',
    kind: 'ios',
    platforms: ['iPhone'],
    stack: ['Swift', 'SwiftUI', 'SwiftData', 'UserNotifications'],
    status: 'Prototype, runs in the simulator',
    highlights: [
      'A Today view with a seven-day strip and an Agenda view, day by day',
      'Import through .ics calendar links or pasted lists',
      'Understands typed dates in several languages',
      'Morning and evening check-ins as local notifications',
    ],
    isPrivateRepo: false,
    icon: 'images/apps/thek/icon.png',
    screenshots: [],
  },
  {
    slug: 'pocket-memory',
    name: 'Pocket Memory',
    tagline: 'A place to keep small things worth remembering, with a browser preview.',
    description:
      'Pocket Memory keeps the little things I mean to come back to: a recommended place, a passing thought, a screenshot, a link, a voice note or a location. I can edit a memory while the original capture stays intact, and find it again with a local word search.\n\nThe native app is built in SwiftUI and is not released. What is public is a browser preview that follows the same flows and stores everything in the browser, next to a recorded walkthrough of the native app in the iOS Simulator.',
    year: '2026',
    kind: 'ios',
    platforms: ['Web preview', 'iPhone (native app, not released)'],
    stack: ['SwiftUI (native app)', 'HTML/CSS/JS', 'IndexedDB', 'MediaRecorder', 'Geolocation API', 'GitHub Pages'],
    status: 'Preview',
    highlights: [
      'Captures text, photos, links, voice notes and locations',
      'Edits keep the original capture intact',
      'Local word search, no account, no backend',
      'Browser preview with a recorded native walkthrough',
    ],
    repoUrl: 'https://github.com/platret/pocket-memory-preview',
    liveUrl: 'https://platret.github.io/pocket-memory-preview/',
    isPrivateRepo: false,
    screenshots: [
      { file: 'images/apps/pocket-memory/01-onboarding.jpg', alt: 'Onboarding screen reading Keep the little things', frame: 'phone' },
      { file: 'images/apps/pocket-memory/02-memories.jpg', alt: 'Memories list with one sample memory about a matcha cafe', frame: 'phone' },
      { file: 'images/apps/pocket-memory/03-capture.jpg', alt: 'New memory sheet with options for photo, link, text, voice and location', frame: 'phone' },
      { file: 'images/apps/pocket-memory/04-search.jpg', alt: 'Local word search finding a memory titled River bookshop', frame: 'phone' },
      { file: 'images/apps/pocket-memory/05-web-preview.jpg', alt: 'Browser preview page with the Watch and review section and the native app video', frame: 'browser' },
    ],
  },

  // Web

  {
    slug: 'sponsuno',
    name: 'Sponsuno',
    tagline: 'Matching athletes and clubs with sponsors from their own region.',
    description:
      'Sponsuno is the startup I am building with a team of four in the Youngpreneurs Zurich programme. The planned platform pairs athletes, sport clubs and culture clubs with sponsors from their region, starting in German-speaking Switzerland.\n\nThe product itself is not live yet. What is public so far is the website and a clickable preview of the product.',
    year: '2026',
    kind: 'web',
    platforms: ['Web'],
    stack: ['React 19', 'TypeScript', 'Vite 8', 'CSS scroll-driven animations', 'Cloudflare Workers', 'Durable Objects', 'Playwright'],
    status: 'Pre-launch, live site and preview',
    highlights: [
      'Clickable product preview for athletes and sponsors, running on example data',
      'Matching on four criteria: region, type of support, industry and budget',
      'Pages prerendered at build time, no animation libraries',
      'Deployed to Cloudflare Workers on every push to main',
    ],
    repoUrl: 'https://github.com/platret/sponsuno',
    liveUrl: 'https://sponsuno.ch',
    isPrivateRepo: false,
    icon: 'images/apps/sponsuno/icon.png',
    featured: 2,
    story: {
      built: 'The whole public side: sponsuno.ch, a clickable product preview that runs on example data in the browser, the AI sponsoring-manager concept, topic and guide pages, and the deploy pipeline on Cloudflare.',
      choice: 'Honest by design. The platform is not live yet, so every preview screen is labelled as example data.',
    },
    screenshots: [
      {
        file: 'images/apps/sponsuno/01-home.jpg',
        alt: 'Sponsuno homepage: “Sponsoring, das zusammenpasst” with matched athlete and sponsor cards',
        frame: 'browser',
        caption: 'Two audiences, one match: clubs looking for support and local companies that want to give it.',
      },
      {
        file: 'images/apps/sponsuno/02-demo.jpg',
        alt: 'Sponsuno preview dashboard greeting an example athlete with partnerships and upcoming dates',
        frame: 'browser',
        caption: 'A clickable preview of the athlete dashboard, running on example data in the browser.',
      },
      {
        file: 'images/apps/sponsuno/04-matches.jpg',
        alt: 'Sponsuno preview: suggested sponsors for an example athlete, ranked by the four matching criteria',
        frame: 'browser',
        caption: 'Suggested sponsors, ranked by region, type of support, industry and budget.',
      },
      {
        file: 'images/apps/sponsuno/05-sponsor-cockpit.jpg',
        alt: 'Sponsuno preview: the sponsor cockpit with a new request, a running partnership and the yearly budget',
        frame: 'browser',
        caption: 'The same preview from the sponsor side: requests, partnerships and the budget for the year.',
      },
      {
        file: 'images/apps/sponsuno/03-ki-manager.jpg',
        alt: 'Sponsuno AI manager page with a drafted sponsoring request',
        frame: 'browser',
        caption: 'The AI manager drafts requests and reminders. Nothing goes out before you approve it.',
      },
    ],
  },
  {
    slug: 'rochade',
    name: 'ROCHADE',
    tagline: 'Temporary-flat planning for housing cooperatives that renovate.',
    description:
      'When a housing cooperative renovates a building, residents move into temporary flats for months. ROCHADE works out who moves where and when, rebuilds the plan when a construction phase shifts, and says exactly what is missing when no plan fits.\n\nI built it with Francesco Rocca in 24 hours at ZentralHack 2026: an allocation solver, an iPhone app for residents and a website for the cooperative, all on one Supabase database. Residents sign in with an access code from a letter and see their move update live.',
    year: '2026',
    kind: 'web',
    platforms: ['iOS', 'Web'],
    stack: ['Expo', 'React Native', 'React 19', 'TypeScript', 'Supabase Realtime', 'Vite 8', 'Tailwind CSS 4'],
    status: 'Hackathon prototype',
    highlights: [
      'Built in 24 hours at ZentralHack 2026, EntrepreneurSkills Challenge, SDG 11',
      'Backtracking solver in pure TypeScript that gives a reason for every conflict',
      "Live sync: shift a phase on the web, the resident's phone updates about two seconds later",
      'Access codes instead of accounts, with an offline cache in the app',
    ],
    repoUrl: 'https://github.com/platret/ROCHADE',
    liveUrl: 'https://roschade.alexplatret.com',
    isPrivateRepo: false,
    icon: 'images/apps/rochade/icon.png',
    featured: 3,
    competition: 'zentralhack',
    screenshots: [
      { file: 'images/rochade/web.jpg', alt: 'ROCHADE website: “Sanieren, ohne jemanden rauszuwerfen” above a live plan of three houses', frame: 'browser' },
      { file: 'images/rochade/mein-umzug.jpg', alt: 'ROCHADE iPhone app: a resident’s move with status, dates and checklist', frame: 'phone', width: 603, height: 1311 },
      { file: 'images/rochade/siedlung.jpg', alt: 'ROCHADE iPhone app: the estate view with the renovation phases as a timeline', frame: 'phone', width: 603, height: 1311 },
      { file: 'images/apps/rochade/04-planner.jpg', alt: 'ROCHADE browser prototype: “Rochade planen” with three steps and the key figures of a fictional estate', frame: 'browser' },
    ],
  },
  {
    slug: 'github-unwrapped-2025',
    name: 'GitHub Unwrapped 2025',
    tagline: 'A Wrapped-style year in review for any public GitHub profile.',
    description:
      "Paste a GitHub profile link, pick a year, and the app plays that developer's year back as eleven full-screen animated slides: contributions, streak, top repository, languages, busiest month and a developer archetype. Everything is fetched live from public APIs in the browser, so there is no backend and nothing is stored. Stats that GitHub does not expose publicly are left out instead of being made up.\n\nI recreated it as a React app from a Claude Design handoff, then rewired it to work from real profile data.",
    year: '2026',
    kind: 'web',
    platforms: ['Web'],
    stack: ['React 18', 'TypeScript', 'Vite', 'CSS', 'GitHub REST API'],
    status: 'Live',
    highlights: [
      'Eleven story slides with autoplay and keyboard controls',
      'Live data from public APIs, no backend and no token',
      'Developer archetype derived from the real metrics',
      'Three colour palettes in a Tweaks panel',
    ],
    repoUrl: 'https://github.com/platret/github-unwrapped-2025',
    liveUrl: 'https://github-unwrapped-2025.vercel.app',
    isPrivateRepo: false,
    screenshots: [
      { file: 'images/apps/github-unwrapped-2025/01-home.jpg', alt: 'GitHub Unwrapped home screen: Your year in commits, with a profile input, year chips for 2025, 2024 and 2023 and example profiles', frame: 'browser' },
      {
        file: 'images/apps/github-unwrapped-2025/02-contributions.jpg',
        alt: 'Total contributions slide for an example profile on a green background showing 2,694 contributions on GitHub',
        frame: 'browser',
        caption: 'The slides show one of the public example profiles built into the app, not my own year.',
      },
      { file: 'images/apps/github-unwrapped-2025/03-streak.jpg', alt: 'Streak slide for an example profile with a contribution grid, an 82 day longest streak and 289 active days', frame: 'browser' },
      { file: 'images/apps/github-unwrapped-2025/04-busiest-month.jpg', alt: 'Most active month slide for an example profile: September highlighted in a bar chart of the twelve months', frame: 'browser' },
      { file: 'images/apps/github-unwrapped-2025/05-archetype.jpg', alt: 'Developer archetype slide for an example profile on green: The Marathoner, with tags for top language, busiest weekday and streak', frame: 'browser' },
    ],
  },
  {
    slug: 'quarkdive',
    name: 'Quarkdive',
    tagline: 'A scroll-driven zoom from a human down to a single quark.',
    description:
      'Quarkdive is a reverse cosmic zoom. You scroll down and fall inward: from a person through skin, cells, DNA, a water molecule, an atom, its nucleus and a proton, until you reach a quark. It is one continuous zoom with no page jumps, and a readout tracks the scale from one metre down to below 10^-18 m.\n\nI built it with plain HTML, CSS and JavaScript, hand-drawn inline SVG scenes and one canvas for the particle field.',
    year: '2026',
    kind: 'web',
    platforms: ['Web'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Inline SVG', 'Canvas'],
    status: 'Live',
    highlights: [
      'Nine levels, from 1 m down to under 10^-18 m',
      'One continuous scroll-driven zoom, no page jumps',
      'Zero dependencies: vanilla HTML, CSS and JS',
      'Hand-drawn inline SVG scenes',
    ],
    repoUrl: 'https://github.com/platret/quarkdive',
    liveUrl: 'https://quarkdive.vercel.app',
    isPrivateRepo: false,
    screenshots: [
      { file: 'images/apps/quarkdive/01-human.jpg', alt: 'Quarkdive start screen: a stylised human figure at 1.7 m with the caption You. and a hint to scroll inward', frame: 'browser' },
      { file: 'images/apps/quarkdive/02-cells.jpg', alt: 'Quarkdive at 30 micrometres: a cluster of pink cells with dark nuclei', frame: 'browser' },
      { file: 'images/apps/quarkdive/03-dna.jpg', alt: 'Quarkdive at 10 nanometres: a blue and orange DNA double helix with coloured base pairs', frame: 'browser' },
      { file: 'images/apps/quarkdive/04-atom.jpg', alt: 'Quarkdive at 100 picometres: an atom with a glowing core and three electron orbits', frame: 'browser' },
      { file: 'images/apps/quarkdive/05-proton.jpg', alt: 'Quarkdive at 1 femtometre: a proton drawn as two up quarks and one down quark joined by gluons', frame: 'browser' },
    ],
  },
  {
    slug: 'roastspotify',
    name: 'RoastSpotify',
    tagline: 'Paste your top artists and get a funny verdict on your music taste.',
    description:
      'RoastSpotify is a small web toy: I paste a list of top artists and it answers with a taste score out of 100, a one-line jab for each artist and a listener archetype. The verdict comes from a deterministic engine that hashes the input, so the same artists always produce the same roast and a shared link shows exactly what its preview image promises.\n\nThere is no login and no connection to Spotify. The project is not affiliated with Spotify.',
    year: '2026',
    kind: 'web',
    platforms: ['Web'],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Motion', 'html-to-image', 'next/og', 'Vercel'],
    status: 'Live',
    highlights: [
      'Taste score from 0 to 100 with a jab per artist and a listener archetype',
      'Roast bank of 211 artists in 15 genre clusters',
      'Seeded, deterministic engine: the same input always gives the same verdict',
      'Every result has its own link, a dynamic Open Graph image and a downloadable 1080 x 1350 card',
    ],
    repoUrl: 'https://github.com/platret/RoastSpotify',
    liveUrl: 'https://roast-spotify-eta.vercel.app',
    isPrivateRepo: false,
    icon: 'images/apps/roastspotify/icon.png',
    screenshots: [
      { file: 'images/apps/roastspotify/01-home.jpg', alt: 'RoastSpotify start page with the artist input and preset buttons', frame: 'browser' },
      { file: 'images/apps/roastspotify/02-verdict.jpg', alt: 'Verdict with a taste score of 62 out of 100 and the first artist jabs', frame: 'browser' },
      { file: 'images/apps/roastspotify/04-archetype-share.jpg', alt: 'Listener archetype card with share, download and copy buttons', frame: 'browser' },
    ],
  },
  {
    slug: 'lift-or-skip',
    name: 'Lift or Skip',
    tagline: 'A gym excuse generator that rolls a scenario and rules lift or skip.',
    description:
      'Lift or Skip is a small web toy for the days when I look for a reason not to train. It rolls a seven-part scenario, from weather and sleep to soreness and the pull of the couch, and returns a verdict with a one-liner and an Excuse-o-meter.\n\nThe scenario is random but the ruling is not: the default is LIFT, and SKIP only fires for a genuine emergency, a real injury or actual danger outside. Every roll is seeded, so its link reproduces the same dilemma.',
    year: '2026',
    kind: 'web',
    platforms: ['Web'],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'next/og', 'Vercel'],
    status: 'Live',
    highlights: [
      'Seven factors per roll: weather, sleep, body, mindset, life, clock, temptation',
      'Rule-based verdict: LIFT by default, SKIP only for emergencies, real injuries or danger',
      'Excuse-o-meter that sums an excuse weight for each factor',
      'Seeded rolls with a shareable link, pure client logic with no backend',
    ],
    repoUrl: 'https://github.com/platret/lift-or-skip',
    liveUrl: 'https://lift-or-skip.vercel.app',
    isPrivateRepo: false,
    icon: 'images/apps/lift-or-skip/icon.png',
    screenshots: [
      { file: 'images/apps/lift-or-skip/01-home.jpg', alt: 'Lift or Skip start page with the empty intake report', frame: 'browser' },
      { file: 'images/apps/lift-or-skip/02-lift-verdict.jpg', alt: 'A rolled scenario with a LIFT verdict and the Excuse-o-meter', frame: 'browser' },
      { file: 'images/apps/lift-or-skip/03-skip-verdict.jpg', alt: 'A rolled scenario with a SKIP verdict because of a real injury', frame: 'browser' },
    ],
  },
  {
    slug: 'cookedchecker',
    name: 'CookedChecker',
    tagline: 'A doom meter that rates how ready you are for an exam.',
    description:
      'A small joke calculator for exam season, titled How Cooked Am I? on the page. I enter the days left, the pages still to study and my current vibes, and it returns a doom percentage with a verdict to match. The page heats up with the score, from icy cyan to molten red, with ember particles rising once things get bad.\n\nThe maths is a small deterministic function, and there is no backend or tracking.',
    year: '2026',
    kind: 'web',
    platforms: ['Web'],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Canvas', 'SVG'],
    status: 'Live',
    highlights: [
      'Three inputs: days left, pages to study, current vibes',
      'Seven verdicts, from Stone cold to Beyond cooked',
      'Colour shifts from cyan to red as the score climbs',
      'Quick scenario presets and a copy-to-clipboard verdict',
    ],
    repoUrl: 'https://github.com/platret/CookedChecker',
    liveUrl: 'https://cookedchecker.vercel.app',
    isPrivateRepo: false,
    screenshots: [
      {
        file: 'images/apps/cookedchecker/01-well-done.jpg',
        alt: 'How Cooked Am I? with 5 days and 80 pages left: a yellow gauge at 65% cooked and the verdict Well done. Praying to the curve.',
        frame: 'browser',
        width: 1440,
        height: 1170,
      },
      {
        file: 'images/apps/cookedchecker/02-stone-cold.jpg',
        alt: "The actually prepared preset: 21 days, 60 pages, a cyan gauge at 11% and the verdict Stone cold. You're the curve.",
        frame: 'browser',
        width: 1440,
        height: 1170,
      },
      {
        file: 'images/apps/cookedchecker/03-beyond-cooked.jpg',
        alt: 'The night before preset: 1 day, 140 pages, a red gauge at 100% and the verdict Beyond cooked. Geologically cooked.',
        frame: 'browser',
        width: 1440,
        height: 1170,
      },
    ],
  },
  {
    slug: 'quotecard',
    name: 'QuoteCard',
    tagline: 'Type a quote, pick a style and export it as a clean image.',
    description:
      'QuoteCard is a small browser tool for turning a quote into a shareable image. I type the text and an author, choose one of eight styles and one of four formats, and export a PNG at full resolution.\n\nThe card is rendered at its real output size and only scaled down for the preview, and everything happens in the browser, so nothing is uploaded and there is no account.',
    year: '2026',
    kind: 'web',
    platforms: ['Web'],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'html-to-image', 'Vercel'],
    status: 'Live',
    highlights: [
      'Live editor with quote, author, alignment, text size and optional quotation mark',
      'Eight styles: Midnight, Paper, Sunset, Mono, Forest, Mint, Noir, Blush',
      'Four formats from 1080 x 1080 square to 1080 x 1920 story and 1600 x 900 landscape',
      'PNG export generated client-side, nothing leaves the device',
    ],
    repoUrl: 'https://github.com/platret/QuoteCard',
    liveUrl: 'https://quotecard-lovat.vercel.app',
    isPrivateRepo: false,
    screenshots: [
      { file: 'images/apps/quotecard/01-editor-midnight-square.jpg', alt: 'QuoteCard editor with the Midnight style in square format', frame: 'browser' },
      { file: 'images/apps/quotecard/02-sunset-portrait.jpg', alt: 'Centred quote on the Sunset gradient in portrait format', frame: 'browser' },
      { file: 'images/apps/quotecard/03-paper-landscape.jpg', alt: 'Italic serif quote on the Paper style in landscape format', frame: 'browser' },
      { file: 'images/apps/quotecard/04-noir-story.jpg', alt: 'Noir style in the tall story format', frame: 'browser' },
    ],
  },
  {
    slug: 'polymarket-clone',
    name: 'Polymarket Clone',
    tagline: 'A practice prediction market for sports, played with fake money.',
    description:
      "Polymarket Clone is a practice project: a prediction market for sports games, played with $10,000 of fake money. You buy YES or NO shares priced in cents, and an LMSR market maker moves the price with every trade. Game schedules, scores and opening odds come from ESPN's public scoreboard feed, with a bundled sample slate when the feed is not reachable.\n\nI built it for fun and to learn. No real money is involved, and the project is not affiliated with Polymarket.",
    year: '2026',
    kind: 'web',
    platforms: ['Web'],
    stack: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'Recharts', 'React Router'],
    status: 'Practice project, runs locally',
    highlights: [
      'LMSR market maker: every trade moves the price',
      '16 simulated bot traders and a leaderboard',
      'Admin page to force results and test payouts',
      'No backend: state persists in localStorage',
    ],
    repoUrl: 'https://github.com/platret/polymarket-clone',
    isPrivateRepo: false,
    icon: 'images/apps/polymarket-clone/icon.png',
    screenshots: [
      { file: 'images/apps/polymarket-clone/03-portfolio.jpg', alt: 'Portfolio page with cash, open positions, profit and loss and trade history', frame: 'browser' },
      { file: 'images/apps/polymarket-clone/02-market-detail.jpg', alt: 'Single market page with price history chart, trade panel and an open position', frame: 'browser' },
      { file: 'images/apps/polymarket-clone/04-leaderboard.jpg', alt: 'Leaderboard ranking the player against simulated bot traders by net worth', frame: 'browser' },
      { file: 'images/apps/polymarket-clone/05-admin.jpg', alt: 'Admin page with simulation settings, league selection and buttons to resolve markets', frame: 'browser' },
    ],
  },
  {
    slug: 'sentiero-alpino',
    name: 'SentieroAlpino',
    tagline: 'A hiking frontend for a course REST API, built without a framework.',
    description:
      'A frontend for a hiking REST API that came with a course assignment, written in plain HTML, CSS and JavaScript with Bootstrap for layout. Guests can browse, search and filter hikes in the Swiss National Park, readers can comment, and admins can create, edit and delete hikes.\n\nThe API only validates the primary key, so every business rule lives in the frontend, for example the check that a hike works out to a walking speed between 2 and 4 km/h. The course backend is no longer reachable, so the screenshots show the app as it ran in May 2026.',
    year: '2026',
    kind: 'web',
    platforms: ['Web'],
    stack: ['HTML', 'CSS', 'JavaScript (ES modules)', 'Bootstrap 5.3', 'REST API with HTTP Basic Auth', 'GitHub Pages'],
    status: 'School project, backend offline',
    highlights: [
      'Three roles: guest, reader and admin',
      'Search, filters and sorting synced to the URL',
      'German, Italian and French UI with dark mode',
      '30 black-box test cases documented in a test protocol',
    ],
    repoUrl: 'https://github.com/platret/sentiero-alpino',
    isPrivateRepo: false,
    icon: 'images/apps/sentiero-alpino/icon.png',
    screenshots: [
      {
        file: 'images/apps/sentiero-alpino/02-detail.jpg',
        alt: 'Hike detail page in light mode with elevation profile, key figures and comments',
        frame: 'browser',
        width: 1600,
        height: 1735,
      },
      {
        file: 'images/apps/sentiero-alpino/03-hike-form.jpg',
        alt: 'Form for creating a new hike with validation hints',
        frame: 'browser',
        width: 1600,
        height: 952,
      },
    ],
  },

  // Games

  {
    slug: 'afterdrop',
    name: 'Afterdrop',
    tagline: 'A falling-block arcade with four solo modes and a synth soundtrack.',
    description:
      'Afterdrop is a falling-block game for the browser with four solo modes: Marathon, Sprint, Ultra and Zen. I draw the blocks as beveled tiles on a 2D canvas and generate the ambient soundtrack and the sound effects with Web Audio, so the game ships without audio files or runtime dependencies.\n\nSettings and personal records stay in local storage on the device. There are no accounts and no ads.',
    year: '2026',
    kind: 'game',
    platforms: ['Web'],
    stack: ['TypeScript', 'Vite', 'Canvas 2D', 'CSS', 'Web Audio', 'Playwright', 'GitHub Actions'],
    status: 'Live',
    highlights: [
      'Four modes: Marathon, Sprint (40 lines), Ultra (2 minutes) and Zen',
      'Seven-piece bags, hold, three previews and a 500 ms lock delay',
      'Three block palettes and a procedural Web Audio soundtrack',
      'Keyboard controls plus on-screen touch buttons',
    ],
    repoUrl: 'https://github.com/platret/afterdrop',
    liveUrl: 'https://platret.github.io/afterdrop/',
    isPrivateRepo: false,
    icon: 'images/apps/afterdrop/icon.png',
    featured: 8,
    screenshots: [
      { file: 'images/apps/afterdrop/01-menu.jpg', alt: 'Afterdrop start screen with the headline Find your flow, an isometric block sculpture and the four game modes', frame: 'browser' },
      { file: 'images/apps/afterdrop/03-zen-neon-palette.jpg', alt: 'Zen mode with the Neon nights block palette', frame: 'browser' },
      { file: 'images/apps/afterdrop/04-customize.jpg', alt: 'Customize dialog with block palette, 3D blocks, landing ghost, ambient motion and volume sliders', frame: 'browser' },
      { file: 'images/apps/afterdrop/05-mobile.jpg', alt: 'Afterdrop on a phone-sized screen with the board, statistics and touch controls', frame: 'phone', width: 780, height: 1688 },
    ],
  },
  {
    slug: 'caldera-minesweeper',
    name: 'Caldera Minesweeper',
    tagline: 'A tactile, themeable Minesweeper for the web with no build step.',
    description:
      'Caldera is a Minesweeper for the browser, written in plain HTML, CSS and ES modules with no build step and no dependencies. The first click is always safe, and an optional no-guess mode only generates boards that can be solved by logic alone.\n\nAround the classic game I added a daily challenge, undo, a hint solver, speedrun metrics such as 3BV and an optional online leaderboard. It works offline as an installable PWA and can be played entirely from the keyboard.',
    year: '2026',
    kind: 'game',
    platforms: ['Web', 'PWA'],
    stack: ['HTML', 'CSS', 'JavaScript (ES modules)', 'Web Audio', 'Service Worker', 'Supabase', 'Vercel'],
    status: 'Live',
    highlights: [
      'Safe first click and optional no-guess boards',
      'Daily challenge, hint solver, undo and move-by-move replay',
      'Light, dark, Slate and Classic palettes plus a high-contrast number set',
      'Offline PWA with full keyboard play and screen-reader labels',
    ],
    repoUrl: 'https://github.com/platret/caldera-minesweeper',
    liveUrl: 'https://caldera-minesweeper.vercel.app',
    isPrivateRepo: false,
    icon: 'images/apps/caldera-minesweeper/icon.png',
    screenshots: [
      { file: 'images/apps/caldera-minesweeper/05-mobile.jpg', alt: 'Caldera on a phone-sized screen with a Beginner board, flags and the toolbar', frame: 'phone', width: 860, height: 1800 },
      { file: 'images/apps/caldera-minesweeper/04-settings.jpg', alt: 'Settings dialog with theme palette, chording, safe first click, no-guess boards, sound and high contrast', frame: 'browser' },
    ],
  },
  {
    slug: 'chipstack',
    name: 'ChipStack',
    tagline: 'A neon browser arcade: a block stacker plus a casino that only uses play chips.',
    description:
      'ChipStack is a client-side browser arcade built around a block-stacking engine and a casino that only uses free play chips. The stacker runs on a fixed 60 Hz timestep with SRS wall kicks, a 7-bag randomizer, T-spins and adjustable DAS, ARR and soft-drop speed, drawn on a 2D canvas.\n\nAround it sit slot machines, blackjack, European roulette and Jacks-or-Better video poker that share one wallet. There is no real money, no accounts and no backend.',
    year: '2026',
    kind: 'game',
    platforms: ['Web'],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'Zustand', 'Radix UI', 'Framer Motion', 'GSAP', 'Canvas 2D', 'Web Audio'],
    status: 'Live',
    highlights: [
      'Stacker with SRS, 7-bag, T-spins and tunable DAS, ARR and SDF',
      'Slots, blackjack, roulette and video poker on one shared wallet',
      'Rebindable keys and four neon themes',
      'Play chips only, state kept in localStorage',
    ],
    repoUrl: 'https://github.com/platret/chipstack',
    liveUrl: 'https://platret.github.io/chipstack/',
    isPrivateRepo: false,
    icon: 'images/apps/chipstack/icon.png',
    screenshots: [
      { file: 'images/apps/chipstack/03-slots.jpg', alt: 'Neon Reels, a five-reel slot machine with paytable and line bet controls', frame: 'browser' },
      { file: 'images/apps/chipstack/04-roulette.jpg', alt: 'European roulette with chips placed on the betting board and the list of active bets', frame: 'browser' },
      { file: 'images/apps/chipstack/05-blackjack.jpg', alt: 'Blackjack hand in progress with hit, stand, double and split actions', frame: 'browser' },
    ],
  },
  {
    slug: 'webvalo',
    name: 'WebValo',
    tagline: 'A Valorant-inspired tactical shooter that runs entirely in the browser.',
    description:
      'WebValo is a fan-made tribute to Valorant that opens like any web page. You pick one of five agents, each with three abilities and an ultimate, drop into the map FORGE and fight respawning bots while earning credits for the armory.\n\nI built it without a build step: plain ES modules, Three.js from a CDN and every sound synthesized with the Web Audio API. It is a non-commercial learning project and not affiliated with Riot Games.',
    year: '2026',
    kind: 'game',
    platforms: ['Web'],
    stack: ['JavaScript (ES modules)', 'Three.js r160', 'Web Audio API', 'HTML', 'CSS', 'Vercel'],
    status: 'Live',
    highlights: [
      'Five agents, each with a full C / Q / E / X ability kit',
      'Nine weapons with headshot multipliers and a credit economy',
      'Bots with line-of-sight checks that walls and smokes block',
      'No bundler and no node_modules: Three.js r160 through an import map',
    ],
    repoUrl: 'https://github.com/platret/WebValo',
    liveUrl: 'https://webvalo.vercel.app',
    isPrivateRepo: false,
    icon: 'images/apps/webvalo/icon.png',
    screenshots: [
      { file: 'images/apps/webvalo/01-landing.jpg', alt: 'WebValo landing screen with the title, a Play button and the key bindings', frame: 'browser' },
      { file: 'images/apps/webvalo/02-agent-select.jpg', alt: 'Agent select with five agent cards, Jett selected and her four abilities listed', frame: 'browser' },
      { file: 'images/apps/webvalo/03-gameplay.jpg', alt: 'First-person view on the map FORGE: a skeleton bot up close, the pistol viewmodel, health, abilities and ammo in the HUD', frame: 'browser' },
      { file: 'images/apps/webvalo/04-armory.jpg', alt: 'The armory buy menu over the running match, nine weapons with price, damage and fire rate', frame: 'browser' },
    ],
  },

  // Desktop

  {
    slug: 'killer-sudoku',
    name: 'KillerSudoku',
    tagline: 'A keyboard-first Killer Sudoku desktop game with solver-verified puzzles.',
    description:
      'KillerSudoku is a local-first desktop game for the cage-and-sum variant of Sudoku. I built it in Electron, React and SQLite for the ICT Skills Battle 2026, where it took first place.\n\nA backtracking solver checks that every puzzle has exactly one solution before it is saved, whether it comes from the generator or from the built-in designer. Accounts, highscores, streaks and half-finished games all live in one SQLite file on the machine.',
    year: '2026',
    kind: 'desktop',
    platforms: ['Windows', 'macOS (from source)'],
    stack: ['Electron 33', 'React 18', 'TypeScript', 'Tailwind CSS', 'SQLite (better-sqlite3)', 'Zustand', 'Motion', 'paper-shaders', 'cmdk', 'Vitest'],
    status: 'Competition build, source on GitHub',
    highlights: [
      'First place at the ICT Skills Battle 2026',
      'Backtracking solver with MRV rejects any puzzle that is not uniquely solvable',
      'Command palette, full keyboard control, notes, hints, undo and redo',
      'Puzzle designer, random generator and a daily challenge',
    ],
    repoUrl: 'https://github.com/platret/killer-sudoku',
    isPrivateRepo: false,
    icon: 'images/apps/killer-sudoku/icon.png',
    featured: 7,
    competition: 'ict-skills-battle',
    screenshots: [
      { file: 'images/apps/killer-sudoku/01-start.jpg', alt: 'KillerSudoku start screen with the wordmark, Start playing and four cards explaining the rules', frame: 'desktop' },
      { file: 'images/apps/killer-sudoku/03-solve.jpg', alt: "Solving an easy puzzle: the 9 by 9 grid with dashed cages and sums, number pad, and the selected cage's target, filled and needed values", frame: 'desktop' },
      { file: 'images/apps/killer-sudoku/02-puzzles.jpg', alt: 'Puzzle list with streak counters, the daily challenge and seeded puzzles in three difficulties', frame: 'desktop' },
      { file: 'images/apps/killer-sudoku/04-command-palette.jpg', alt: 'Command palette open over the board with commands for puzzles, highscores, stats, settings and sound', frame: 'desktop' },
      { file: 'images/apps/killer-sudoku/05-designer.jpg', alt: 'Puzzle designer with a colour-coded cage layout, name and difficulty fields and a running sum of 405', frame: 'desktop' },
    ],
  },
  {
    slug: 'smartii-mac',
    name: 'Smartii for Mac',
    tagline: 'A native macOS menu bar assistant that answers from a screenshot of your screen.',
    description:
      'Smartii for Mac is the desktop sibling of my Smartii browser extension, written in Swift with AppKit. A global hotkey captures the main display with ScreenCaptureKit, sends it to the AI provider I chose, and shows the answer in a floating panel that is also copied to the clipboard.\n\nIt lives in the menu bar without a Dock icon, keeps API keys in the macOS Keychain and uses only system frameworks. The release build is unsigned, so macOS asks for confirmation on first launch. The screenshot shows the product page, not the running app.',
    year: '2026',
    kind: 'mac',
    platforms: ['macOS 14+'],
    stack: ['Swift', 'AppKit', 'ScreenCaptureKit', 'Carbon hotkeys', 'Keychain', 'Swift Package Manager', 'GitHub Actions'],
    status: 'Open source, v1.0.7 (unsigned build)',
    highlights: [
      'Menu bar only, no Dock icon',
      'Four global hotkeys: summon, solve the screen, read the whole screen, hide the panel',
      'Seven AI providers with your own key, stored in the Keychain',
      'No third-party dependencies, only system frameworks',
      'Updates itself from GitHub Releases',
    ],
    repoUrl: 'https://github.com/platret/Smartii-Mac',
    liveUrl: 'https://platret.github.io/Smartii-Mac/',
    installUrl: 'https://github.com/platret/Smartii-Mac/releases/latest',
    installLabel: 'Download DMG from GitHub Releases',
    isPrivateRepo: false,
    icon: 'images/apps/smartii-mac/icon.png',
    screenshots: [
      { file: 'images/apps/smartii-mac/03-website-hotkeys.jpg', alt: 'Smartii for Mac product page: the four global hotkeys', frame: 'browser' },
    ],
  },

  // Tools

  {
    slug: 'switchboard',
    name: 'Switchboard',
    tagline: 'One place to run, watch and approve Claude agents, on Mac and iPhone.',
    description:
      'Switchboard is my control centre for Claude agents. A small host runs on my Mac with my own Claude Code login, and I give it project folders and agents with names and roles. Every command, edit and web request an agent wants to make waits for my answer, on the Mac or on the phone, and the first answer wins.\n\nI built the host, the web app and native apps for Mac and iPhone that all stay in sync. The screenshots show demo projects and demo agents.',
    year: '2026',
    kind: 'tool',
    platforms: ['macOS', 'iPhone', 'Web'],
    stack: ['TypeScript', 'Node', 'Claude Agent SDK', 'SQLite', 'WebSocket', 'React', 'Tailwind', 'SwiftUI'],
    status: 'Source on GitHub, v2.0.0',
    highlights: [
      'Approval gate: nothing runs, edits or goes online until I allow that exact action',
      'One board for every agent across all projects, with live status',
      'Web app, Mac app with a menu bar item and an iPhone app on one host',
      'Local first: binds to localhost and my Tailscale address only, token on every request',
    ],
    repoUrl: 'https://github.com/platret/switchboard',
    installUrl: 'https://github.com/platret/switchboard/releases/tag/v2.0.0',
    installLabel: 'Mac app from GitHub Releases',
    isPrivateRepo: false,
    icon: 'images/apps/switchboard/icon.png',
    featured: 1,
    screenshots: [
      {
        file: 'images/apps/switchboard/01-web-approval.jpg',
        alt: 'Switchboard web app: an agent named Maya waits for approval to change one line, with Deny and Allow buttons and a countdown',
        frame: 'desktop',
        width: 1600,
        height: 1077,
      },
      { file: 'images/apps/switchboard/02-web-overview-dark.jpg', alt: 'The board with nine agents in three projects, three of them working', frame: 'desktop', width: 1600, height: 1384 },
      { file: 'images/apps/switchboard/03-web-chat.jpg', alt: 'A finished chat with tool steps, markdown and two code blocks', frame: 'desktop', width: 1600, height: 1301 },
      { file: 'images/apps/switchboard/04-web-palette.jpg', alt: 'The command palette open over the board, listing agents with role and project', frame: 'desktop', width: 1600, height: 1046 },
      { file: 'images/apps/switchboard/05-web-light.jpg', alt: 'Light theme: an agent mid answer with the live activity line and a queued message', frame: 'desktop', width: 1600, height: 1150 },
      { file: 'images/apps/switchboard/06-ios-home.jpg', alt: 'Native iPhone app: home of a project with five agents and their status lamps', frame: 'phone', width: 782, height: 1700 },
      { file: 'images/apps/switchboard/07-ios-chat.jpg', alt: 'Native iPhone app: a chat with a tool step, markdown and code blocks', frame: 'phone', width: 782, height: 1700 },
      { file: 'images/apps/switchboard/08-ios-approvals.jpg', alt: 'Native iPhone app: the approvals tray asking to allow an edit', frame: 'phone', width: 782, height: 1700 },
    ],
  },
  {
    slug: 'deadline-forge',
    name: 'Deadline Forge',
    tagline: 'Timed, seeded practice briefs for ICTskills Skill 09, running locally.',
    description:
      'Deadline Forge is an unofficial practice tool I built for ICTskills Skill 09. It generates a seeded, reproducible brief with fixtures and executable checks, runs a clock in exam or practice mode, and keeps sessions, checklists and reflections in SQLite.\n\nIt runs locally on Node with a React frontend, needs no account or AI API, and does not grade code automatically: the score is self-assessed against the criteria.',
    year: '2026',
    kind: 'tool',
    platforms: ['Local web app', 'Node.js 24+'],
    stack: ['React 19', 'TypeScript', 'Vite', 'Node.js', 'SQLite (node:sqlite)', 'Vitest', 'JSZip'],
    status: 'Local app, v1.1.0',
    highlights: [
      'Six focuses and four difficulty tiers, from Foundation to a 420-minute Nationals lab',
      'The same seed and settings reproduce the same brief',
      'Downloadable kits with fixtures and tests that need only Node.js',
      '136 automated tests, run in CI on Node.js 24 and 25',
    ],
    repoUrl: 'https://github.com/platret/deadline-forge',
    installUrl: 'https://github.com/platret/deadline-forge/releases/latest',
    installLabel: 'Release zip on GitHub, runs on Node.js 24',
    isPrivateRepo: false,
    icon: 'images/apps/deadline-forge/icon.png',
    screenshots: [
      { file: 'images/apps/deadline-forge/01-challenge-generator.jpg', alt: 'Deadline Forge challenge generator: pick focus, difficulty, time limit and scenario', frame: 'browser', domain: '127.0.0.1:3001' },
      { file: 'images/apps/deadline-forge/02-running-session.jpg', alt: 'A running practice session with the countdown clock and the acceptance criteria checklist', frame: 'browser', domain: '127.0.0.1:3001' },
      { file: 'images/apps/deadline-forge/03-practice-kit.jpg', alt: 'Data and tests tab with the downloadable practice kit and a file preview', frame: 'browser', domain: '127.0.0.1:3001' },
      { file: 'images/apps/deadline-forge/04-competition-notes.jpg', alt: 'Competition notes page comparing the regional and national Skill 09 formats', frame: 'browser', domain: '127.0.0.1:3001' },
    ],
  },
  {
    slug: 'smartii',
    name: 'Smartii',
    tagline: 'A browser extension that puts an AI assistant bar at the bottom of any page.',
    description:
      'Smartii is a Chromium extension that opens a small assistant bar at the bottom of the page when I press Ctrl+Shift+S. I can type a question, or let it screenshot the visible tab and send it to the AI provider I picked.\n\nIt runs on my own API key with seven providers, the key stays in the browser sync storage, and requests go straight to the provider. It is plain JavaScript on Manifest V3 with no build step. It is not in the Chrome Web Store: the release zip is loaded as an unpacked extension.',
    year: '2026',
    kind: 'extension',
    platforms: ['Chrome', 'Edge', 'Brave', 'Arc'],
    stack: ['JavaScript', 'Chrome Extension Manifest V3', 'HTML', 'CSS'],
    status: 'Open source, v1.6.1',
    highlights: [
      'Seven providers with your own key: Gemini, Groq, OpenRouter, Hugging Face, Claude, ChatGPT, Perplexity',
      'Screenshots the visible tab and routes to a vision-capable model',
      'Keyboard-first: summon, solve the screen, or hide it with one shortcut',
      'Plain JavaScript, Manifest V3, no build step, MIT licensed',
    ],
    repoUrl: 'https://github.com/platret/Smartii',
    liveUrl: 'https://platret.github.io/Smartii/',
    installUrl: 'https://github.com/platret/Smartii/releases/latest',
    installLabel: 'Extension zip from GitHub Releases',
    isPrivateRepo: false,
    icon: 'images/apps/smartii/icon.png',
    screenshots: [
      { file: 'images/apps/smartii/02-settings-providers.jpg', alt: 'Smartii settings page: pick a provider and add an API key', frame: 'desktop', width: 1440, height: 900 },
    ],
  },
  {
    slug: 'daily-terminal',
    name: 'Daily Terminal',
    tagline: 'A local daily dashboard for Claude memory, Obsidian notes, Slack and Trello.',
    description:
      "Daily Terminal is a small web app that runs only on my Mac and gathers my day on one page. It shows the live memory stream from claude-mem with an activity heatmap and streak, today's Obsidian daily note with quick capture, and panels for Slack, Gmail, Google Calendar and Trello.\n\nThe server is a single Node file with no dependencies, bound to localhost, and it only writes to the vault when I explicitly ask it to. The screenshots come from a copy that runs on a filtered database and an empty demo vault.",
    year: '2026',
    kind: 'tool',
    platforms: ['Web (local)', 'macOS'],
    stack: ['Node.js', 'node:sqlite', 'JavaScript', 'HTML', 'CSS', 'Server-Sent Events'],
    status: 'Local tool',
    highlights: [
      'Zero-dependency Node server, no npm install',
      'Search across memory and vault with Cmd+K',
      'Capture to the daily note or inbox, plus a session digest',
      'Dark and light theme',
    ],
    isPrivateRepo: false,
    icon: 'images/apps/daily-terminal/icon.png',
    screenshots: [
      { file: 'images/apps/daily-terminal/03-search.jpg', alt: 'Search palette showing memory results for the query minesweeper', frame: 'browser', width: 1600, height: 1000, domain: 'localhost:37780' },
      { file: 'images/apps/daily-terminal/04-daily-note.jpg', alt: 'Daily note panel with a capture, the vault panel and the Slack and Trello panels in their not connected state', frame: 'browser', width: 1600, height: 1000, domain: 'localhost:37780' },
    ],
  },
]
