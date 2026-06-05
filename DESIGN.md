# DESIGN.md : Flight Deck design system

The brand is a builder's control console read in a dim room. Warm graphite, amber phosphor, hairline seams. Every token serves "precise, mechanical, honest." This spec is post-verification: contrast computed, fonts confirmed free, perf blockers resolved.

## Theme decision (the scene sentence)
A peer or recruiter opens the link at night, on a laptop in a dim room, expecting another templated dev portfolio and instead finding a powered-on instrument quietly reporting real telemetry about a person. That forces dark. Dark here is not "tools look cool dark"; it is the only ground on which amber phosphor readouts and green/red status can mean anything. One state: powered on. No light theme.

## Stack and integration decisions (resolve the perf blockers up front)
- Portfolio runs **React 18**. ChipStack is a separate **React 19** repo; mounting its component tree into React 18 crashes (hook/dispatcher mismatch). So the playable hero is **not** an embed of the ChipStack app.
- **BOOT ENGINE hero = a self-contained in-app board.** A small, real fixed-timestep loop (pure-TS, no React-version coupling) renders a focused, trivially-clearable Tetris board in our own canvas, fully under our control (the name can decompose into its cells). It is a real engine, not a gif. The full ChipStack is one click away (live link + real screenshot, optionally a sandboxed lazy iframe).
- Other projects: real screenshots of the deployed sites plus live/repo links, framed in instrument bezels. No fake demos.

## Color

OKLCH only. No `#000`, no `#fff`. Warmth is now past the point of deniability (mid-surface chroma raised to 0.014 to 0.018, hue in the amber family 76 to 85) so "warm graphite" reads warm at a glance, not under a colorimeter. Strategy: **Committed dark.** Amber carries identity; green and red are strictly semantic.

```css
:root {
  /* Surface ramp : warm graphite, unmistakably warm */
  --bg:          oklch(0.165 0.012 78);  /* deepest ground (a hair of vertical warmth gradient allowed, surface only) */
  --panel:       oklch(0.205 0.016 78);  /* instrument plate */
  --panel-2:     oklch(0.245 0.018 76);  /* raised plate / expanded bay */
  --seam:        oklch(0.320 0.016 78);  /* 1px hairline borders */
  --seam-bright: oklch(0.430 0.016 78);  /* active / hover seam */

  /* Ink : warm bone, never pure white */
  --ink:         oklch(0.940 0.014 85);  /* primary text + numerals   (>=13.6:1 everywhere) */
  --ink-dim:     oklch(0.760 0.014 85);  /* secondary prose           (>=7.5:1) */
  --ink-faint:   oklch(0.625 0.015 82);  /* labels, captions          (raised from 0.600 -> clears 4.5:1 on every surface) */

  /* Signal : the one identity accent */
  --amber:       oklch(0.800 0.140 74);  /* phosphor readouts, active, REPO-ONLY status (>=8.5:1) */
  --amber-soft:  oklch(0.800 0.140 74 / 0.16);

  /* Semantic state : meaning only */
  --pass:        oklch(0.760 0.150 150); /* LIVE, tests pass, resolved (>=8:1) */
  --fail:        oklch(0.650 0.190 25);  /* fail, conflict (raised from 0.640 -> clears 4.5:1 on panel-2) */
}
```

Rules:
- **Amber's first on-screen appearance must be live telemetry** (a settling gauge or a moving scope trace), never a static colored heading or button. If amber debuts as a colored word, the dark+accent reflex wins regardless of the tokens.
- Amber = active / powered / REPO-ONLY. Green (`--pass`) = LIVE deploy and passing tests only. Red (`--fail`) = failure only.
- A project with no live URL (KillerSudoku, Smartii for Mac) never shows a green LIVE dot.
- No gradients on type or panels. The only permitted gradients are the physical-light falloff inside the hero shader and the scope-trace fade. No purple, ever.
- Glow is a low-opacity amber box-shadow on active readouts, used sparingly. Never blur-glass.

## Color is never the only signal (a11y 1.4.1)
Status is encoded by **shape + persistent text**, not hue alone:
- **LIVE**: green ring with a check glyph + the word `LIVE`.
- **REPO-ONLY**: amber filled dot + the word `REPO`.
- **FAIL**: red hollow circle with an x glyph + the word `FAIL`.

This survives deuteranopia (where `--pass` green and `--fail` red are otherwise indistinguishable) and `prefers-reduced-motion` (the 2px LED mount tick is decorative and suppressed; the shape and label are not).

## Typography

Three faces, each one named job. Mono is earned (a literal instrument whose readouts column-align), but the page does **not** open on mono: the human's name is in the human face.

| Face | Voice | Where |
|---|---|---|
| **Hanken Grotesk** | the human | the masthead **name** (heavy 800), all headings, prose, project descriptions, contact, skim/resume copy. The warm voice, present enough to feel a real human/machine duet. |
| **Martian Mono** | the instrument | numerals and gauges, readouts, status, section numbers, the HUD. Machine telemetry; digits column-align. |
| **Geist Mono** | the source | real code excerpts from Alex's repos (e.g. `STEP_MS = 1000/60`) shown as proof. A legible code face, distinct from the instrument labels. |

All free, OFL, self-hosted via `@fontsource` (verified: `@fontsource-variable/hanken-grotesk`, `@fontsource-variable/martian-mono`, `@fontsource-variable/geist-mono`). Geist *Mono* is a different family from the reflex-rejected Geist *Sans*.

Scale: modular, fluid, ratio >= 1.25. Light-on-dark gets +0.05 to 0.1 line-height.

```css
--step-display: clamp(3rem, 1.4rem + 7.6vw, 7rem);   /* the name, Hanken 800 */
--step-gauge:   clamp(2rem, 1.2rem + 3vw, 3.25rem);  /* real numerals: 4th, 11th, 54 (Martian) */
--step-h2:      clamp(1.4rem, 1.1rem + 1.4vw, 2rem);
--step-h3:      1.25rem;
--step-body:    1.0625rem;  /* Hanken, line-height 1.62 */
--step-data:    0.8125rem;  /* Martian readouts, caps, tracking 0.04em */
--step-label:   0.6875rem;  /* Martian caps, tracking 0.12em */
```

Guardrails:
- Prose measure 65 to 72ch.
- Caps + letterspacing only on Martian instrument labels. **Every uppercase tracked label must sit beside a real datum** (a status, a count, a designation like AP-2026, a port name). A tracked caps word floating alone above a heading as a decorative kicker is banned (it is the AI-scaffolding the brand bans, dressed as instrument grammar).
- Never all-caps body prose. Hierarchy via scale + weight, not color.

## Spacing, grid, elevation
- Sub-grid 4px (HUD and readouts snap to it); content rhythm on an 8px base.
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Vary it: tight inside a strip, generous between sections (`clamp()` that breathes).
- Layout voice is a **strict, visible grid** (tech-spec lane), not asymmetric editorial. 12-column, max 1200px, persistent left rule and corner ticks. Confident structure, not a centered stack.
- Radius: 2px on plates, 0 on rules, full circle on LEDs only. Machined.
- **Elevation is seams, not shadows.** Panels separate via 1px `--seam` and a one-step-lighter fill. At most one soft shadow, on the single floating element (the footer title block). **No nested panels.**

## Motion

Ease-out exponential only. No bounce, no elastic. Never animate layout props except the one allowed expand technique (below). Motion is mechanical and earned.

**Curve tokens** (shared by motion.dev and any CSS, so every animation uses the identical curve):
```ts
export const ease = {
  outQuint: [0.22, 1, 0.36, 1],
  outExpo:  [0.16, 1, 0.30, 1],
} as const
```

**The one-perpetual-loop invariant.** At most one perpetual `requestAnimationFrame` may be alive at any time. The continuous canvas readouts (frame counter + oscilloscope) share **one** rAF. The hero shader is also perpetual, so **shader and scope are mutually exclusive** (never on screen together). Discrete, self-terminating transitions (count-up, stroke-dashoffset draws, leader lines) run on motion.dev, which batches internally; they are not perpetual loops.

| Moment | Spec |
|---|---|
| Number readouts | motion.dev animates a JS number into text (no layout), 0 to real value, ~600ms `ease.outQuint`, on scroll-into-view. Settles like a gauge. |
| Status LED | 2px scale tick on mount (transform), steady after. Tick suppressed under reduced-motion; shape + label persist. |
| Section divider / schematic | self-draws via `stroke-dashoffset`, 240 to 480ms `ease.outExpo`, on enter. |
| Leader line | draws from spec label to the exact real node, 200ms, on hover/focus. **Only one draws at a time** (the hovered/focused spec); target node brightens to amber. |
| Strip expand | `grid-template-rows: 0fr -> 1fr`, ~320ms `ease.outQuint`, no overshoot. Used only on small bounded panels (the detail bay); apply `contain: content` to bound layout cost. |
| Frame + scope readout | one shared rAF, throttled to 30fps via accumulated-delta gating (not a second timer). See the canvas contract below. |
| BOOT ENGINE | the in-app board; lazy-loaded on intent; the name decomposes into its cells. |

**Canvas readout contract (makes "allocation-free" real, not asserted):**
- Ring buffer is a `Float32Array` sized once; a single integer cursor advances it (no `push`/`shift`/`slice`).
- The trace-fade gradient is created once and cached (recreated only on resize), or use `globalAlpha`. No object/array literals in the frame. No `getImageData` in the loop.
- Readout strings are built only when the value changes, off the hot path.
- **DPR is applied off the hot loop** (canvas backing store sized in a debounced resize handler and a `(resolution)` change listener), never per frame. Wording: "DPR applied off the hot loop, re-applied on resize/zoom," not "set once."
- Degrade order under a frame-time budget guard (rolling avg main-thread cost attributable to the loop): reduce scope sample rate, then stop the scope and show its last-second static snapshot (reuse the reduced-motion path), then never touch the shader. The frame number shown to users is the **actual measured** value (honest).
- Definition of done: verified allocation-free via a 10s DevTools heap-allocation timeline (flat, no sawtooth).

**Reduced-motion contract (single source of truth, built first):**
- Detect once with `matchMedia('(prefers-reduced-motion: reduce)')` **and subscribe to its `change` event** so a live OS toggle is honored. Feed that one boolean to motion.dev (`useReducedMotion`), the canvas loop, and the shader gate.
- When reduced: numbers mount at final value (no count-up); StatusLED renders steady (no mount tick); schematics render already-drawn; the scope draws its single static snapshot once and the rAF never starts; expansions are instant; the shader module is **not imported at all** (dynamic import gated, zero bundle cost on this path) and a static warm-graphite still is shown.
- Each line above is an acceptance test.

## Imagery (required: this is a brand surface)
Real visual proof, in priority order:
1. The in-app playable **BOOT ENGINE** board (real 60Hz loop).
2. The in-browser **KillerSudoku solver sweep** (real backtracking; cells lock green, ends `54/54 ASSERTIONS / UNIQUE`).
3. **Leader-lined SVG schematics**, one per project, from real architecture: ChipStack as a tetromino orthographic with real dimension callouts (`STEP_MS=1000/60`, SRS kick offsets); Smartii's 7-provider routing as a signal-flow diagram; sentiero's role-gated CRUD as a permission schematic. **No decorative callouts: every leader line lands on a real, labeled node.** A callout that points at nothing is banned the same way fake demos are.
4. **Real screenshots** of the live sites, captured from the deployed URLs, framed in instrument bezels.
5. **HeroShader** (optional, honors Alex's paper-shaders request and continues KillerSudoku): one contained `MeshGradient`/`GrainGradient` behind the masthead only, warm-graphite + amber, low contrast.

**HeroShader is an app-owned wrapper, because the library ships none of this:**
- Reads `prefers-reduced-motion` once; if reduce, renders the static still and **never imports** the shader (dynamic import => zero bundle on that path).
- An `IntersectionObserver` plus a `visibilitychange`/blur listener **fully unmount** the shader (return `null`) when offscreen or hidden, releasing the WebGL context and its rAF. Remount on re-entry. `speed=0` is a fallback only (it keeps the context alive).
- `@paper-design/shaders-react` is pinned to an **exact** version (no `^`/`~`), lockfile committed, version recorded here; props written against the pinned `colors`-array API (not the old `color1..4`). Bumps are manual, tested migrations.

## Components (the instrument kit)
- **OperatorMasthead**: huge name (Hanken 800), one-line positioning, optional HeroShader behind, ICT result as an arc gauge (`4th ZRH`) with a satellite dial (`11th CH`). Amber debuts here as a settling gauge, not a colored word.
- **InstrumentStrip** (one per project): honest StatusLED (shape + label), name, two or three real readouts, `[ + ]` to expand a detail bay (SVG schematic + leader-line specs + live screenshot + links). No nested panels.
- **Readout / Gauge**: Martian numerals, count-up, labeled, column-aligned. Explicitly not the SaaS hero-metric template; framed, bordered, semantic.
- **TechRack**: monospaced inventory grouped LANGUAGES / FRAMEWORKS / RUNTIME / DATA / OPS, tiny capability bars, no logos. Scannable in five seconds.
- **TitleBlockFooter**: persistent ISO-7200-style sign-off block (DRAWN BY: A. PLATRET, REV counter); expands at contact into email / GitHub / LinkedIn / X output ports with copy-to-clipboard.
- **SkimRoute**: a static, fully accessible single-view resume, always one tap away from the first viewport.

## Build rules and definition of done
- Pin `@paper-design/shaders-react` exact; commit lockfile.
- Fonts: self-host woff2, subset (numerals + caps + used glyphs), preload exactly the two first-viewport faces (Hanken display + Hanken body or Martian gauge), `font-display: swap` with fallback metric overrides to limit numeral reflow. Total font-byte budget tracked.
- Reduced-motion acceptance tests pass; canvas verified allocation-free; LEDs carry shape + text; `--ink-faint` and `--fail` clear 4.5:1 on every surface.
- No green LIVE dot on a repo-only project. No side-stripe borders, gradient text, glass, nested panels, or modal-first flows. No em dashes in copy.
