import { apps } from '../../content/apps'
import { appsOf, shelves, type ShelfDef } from '../../lib/apps'
import { Link } from '../../router/router'

const ITEM = 'flex min-h-12 items-center gap-2 border-b-2 px-2 text-[0.7rem] uppercase tracking-[0.08em] -outline-offset-2 transition-colors duration-[600ms] ease-out-expo md:px-4'

/** All, then one link per shelf that holds apps. A filter change replaces the URL:
 *  no history entry, no scroll, no focus move. */
export function KindFilter({ current }: { current: ShelfDef | undefined }) {
  const items = [
    { id: 'all', label: 'All', to: '/apps', count: apps.length, on: !current },
    ...shelves.map((shelf) => ({ id: shelf.id, label: shelf.label, to: `/apps?kind=${shelf.id}`, count: appsOf(shelf).length, on: shelf === current })),
  ]

  return (
    <>
      <nav aria-label="Filter apps by kind">
        <ul className="hairline grid grid-cols-3 md:flex md:border-b">
          {items.map((item) => (
            <li key={item.id} className="hairline border-b md:border-b-0">
              <Link
                to={item.to}
                replace
                scroll={false}
                aria-current={item.on ? 'true' : undefined}
                data-cursor="hover"
                className={`${ITEM} -mb-px justify-center md:justify-start ${item.on ? 'border-accent text-paper' : 'border-transparent text-paper/50 hover:text-paper'}`}
              >
                {item.label}
                <span className="tabular-nums">{item.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="sr-only" role="status">
        {current ? `Showing ${appsOf(current).length} of ${apps.length} apps: ${current.label}` : `Showing all ${apps.length} apps`}
      </p>
    </>
  )
}
