import { ShotStrip } from '../components/apps/ShotStrip'
import { FactRows } from '../components/FactRows'
import { PageHead } from '../components/PageHead'
import { competitions, programme, type Competition } from '../content/competitions'
import { appBySlug } from '../lib/apps'
import { Link } from '../router/router'
import { Hackathon } from '../sections/Hackathon'

const KICKER = 'text-[0.65rem] uppercase tracking-[0.12em] text-accent md:text-xs'
const BODY = 'text-xs leading-[1.9] text-paper/70 md:text-sm'
const LINK = 'inline-flex min-h-11 items-center border-b border-paper/40 transition-colors duration-[600ms] ease-out-expo hover:border-paper'

// ZentralHack has no block of its own: the Hackathon section carries its anchor.
const hasAnchor = (competition: Competition) => Boolean(competition.block) || competition.id === 'zentralhack'

const results = competitions.map((competition) => ({
  label: competition.name,
  figure: competition.figure,
  note: competition.note,
  to: hasAnchor(competition) ? `/competitions#${competition.id}` : undefined,
}))

const past = competitions.filter((competition) => competition.block && !competition.upcoming)
const upcoming = competitions.filter((competition) => competition.block && competition.upcoming)

export default function Competitions() {
  return (
    <>
      <PageHead left="Competitions" right="2026 – 2027" title={['Built against', 'the clock.']} />

      <div className="grid grid-cols-1 gap-x-8 px-5 pt-12 md:grid-cols-12 md:px-12 md:pt-[8vh]">
        <FactRows rows={results} className="md:col-span-6 md:col-start-7" />
      </div>

      {past.map(({ id, block }) => {
        const app = block!.app ? appBySlug(block!.app) : undefined
        const shots = app?.screenshots.filter((shot) => shot.frame !== 'phone').slice(0, 3) ?? []
        return (
          <article key={id} id={id} aria-labelledby={`${id}-title`} className="px-5 pt-16 md:px-12 md:pt-[16vh]">
            <div className="hairline grid grid-cols-1 gap-x-8 gap-y-12 border-t pt-8 md:grid-cols-12 md:pt-12">
              <div className="md:col-span-5">
                <p className={`mb-6 ${KICKER}`}>{block!.kicker}</p>
                <h2 id={`${id}-title`} className="font-display text-[clamp(2.7rem,5.7vw,6.8rem)] leading-[0.98] tracking-[-0.03em]">
                  {block!.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className={`mt-6 max-w-[48ch] ${BODY}`}>{block!.text}</p>
                {app && (
                  <Link to={`/apps/${app.slug}`} data-cursor="hover" className={`mt-6 text-xs ${LINK}`}>
                    {app.name}, the app
                  </Link>
                )}
              </div>
              {app && shots.length > 0 && (
                <div className="min-w-0 md:col-span-7">
                  <ShotStrip app={app} shots={shots} column />
                </div>
              )}
            </div>
          </article>
        )
      })}

      <Hackathon />

      {upcoming.map(({ id, block, figure }) => (
        <section key={id} id={id} aria-labelledby={`${id}-title`} className="px-5 py-10 md:px-12 md:py-[8vh]">
          <p className="mb-8 text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:mb-12 md:text-xs">Up next</p>
          <div className="relative grid grid-cols-1 gap-x-10 border-l border-paper/15 py-8 pl-8 md:ml-[12vw] md:grid-cols-[minmax(0,10vw)_1fr] md:py-12 md:pl-12">
            <span aria-hidden="true" className="absolute left-0 top-[2.6rem] h-2 w-2 -translate-x-[calc(50%+0.5px)] rounded-full border border-accent bg-ink md:top-[3.7rem]" />
            <span className="font-display text-[clamp(2.4rem,5vw,6rem)] leading-none tracking-[-0.03em] text-paper/40">{figure}</span>
            <div className="mt-4 md:mt-2">
              <p className={`mb-2 ${KICKER}`}>{block!.kicker}</p>
              <h2 id={`${id}-title`} className="text-[0.85rem] md:text-base">
                {block!.title.join(' ')}
              </h2>
              <p className="mt-2 max-w-[46ch] text-[0.7rem] leading-[1.7] text-paper/55 md:text-xs">{block!.text}</p>
            </div>
          </div>
        </section>
      ))}

      <section id={programme.id} aria-labelledby={`${programme.id}-title`} className="px-5 pb-8 pt-16 md:px-12 md:pb-[4vh] md:pt-[12vh]">
        <div className="mb-10 flex items-end justify-between text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:mb-16 md:text-xs">
          <span>Programme</span>
          <span>Not a competition</span>
        </div>
        <div className="hairline grid grid-cols-1 gap-x-8 border-t pt-8 md:grid-cols-12 md:pt-12">
          <div className="md:col-span-6">
            <p className={`mb-6 ${KICKER}`}>{programme.kicker}</p>
            <h2 id={`${programme.id}-title`} className="font-display text-[clamp(2.6rem,5.6vw,6.8rem)] leading-[0.95] tracking-[-0.03em]">
              {programme.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <div className="mt-8 md:col-span-5 md:col-start-8 md:mt-0 md:self-end">
            <p className={`max-w-[48ch] ${BODY}`}>{programme.text}</p>
            {programme.link && (
              <a href={programme.link.href} target="_blank" rel="noreferrer" data-cursor="hover" className="group mt-6 inline-flex min-h-11 items-center gap-6 border-b border-paper/40 text-xs">
                {programme.link.label}{' '}
                <span aria-hidden="true" className="transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
