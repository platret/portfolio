// All content here is real and verified against Alex's GitHub and the Phase 0
// interview. No invented metrics. Live URLs were confirmed to resolve (200).

export const person = {
  name: "Alex Platret",
  age: 17,
  role: "Junior Frontend Developer",
  city: "Zurich, Switzerland",
  school: "BZZ Horgen",
  status: "Software developer apprentice",
  // One warm sentence, in his own voice, against the cold instrumentation.
  line: "I build things until they feel right, then I keep going until they are fast.",
};

export const achievement = {
  event: "Regional ICT Championships 2026",
  rankZurich: 4,
  rankSwitzerland: 11,
};

export const contact = {
  email: "platret.alex@gmail.com",
  github: "https://github.com/platret",
  githubHandle: "platret",
  // Replace with the exact vanity URL when confirmed; search link until then.
  linkedin: "https://www.linkedin.com/search/results/people/?keywords=Alex%20Platret",
  linkedinLabel: "Alex Platret",
  x: "https://x.com/jacknos_",
  xHandle: "jacknos_",
};

export type DeployState = "live-app" | "live-site" | "repo";

export type Readout = { label: string; value: string };

export type Project = {
  no: string;
  id: "chipstack" | "sudoku" | "smartii" | "smartii-mac" | "sentiero";
  name: string;
  designation: string;
  state: DeployState;
  liveUrl: string | null;
  repoUrl: string;
  shotUrl: string | null;
  stack: string[];
  readouts: Readout[];
  blurb: string;
};

export const projects: Project[] = [
  {
    no: "001",
    id: "chipstack",
    name: "ChipStack",
    designation: "Browser arcade : real Tetris engine + play-money casino",
    state: "live-app",
    liveUrl: "https://platret.github.io/chipstack/",
    repoUrl: "https://github.com/platret/chipstack",
    shotUrl: "/shots/chipstack.webp",
    stack: ["React 19", "TypeScript", "Canvas 2D", "Tailwind v4"],
    readouts: [
      { label: "Engine", value: "60 Hz fixed-step" },
      { label: "Rotation", value: "SRS + wall-kicks" },
      { label: "Backend", value: "none" },
    ],
    blurb:
      "A guideline-grade Tetris engine, decoupled logic at a locked 60 Hz off an accumulator so the feel is identical at 60, 144 and 240 Hz. Full SRS with separate I-kicks, 7-bag, tunable DAS, ARR and SDF, lock delay with move-reset, T-spins, back-to-back and combos, all rendered on canvas. Beside it sits a play-money casino with authentic house edges. No real money, ever.",
  },
  {
    no: "002",
    id: "sudoku",
    name: "KillerSudoku",
    designation: "Keyboard-first Killer Sudoku desktop app",
    state: "repo",
    liveUrl: null,
    repoUrl: "https://github.com/platret/killer-sudoku",
    shotUrl: null,
    stack: ["Electron", "React 18", "TypeScript", "better-sqlite3", "three.js", "paper-shaders"],
    readouts: [
      { label: "Tests", value: "54 / 54" },
      { label: "Solver", value: "provably unique" },
      { label: "Storage", value: "SQLite WAL" },
    ],
    blurb:
      "Every published puzzle is provably unique: a backtracking solver with MRV heuristics verifies one and only one solution exists before anything is saved. Command palette, full keyboard control, resume in-progress, stats, highscores, PNG and WebM export, bcrypt auth, 54 passing tests. Built for the SkillsBattle competition.",
  },
  {
    no: "003",
    id: "smartii",
    name: "Smartii",
    designation: "Browser AI assistant : screenshot the page, get the answer",
    state: "live-site",
    liveUrl: "https://platret.github.io/Smartii/",
    repoUrl: "https://github.com/platret/Smartii",
    shotUrl: "/shots/smartii.webp",
    stack: ["Browser extension", "JavaScript", "7 providers", "No backend"],
    readouts: [
      { label: "Providers", value: "7" },
      { label: "Summon", value: "Ctrl Shift S" },
      { label: "Keys", value: "stay local" },
    ],
    blurb:
      "A small assistant bar summoned at the bottom of any page. Type a question, or screenshot the whole visible page and let your chosen AI solve it. Works across seven providers, free and paid. Your API key lives only in your browser. No server.",
  },
  {
    no: "004",
    id: "smartii-mac",
    name: "Smartii for Mac",
    designation: "Native macOS menu-bar AI assistant",
    state: "live-site",
    liveUrl: "https://platret.github.io/Smartii-Mac/",
    repoUrl: "https://github.com/platret/Smartii-Mac",
    shotUrl: "/shots/smartii-mac.webp",
    stack: ["AppKit", "Swift", "ScreenCaptureKit", "Keychain"],
    readouts: [
      { label: "Lives in", value: "menu bar" },
      { label: "Sees", value: "whole screen" },
      { label: "Hotkey", value: "Cmd Shift S" },
    ],
    blurb:
      "The desktop sibling of the Smartii extension, written in AppKit. Hit a global hotkey in any app, it captures the screen with ScreenCaptureKit, sends it to a vision model, and shows the answer in a floating panel, already copied to your clipboard. Keys live in the macOS Keychain. No backend, no telemetry.",
  },
  {
    no: "005",
    id: "sentiero",
    name: "sentiero-alpino",
    designation: "Vanilla-JS frontend on a live Swiss hiking REST API",
    state: "live-app",
    liveUrl: "https://platret.github.io/sentiero-alpino/",
    repoUrl: "https://github.com/platret/sentiero-alpino",
    shotUrl: "/shots/sentiero.webp",
    stack: ["HTML", "CSS", "Vanilla JS", "Bootstrap 5.3", "No build step"],
    readouts: [
      { label: "Tests", value: "30 / 30" },
      { label: "Roles", value: "guest + member" },
      { label: "i18n", value: "DE / IT / FR" },
    ],
    blurb:
      "A plain HTML, CSS and JavaScript frontend for the M294 hiking REST API, no build tools at all. Two roles, ten use cases, role-gated CRUD, URL-synced search and filters, a persisted dark mode that honours prefers-color-scheme, and a UI that translates instantly into the three main Swiss languages. 30 of 30 black-box tests passing.",
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Java", "Python", "C#", "C", "SQL", "HTML", "CSS"] },
  { label: "Frameworks", items: ["React", "Next.js", "TanStack", "Tailwind", "Motion", "Vite", "Sass", "Spring", ".NET", "Express"] },
  { label: "Runtime", items: ["Node.js", "Bun"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Prisma"] },
  { label: "Ops", items: ["Git", "GitHub Actions", "Docker", "Vercel", "Linux", "Figma"] },
];
