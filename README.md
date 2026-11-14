# Alex — Portfolio

Type-led editorial portfolio. Vite + React + TypeScript + Tailwind, Lenis smooth scroll, GSAP ScrollTrigger, Framer Motion entrances, ogl WebGL distortion strip.

## Run

```sh
npm install
npm run dev
```

## Edit content

Everything user-facing lives in `src/content/site.ts`: name, role, status chip, intro, projects, featured projects (`features`), the hackathon section, now, facts, path, links. Swap images in `public/images`.

## Structure

- `src/sections` — one component per section (Hero, Intro, WorkList + FeaturedProject, Hackathon, Now, About, Path, Footer)
- `src/hooks` — Lenis, media queries, count-up, in-view, fit-text
- `src/components` — grain overlay, custom cursor, masked line reveal, ⌘K command palette, toasts, browser frame
- `src/hooks/useEasterEggs.ts` — console greeting, tab-title nudge, Konami accent swap
- `src/lib` — GSAP registration, motion constants, GLSL shaders
