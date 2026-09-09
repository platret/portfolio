# Alex — Portfolio

Type-led editorial portfolio. Vite + React + TypeScript + Tailwind, Lenis smooth scroll, GSAP ScrollTrigger, Framer Motion entrances, ogl WebGL distortion strip.

## Run

```sh
npm install
npm run dev
```

## Edit content

Everything user-facing lives in `src/content/site.ts`: name, role, intro, projects, strip images, facts, links. Swap images in `public/images`.

## Structure

- `src/sections` — one component per section (Hero, Intro, WorkList, DistortionStrip, About, Footer)
- `src/hooks` — Lenis, media queries, count-up, in-view, fit-text
- `src/components` — grain overlay, custom cursor, masked line reveal
- `src/lib` — GSAP registration, motion constants, GLSL shaders
