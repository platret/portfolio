# Alex, portfolio

Type-led editorial portfolio. Vite, React, TypeScript and Tailwind, with Lenis smooth scroll, GSAP ScrollTrigger, Framer Motion entrances and an ogl WebGL portrait.

Live at https://alexplatret.com (Cloudflare) and mirrored at https://platret.github.io/portfolio/ (GitHub Pages).

## Run

```sh
npm install
npm run dev
```

`npm run build` type-checks and builds into `dist`. `npm run lint` runs oxlint.

## Pages

| Path | Page | Source |
|---|---|---|
| `/` | Home: hero, intro and one row per section | `src/pages/Home.tsx` |
| `/apps` | Apps (interim list until the apps catalogue lands) | `src/pages/Apps.tsx` |
| `/history` | The timeline | `src/pages/History.tsx` |
| `/competitions` | Results, ICT Skills Battle, ZentralHack, the national final, Youngpreneurs | `src/pages/Competitions.tsx` |
| `/about` | About and Now | `src/pages/About.tsx` |
| anything else | Not found, rendered in place | `src/pages/NotFound.tsx` |

Contact is not a page. It is the footer, which closes every page (`#contact`).

The old one-page anchors still work: `/#work`, `/#hackathon`, `/#now`, `/#about` and `/#path` land on the page that replaced them (`legacyHashes` in `src/content/nav.ts`).

## Edit content

Content is plain data in `src/content`:

- `site.ts`: name, role, status chip, intro, now, about, facts, links (and, for now, the project list of the interim Apps page)
- `nav.ts`: the header items, their page titles and descriptions, the old anchors
- `history.ts`: the timeline
- `competitions.ts`: the results, the hackathon section and the Youngpreneurs block

Image paths are written relative to `public/` (`images/portrait.png`) and resolved in components with `asset()`.

## Structure

- `src/App.tsx`: the shell around every page (skip link, header, `<main>`, footer, palette, toasts, grain, cursor)
- `src/router`: the route table (`routes.ts`) and a small in-house router (`router.tsx`). It loads a page's chunk first, then swaps the page, restores scroll through Lenis, refreshes ScrollTrigger, moves focus to the new `h1` and sets the title, description and canonical URL
- `src/pages`: one component per route. Every page except Home and Not found is its own chunk
- `src/sections`: the larger blocks the pages are made of
- `src/components`: header, page head, fact rows, masked line reveal, ⌘K command palette, toasts, browser frame, grain, cursor
- `src/hooks`: Lenis, media queries, count-up, in-view, fit-text, the easter eggs
- `src/lib`: paths, head tags, scroll helpers, GSAP registration, motion constants, GLSL shaders

Internal links use `Link` from `src/router/router.tsx` or `href()` from `src/lib/paths.ts`, never a hand-written `/path`, so the site works at `/` and at `/portfolio/`.

## Hosting

Both hosts serve the same single-page build. Deep links such as `/history` have no file of their own, so each host needs a fallback to `index.html`.

- **Cloudflare** (alexplatret.com, base `/`): `wrangler.jsonc` sets `"not_found_handling": "single-page-application"`. Every path without a file answers with `index.html` and status 200, and the router shows the page or its own Not found page.
- **GitHub Pages** (base `/portfolio/`): `.github/workflows/pages.yml` builds with `--base=/portfolio/` and copies `dist/index.html` to `dist/404.html`. Pages serves that file at the requested URL, so the router reads the address and renders the page. The status code of a deep link on this mirror is 404; the canonical tag of every page points at alexplatret.com.

To check a build locally under both bases:

```sh
npm run build && npx vite preview
npm run build -- --base=/portfolio/ && npx vite preview --base=/portfolio/
```

## iCloud duplicates

This folder syncs through iCloud, which sometimes leaves copies named like `Toast 2.tsx`. They are ignored by git and excluded from the type check. Do not import them.
