import { Link } from '../router/router'

export type Crumb = {
  label: string
  /** Leave out for the current page: it is shown as text with aria-current. */
  to?: string
  /** Passed to Link: replace the history entry and keep the scroll position (the kind filter). */
  replace?: boolean
  scroll?: boolean
}

const CRUMB = 'relative -my-3 inline-block py-3 transition-[color,border-color] duration-[600ms] ease-out-expo hover:text-paper'

/** 'Apps / iPhone' in the label row of a page head. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.to ? (
              <Link to={item.to} replace={item.replace} scroll={item.scroll} data-cursor="hover" className={CRUMB}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-paper">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
