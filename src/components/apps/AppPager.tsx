import type { App } from '../../content/apps'
import { neighbours } from '../../lib/apps'
import { Link } from '../../router/router'
import { AppIcon } from './AppIcon'

function Side({ app, rel, label, end = false }: { app: App; rel: 'prev' | 'next'; label: string; end?: boolean }) {
  return (
    <Link
      to={`/apps/${app.slug}`}
      rel={rel}
      data-cursor="hover"
      className={`hairline group flex flex-col gap-4 border-t py-6 -outline-offset-2 md:py-8 ${end ? 'md:items-end md:text-right' : ''}`}
    >
      <span className="text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:text-xs">{label}</span>
      <span className={`flex items-center gap-4 ${end ? 'md:flex-row-reverse' : ''}`}>
        <AppIcon app={app} size={48} className="w-10 md:w-12" />
        <span
          className={`font-display text-[1.75rem] leading-[1.05] tracking-[-0.02em] transition-transform duration-[600ms] ease-out-expo ${
            end ? 'motion-safe:md:group-hover:-translate-x-1.5' : 'motion-safe:group-hover:translate-x-1.5'
          }`}
        >
          {app.name}
        </span>
      </span>
    </Link>
  )
}

/** Previous and next app in index order, wrapping at both ends, and the way back to the index. */
export function AppPager({ slug }: { slug: string }) {
  const { prev, next } = neighbours(slug)

  return (
    <nav aria-label="More apps">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
        <Side app={prev} rel="prev" label="Previous" />
        <Side app={next} rel="next" label="Next" end />
      </div>
      <div className="hairline border-t">
        <Link
          to="/apps"
          data-cursor="hover"
          className="inline-flex min-h-12 items-center text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 transition-[color,border-color] duration-[600ms] ease-out-expo hover:text-paper md:text-xs"
        >
          All apps
        </Link>
      </div>
    </nav>
  )
}
