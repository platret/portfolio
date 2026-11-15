# Alex, portfolio

Type-led editorial portfolio. Vite, React, TypeScript and Tailwind, with Lenis smooth scroll, GSAP ScrollTrigger, Framer Motion entrances and an ogl WebGL portrait.

Live at https://alexplatret.com (Cloudflare) and mirrored at https://platret.github.io/portfolio/ (GitHub Pages).

## Run

```sh
npm install
npm run dev
```

`npm run build` checks the content, type-checks and builds into `dist`. `npm run check` runs the content check alone. `npm run lint` runs oxlint.

## Pages

| Path | Page | Source |
|---|---|---|
| `/` | Home: hero, intro and one row per section | `src/pages/Home.tsx` |
| `/apps` | Apps index: every app, grouped into shelves. `?kind=iphone`, `web`, `games`, `desktop` or `tools` shows one shelf | `src/pages/Apps.tsx` |
| `/apps/<slug>` | One app: links, screenshots, description, highlights, stack, previous and next | `src/pages/AppDetail.tsx` |
| `/history` | The timeline | `src/pages/History.tsx` |
| `/competitions` | Results, ICT Skills Battle, ZentralHack, the national final, Youngpreneurs | `src/pages/Competitions.tsx` |
| `/about` | About and Now | `src/pages/About.tsx` |
| anything else | Not found, rendered in place | `src/pages/NotFound.tsx` |

Contact is not a page. It is the footer, which closes every page (`#contact`).

The old one-page anchors still work: `/#work`, `/#feature-sponsuno`, `/#feature-lernspur`, `/#hackathon`, `/#now`, `/#about` and `/#path` land on the page that replaced them (`legacyHashes` in `src/content/nav.ts`).

## Edit content

Content is plain data in `src/content`:

- `apps.ts`: the apps catalogue, one object per app (see below)
- `site.ts`: name, role, status chip, intro, now, about, facts, links
- `nav.ts`: the header items, their page titles and descriptions, the old anchors
- `history.ts`: the timeline
- `competitions.ts`: the results, the hackathon section and the Youngpreneurs block

Image paths are written relative to `public/` (`images/portrait.png`) and resolved in components with `asset()`.

## Add an app

1. Make a folder `public/images/apps/<slug>/`. The slug is the last part of the address, `/apps/<slug>`: lowercase letters, digits and hyphens.
2. Put `icon.png` in it, 256 px wide or smaller (`sips -Z 256 icon.png`). Leave it out if the app has no icon: the page then shows a plate with the first letter of the name.
3. Put the screenshots in the same folder. JPEG or PNG, any number, also none.
4. Add one object to the `apps` array in `src/content/apps.ts`. The comments on the `App` type explain every field. Where you put it inside its group is where it appears on the index.
5. Run `npm run check`. It names the app and the field when a file is missing, a tagline is longer than 80 characters or a screenshot is not the size its frame expects, and it prints the `width` and `height` to add.

Rules the check cannot see:

- `installUrl` is for something a visitor can install: a download with a build in it or a store page. A release that only holds the source is a `repoUrl`.
- Set `liveUrl` only when the address answers today.
- A screenshot's `frame` is `phone`, `browser`, `desktop` (a window with the app's name) or `none`. Phone and wide screenshots end up in two separate strips.
- `featured: 1` to `featured: 8` puts the icon in the Apps row on the home page, in that order.
- Do not point a path at a file named like `icon 2.png`. Those are iCloud copies.

## Structure

- `src/App.tsx`: the shell around every page (skip link, header, `<main>`, footer, palette, toasts, grain, cursor)
- `src/router`: the route table (`routes.ts`) and a small in-house router (`router.tsx`). It loads a page's chunk first, then swaps the page, restores scroll through Lenis, refreshes ScrollTrigger, moves focus to the new `h1` and sets the title, description and canonical URL
- `src/pages`: one component per route. Every page except Home and Not found is its own chunk
- `src/sections`: the larger blocks the pages are made of
- `src/components`: header, page head, fact rows, masked line reveal, ⌘K command palette, toasts, browser frame, grain, cursor
- `src/components/apps`: icon tile, index row, kind filter, link ledger, screenshot strip, phone frame, previous and next
- `src/hooks`: Lenis, media queries, count-up, in-view, fit-text, the easter eggs
- `src/lib`: paths, head tags, scroll helpers, catalogue helpers (`apps.ts`), GSAP registration, motion constants, GLSL shaders
- `scripts/check-content.ts`: the content check. Node runs it directly, without a build step (Node 22.18 or later)

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
