import { useEffect } from 'react'
import { AppRow } from '../components/apps/AppRow'
import { Breadcrumb } from '../components/Breadcrumb'
import { KindFilter } from '../components/apps/KindFilter'
import { PageHead } from '../components/PageHead'
import { apps } from '../content/apps'
import { appsOf, orderedApps, shelfById, shelves } from '../lib/apps'
import { navigate, prefetch, useRoute } from '../router/router'

// The first icons on the page load at once, the rest when they scroll near.
const EAGER = 6

const RULE = 'hairline border-t'

/** The apps index: every app once, grouped into shelves, or one shelf when ?kind= is set. */
export default function Apps() {
  const { search } = useRoute()
  const kind = search.get('kind')
  const current = shelfById(kind)
  const shown = current ? [current] : shelves
  const eager = new Set((current ? appsOf(current) : orderedApps).slice(0, EAGER).map((app) => app.slug))

  // An unknown ?kind= shows everything; the address is corrected to match.
  useEffect(() => {
    if (kind !== null && !current) void navigate('/apps', { replace: true, scroll: false })
  }, [kind, current])

  // An app page is the likeliest next step: fetch its chunk ahead of the click.
  useEffect(() => {
    prefetch(`/apps/${orderedApps[0].slug}`)
  }, [])

  return (
    <>
      <PageHead
        left={
          current ? <Breadcrumb items={[{ label: 'Apps', to: '/apps', replace: true, scroll: false }, { label: current.label }]} /> : 'Apps'
        }
        right={current ? `${appsOf(current).length} of ${apps.length}` : apps.length}
        title={['Apps,', 'most of them.']}
        lead={
          <p className="max-w-[46ch] text-pretty text-xs leading-[1.9] text-paper/70 md:text-sm">
            What I have shipped, prototyped or built over a weekend. Finished and rough sit side by side, and each page says which is which.
          </p>
        }
      />

      <div className="px-5 pb-16 pt-12 md:px-12 md:pb-[10vh] md:pt-[8vh]">
        <KindFilter current={current} />

        <div className="mt-12 space-y-[4.5rem]">
          {shown.map((shelf) => {
            const list = appsOf(shelf)
            const odd = list.length % 2 === 1
            const mixed = new Set(list.map((app) => app.kind)).size > 1
            return (
              <section key={shelf.id} aria-labelledby={`shelf-${shelf.id}`} className="xl:grid xl:grid-cols-[12rem_minmax(0,1fr)]">
                <h2
                  id={`shelf-${shelf.id}`}
                  className="mb-5 flex items-baseline justify-between xl:sticky xl:top-[calc(var(--header-h)+1.5rem)] xl:mb-0 xl:block xl:self-start xl:pt-4"
                >
                  <span className="block font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none">{shelf.label}</span>
                  <span className="block text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:text-xs xl:mt-3">
                    <span className="sr-only">, </span>
                    {list.length}
                    <span className="sr-only"> apps</span>
                  </span>
                </h2>
                <ul className="shelf grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
                  {list.map((app) => (
                    <AppRow key={app.slug} app={app} eager={eager.has(app.slug)} showKind={mixed} />
                  ))}
                  {/* Closing rules. In two columns an odd count leaves the last cell empty:
                      it gets the rule that closes the row above it and nothing underneath. */}
                  {odd && <li aria-hidden="true" className={`${RULE} hidden lg:block`} />}
                  <li aria-hidden="true" className={RULE} />
                  {!odd && <li aria-hidden="true" className={`${RULE} hidden lg:block`} />}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </>
  )
}
