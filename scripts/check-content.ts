// Checks the content files against the files in public/ before every build.
// Run with `npm run check` (Node 22.18 or later runs this TypeScript file directly).
// A mistyped image path would otherwise fail silently: the hosts answer unknown paths with index.html.

import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { apps, NOTABLE, SHOT_DEFAULT_SIZE } from '../src/content/apps.ts'
import { competitions, hackathon, programme } from '../src/content/competitions.ts'
import { history } from '../src/content/history.ts'
import { nav } from '../src/content/nav.ts'
import { site } from '../src/content/site.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = (path: string) => join(root, 'public', path)

const errors: string[] = []
const warnings: string[] = []

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/
const SYNC_DUPLICATE = / \d+\.[a-z0-9]+$/i
const MAX_TAGLINE = 80
const MAX_FEATURED = 8
const MAX_ICON_BYTES = 60 * 1024
const MAX_ICON_WIDTH = 256
const TOLERANCE = 2

type Size = { width: number; height: number }

/** Pixel size from a PNG IHDR chunk or a JPEG SOF segment. Null for anything else. */
function imageSize(file: string): Size | null {
  const data = readFileSync(file)
  if (data.length > 24 && data.readUInt32BE(0) === 0x89504e47) {
    return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) }
  }
  if (data.length > 4 && data[0] === 0xff && data[1] === 0xd8) {
    let at = 2
    while (at + 9 < data.length) {
      if (data[at] !== 0xff) {
        at++
        continue
      }
      const marker = data[at + 1]
      // Start-of-frame markers carry the size. 0xC4, 0xC8 and 0xCC are other segments.
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { width: data.readUInt16BE(at + 7), height: data.readUInt16BE(at + 5) }
      }
      // Markers without a length field.
      if (marker === 0xff || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
        at += marker === 0xff ? 1 : 2
        continue
      }
      at += 2 + data.readUInt16BE(at + 2)
    }
  }
  return null
}

function checkFile(owner: string, field: string, path: string): boolean {
  if (SYNC_DUPLICATE.test(path)) {
    errors.push(`${owner}: ${field} "${path}" looks like an iCloud sync duplicate. Point it at the original file.`)
    return false
  }
  if (!existsSync(pub(path))) {
    errors.push(`${owner}: ${field} "${path}" does not exist under public/.`)
    return false
  }
  return true
}

// Apps

const slugs = new Set<string>()
const ranks = new Map<number, string>()
const competitionIds = new Set<string>(competitions.map((competition) => competition.id))

for (const app of apps) {
  const who = `apps.ts, ${app.slug || app.name}`

  if (!SLUG.test(app.slug)) errors.push(`${who}: slug "${app.slug}" must be lowercase letters, digits and single hyphens.`)
  if (slugs.has(app.slug)) errors.push(`${who}: slug "${app.slug}" is used twice.`)
  slugs.add(app.slug)

  if (app.tagline.length > MAX_TAGLINE) errors.push(`${who}: tagline is ${app.tagline.length} characters, the limit is ${MAX_TAGLINE}.`)
  if (!app.description.trim()) errors.push(`${who}: description is empty.`)
  if (!/^\d{4}$/.test(app.year)) errors.push(`${who}: year "${app.year}" must be four digits.`)
  if (!app.status.trim()) errors.push(`${who}: status is empty.`)
  if (app.highlights.length < 3 || app.highlights.length > 5) errors.push(`${who}: has ${app.highlights.length} highlights, write three to five.`)
  if (app.installUrl && !app.installLabel) errors.push(`${who}: installUrl is set without installLabel.`)
  if (app.isPrivateRepo && app.repoUrl) errors.push(`${who}: isPrivateRepo is true but repoUrl is set. A private repository gets no link.`)
  if (app.competition && !competitionIds.has(app.competition)) errors.push(`${who}: competition "${app.competition}" is not an id in competitions.ts.`)

  if (app.featured !== undefined) {
    if (!Number.isInteger(app.featured) || app.featured < 1 || app.featured > MAX_FEATURED) {
      errors.push(`${who}: featured must be a whole number from 1 to ${MAX_FEATURED}.`)
    } else if (ranks.has(app.featured)) {
      errors.push(`${who}: featured ${app.featured} is already taken by ${ranks.get(app.featured)}.`)
    } else {
      ranks.set(app.featured, app.slug)
    }
  }

  if (app.icon && checkFile(who, 'icon', app.icon)) {
    const bytes = statSync(pub(app.icon)).size
    const size = imageSize(pub(app.icon))
    if (bytes > MAX_ICON_BYTES) warnings.push(`${who}: icon is ${Math.round(bytes / 1024)} kB. Resize it: sips -Z 256 "public/${app.icon}"`)
    if (size && size.width > MAX_ICON_WIDTH) warnings.push(`${who}: icon is ${size.width} px wide. Resize it: sips -Z 256 "public/${app.icon}"`)
  }

  app.screenshots.forEach((shot, i) => {
    const where = `${who}, screenshot ${i + 1}`
    if (!shot.alt.trim()) errors.push(`${where}: alt is empty. Say in one sentence what is on the screen.`)
    if ((shot.width === undefined) !== (shot.height === undefined)) errors.push(`${where}: set both width and height, or neither.`)
    if (!checkFile(where, 'file', shot.file)) return

    const real = imageSize(pub(shot.file))
    if (!real) {
      errors.push(`${where}: "${shot.file}" is not a PNG or JPEG.`)
      return
    }
    const expected = shot.width && shot.height ? { width: shot.width, height: shot.height } : SHOT_DEFAULT_SIZE[shot.frame]
    if (!expected) {
      errors.push(`${where}: frame '${shot.frame}' needs a size. Add width: ${real.width}, height: ${real.height}.`)
    } else if (Math.abs(expected.width - real.width) > TOLERANCE || Math.abs(expected.height - real.height) > TOLERANCE) {
      errors.push(`${where}: "${shot.file}" is ${real.width} x ${real.height}, not ${expected.width} x ${expected.height}. Add width: ${real.width}, height: ${real.height}.`)
    }
  })
}

for (const slug of NOTABLE) {
  if (!slugs.has(slug)) errors.push(`apps.ts: NOTABLE lists "${slug}", which is not the slug of an app.`)
}
if (new Set(NOTABLE).size !== NOTABLE.length) errors.push('apps.ts: NOTABLE lists an app twice.')
if (ranks.size > MAX_FEATURED) errors.push(`apps.ts: ${ranks.size} apps are featured, the home page shows ${MAX_FEATURED}.`)

// Competitions

for (const competition of competitions) {
  const app = competition.block?.app
  if (app && !slugs.has(app)) errors.push(`competitions.ts, ${competition.id}: block.app "${app}" is not a slug in apps.ts.`)
}

// Other images named in the content files

checkFile('competitions.ts, hackathon', 'shots.web.file', hackathon.shots.web.file)
hackathon.shots.phones.forEach((phone, i) => checkFile('competitions.ts, hackathon', `shots.phones[${i}].file`, phone.file))
checkFile('site.ts', 'portrait.src', site.portrait.src)

// Internal links written in the content files. A typo would quietly render the Not found page.

const pages = new Set<string>(['/', ...nav.map((item) => item.to)])
/** Anchors each page has, besides #main and #contact, which every page has. */
const anchors: Record<string, Set<string>> = {
  '/': new Set(['intro']),
  '/competitions': new Set<string>([...competitionIds, programme.id]),
  '/about': new Set(['now']),
}

function checkLink(owner: string, to: string | undefined) {
  if (!to) return
  const [path, hash] = to.split('#')
  if (path.startsWith('/apps/')) {
    if (!slugs.has(path.slice('/apps/'.length))) errors.push(`${owner}: link "${to}" points at an app that is not in apps.ts.`)
  } else if (!pages.has(path)) {
    errors.push(`${owner}: link "${to}" is not a page. Pages: ${[...pages].join(', ')}, /apps/<slug>.`)
    return
  }
  if (hash && hash !== 'main' && hash !== 'contact' && !anchors[path]?.has(hash)) {
    errors.push(`${owner}: link "${to}" points at an anchor that does not exist on ${path}.`)
  }
}

history.forEach((item) => checkLink(`history.ts, ${item.title}`, item.to))
site.now.forEach((item) => checkLink(`site.ts, now, ${item.label}`, item.to))
checkLink('site.ts, status', site.status.to)

// Report

for (const warning of warnings) console.warn(`warning  ${warning}`)

if (errors.length) {
  for (const error of errors) console.error(`error    ${error}`)
  console.error(`\nContent check failed: ${errors.length} ${errors.length === 1 ? 'problem' : 'problems'}.`)
  process.exit(1)
}

const shots = apps.reduce((n, app) => n + app.screenshots.length, 0)
console.log(`Content check passed: ${apps.length} apps, ${shots} screenshots${warnings.length ? `, ${warnings.length} ${warnings.length === 1 ? 'warning' : 'warnings'}` : ''}.`)
