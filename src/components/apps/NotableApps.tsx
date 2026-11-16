import { KIND_LABEL, type App } from '../../content/apps'
import { notableApps, shotSize } from '../../lib/apps'
import { asset } from '../../lib/paths'
import { Link } from '../../router/router'
import { AppIcon } from './AppIcon'

/** The cover of a card: the first screenshot, or the first two when they are phone screens. */
function Cover({ app }: { app: App }) {
  const [first] = app.screenshots
  if (!first) return null

  if (first.frame === 'phone') {
    const phones = app.screenshots.filter((shot) => shot.frame === 'phone').slice(0, 2)
    return (
      <div className="absolute inset-0 flex items-start justify-center gap-[5%] pt-[9%]">
        {phones.map((shot, i) => {
          const { width, height } = shotSize(shot)
          return (
            <img
              key={shot.file}
              src={asset(shot.file)}
              alt=""
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              className={`w-[34%] rounded-[16px] border border-paper/15 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)] transition-transform duration-[900ms] ease-out-expo ${
                i === 1 ? 'mt-[7%] motion-safe:group-hover:-translate-y-2' : 'motion-safe:group-hover:-translate-y-1'
              }`}
            />
          )
        })}
      </div>
    )
  }

  const { width, height } = shotSize(first)
  return (
    <img
      src={asset(first.file)}
      alt=""
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-[900ms] ease-out-expo motion-safe:group-hover:scale-[1.03]"
    />
  )
}

/** The three apps I would show first, large, above the full index.
 *  Below 768 px a row you swipe sideways, from there a grid of three. */
export function NotableApps() {
  if (notableApps.length === 0) return null

  return (
    <section aria-labelledby="notable" className="mb-16 md:mb-[10vh]">
      <h2 id="notable" className="mb-5 flex items-baseline justify-between">
        <span className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none">Notable</span>
        <span className="text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:text-xs">Start here</span>
      </h2>

      <ul className="notable">
        {notableApps.map((app) => (
          <li key={app.slug}>
            <Link to={`/apps/${app.slug}`} data-cursor="hover" className="group block -outline-offset-2">
              {/* Decorative: the name, tagline and status underneath say what the app is. */}
              <div aria-hidden="true" className="relative aspect-[4/3] overflow-hidden rounded-[12px] border border-paper/10 bg-panel">
                <Cover app={app} />
              </div>
              <div className="mt-4 grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-3">
                <AppIcon app={app} size={40} className="w-10" />
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-[1.75rem] leading-[1.05] tracking-[-0.02em] md:text-[2rem]">{app.name}</h3>
                    <span className="flex-none text-[0.7rem] text-paper/50">{KIND_LABEL[app.kind]}</span>
                  </div>
                  <p className="mt-2 text-pretty text-[0.75rem] leading-[1.6] text-paper/70 md:text-xs">{app.tagline}</p>
                  <p className="mt-3 flex items-start gap-2 text-[0.7rem] leading-[1.6] text-paper/50">
                    <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    {app.status}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
