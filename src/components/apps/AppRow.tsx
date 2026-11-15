import { KIND_LABEL, type App } from '../../content/apps'
import { Link } from '../../router/router'
import { AppIcon } from './AppIcon'

/** One app in the index: icon, name, tagline and, from 768 px, its kind when the shelf mixes kinds
 *  (in a shelf of one kind the label would only repeat the shelf's name). The whole row is one link. */
export function AppRow({ app, eager, showKind = false }: { app: App; eager?: boolean; showKind?: boolean }) {
  return (
    <li className="hairline border-t">
      <Link
        to={`/apps/${app.slug}`}
        data-cursor="hover"
        className={`group grid h-full grid-cols-[3rem_minmax(0,1fr)] gap-x-4 py-4 -outline-offset-2 md:gap-x-5 md:py-5 ${showKind ? 'md:grid-cols-[3.5rem_minmax(0,1fr)_auto]' : 'md:grid-cols-[3.5rem_minmax(0,1fr)]'}`}
      >
        <AppIcon app={app} size={56} className="w-12 md:w-14" eager={eager} />
        <div className="min-w-0">
          <h3 className="font-display text-[1.75rem] leading-[1.05] tracking-[-0.02em] transition-transform duration-[600ms] ease-out-expo motion-safe:group-hover:translate-x-1.5 md:text-[2rem]">
            {app.name}
          </h3>
          {/* Never clamped: the content check keeps every tagline to 80 characters. */}
          <p className="mt-2 max-w-[44ch] text-pretty text-[0.7rem] leading-[1.6] text-paper/60 md:text-xs">{app.tagline}</p>
        </div>
        {showKind && <span className="hidden pt-1.5 text-right text-xs text-paper/50 md:block">{KIND_LABEL[app.kind]}</span>}
      </Link>
    </li>
  )
}
