import { motion } from 'framer-motion'
import { AppIcon } from '../components/apps/AppIcon'
import { AppPager } from '../components/apps/AppPager'
import { LinkLedger } from '../components/apps/LinkLedger'
import { ShotStrip } from '../components/apps/ShotStrip'
import { Breadcrumb } from '../components/Breadcrumb'
import { MaskedLines } from '../components/MaskedLines'
import { PageHead } from '../components/PageHead'
import { KIND_LABEL, type AppShot } from '../content/apps'
import { competitions } from '../content/competitions'
import { appBySlug, shelfOf } from '../lib/apps'
import { DUR, EASE_OUT } from '../lib/motion'
import { Link } from '../router/router'
import type { Params } from '../router/routes'

const LABEL = 'text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:text-xs'
const FACT = 'hairline grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-6 border-t py-4 text-[0.75rem] md:text-sm'

type Strip = { label: string; shots: AppShot[] }

/** Screenshots split into phones and wide frames, in order of first appearance. */
function strips(shots: AppShot[]): Strip[] {
  const phone = shots.filter((shot) => shot.frame === 'phone')
  const wide = shots.filter((shot) => shot.frame !== 'phone')
  const wideLabel = wide.some((shot) => shot.frame === 'browser') ? 'Browser' : 'Desktop'
  const groups: Strip[] = [
    { label: 'Phone', shots: phone },
    { label: wideLabel, shots: wide },
  ].filter((group) => group.shots.length > 0)
  return shots[0]?.frame === 'phone' ? groups : groups.reverse()
}

/** One app: where to open it, what it looks like, what it does and what it is built with. */
export default function AppDetail({ params }: { params: Params }) {
  const app = appBySlug(params.slug)
  // The route's valid() has already sent unknown slugs to the Not found page.
  if (!app) return null

  const shelf = shelfOf(app)
  const gallery = strips(app.screenshots)
  const paragraphs = app.description.split('\n\n')
  const competition = competitions.find((item) => item.id === app.competition)

  return (
    <article aria-labelledby="app-name">
      <PageHead
        left={
          <Breadcrumb
            items={[
              { label: 'Apps', to: '/apps' },
              { label: shelf.label, to: `/apps?kind=${shelf.id}` },
            ]}
          />
        }
        right={app.year}
      />

      <div className="px-5 pb-16 md:px-12 md:pb-[10vh]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-8 md:grid-cols-12 md:pt-12">
          <div className="md:col-span-7">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: DUR.base, ease: EASE_OUT }}>
              <AppIcon app={app} size={96} className="w-[4.5rem] md:w-24" eager />
            </motion.div>
            <MaskedLines
              as="h1"
              id="app-name"
              tabIndex={-1}
              lines={[app.name]}
              className="mt-8 text-balance font-display text-[clamp(2.7rem,5.7vw,6.8rem)] leading-[0.98] tracking-[-0.03em] outline-none md:mt-10"
            />
            <motion.p
              className="mt-6 max-w-[30ch] text-pretty font-display text-[clamp(1.375rem,2vw,1.875rem)] leading-[1.15] text-paper/85"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.base, ease: EASE_OUT, delay: 0.3 }}
            >
              {app.tagline}
            </motion.p>
          </div>
          <motion.div
            className="md:col-span-5 md:col-start-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.base, ease: EASE_OUT, delay: 0.3 }}
          >
            <LinkLedger app={app} />
          </motion.div>
        </div>

        {gallery.length > 0 && (
          <div className="mt-16 space-y-12 md:mt-[max(10vh,6rem)] md:space-y-16">
            {gallery.map((group, i) => (
              <ShotStrip key={group.label} app={app} shots={group.shots} label={gallery.length > 1 ? group.label : undefined} priority={i === 0} />
            ))}
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-[10vh] md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="max-w-[62ch] space-y-5 text-xs leading-[1.9] text-paper/70 md:text-sm">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {app.story && (
              <dl className="mt-10 max-w-[62ch] space-y-6 text-xs leading-[1.9] md:text-sm">
                <div>
                  <dt className="mb-1 text-paper">What I built</dt>
                  <dd className="text-paper/60">{app.story.built}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-paper">One deliberate choice</dt>
                  <dd className="text-paper/60">{app.story.choice}</dd>
                </div>
              </dl>
            )}
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <h2 className={`mb-4 ${LABEL}`}>Highlights</h2>
            <ul>
              {app.highlights.map((line) => (
                <li key={line} className="hairline border-t py-4 text-[0.75rem] leading-[1.6] md:text-sm">
                  {line}
                </li>
              ))}
            </ul>

            <div className="hairline border-t pb-10 pt-6">
              <ul aria-label="Stack" className="flex flex-wrap gap-2">
                {app.stack.map((item) => (
                  <li key={item} className="rounded-full border border-paper/15 px-3 py-1 text-[0.65rem] text-paper/60">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <dl>
              <div className={FACT}>
                <dt className="text-paper/55">Kind</dt>
                <dd className="text-right">{KIND_LABEL[app.kind]}</dd>
              </div>
              <div className={FACT}>
                <dt className="text-paper/55">{app.platforms.length === 1 ? 'Platform' : 'Platforms'}</dt>
                <dd className="text-balance text-right">{app.platforms.join(' / ')}</dd>
              </div>
              {competition && (
                <div className={FACT}>
                  <dt className="text-paper/55">Built for</dt>
                  <dd className="text-right">
                    <Link
                      to={`/competitions#${competition.id}`}
                      data-cursor="hover"
                      className="border-b border-paper/40 transition-colors duration-[600ms] ease-out-expo hover:border-paper"
                    >
                      {competition.name}
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
            <div aria-hidden="true" className="hairline border-t" />
          </div>
        </div>

        <div className="mt-16 md:mt-[10vh]">
          <AppPager slug={app.slug} />
        </div>
      </div>
    </article>
  )
}
