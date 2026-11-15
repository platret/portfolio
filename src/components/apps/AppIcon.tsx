import type { App } from '../../content/apps'
import { monogramOf } from '../../lib/apps'
import { asset } from '../../lib/paths'

type Props = {
  app: App
  /** Rendered size in CSS pixels, used for the image's width and height attributes. */
  size: 40 | 48 | 56 | 72 | 96
  /** Tailwind width classes when the tile changes size with the screen: 'w-12 md:w-14'. */
  className?: string
  /** Load at once instead of when it scrolls near the screen. */
  eager?: boolean
}

/** The app's icon, or a plate with its initial when it has none.
 *  Decorative everywhere: the app's name is always next to it. */
export function AppIcon({ app, size, className, eager = false }: Props) {
  return (
    <span className={`app-icon ${className ?? ''}`} style={className ? undefined : { width: size }}>
      {app.icon ? (
        <img src={asset(app.icon)} alt="" width={size} height={size} decoding="async" loading={eager ? 'eager' : 'lazy'} />
      ) : (
        <span className="app-icon__monogram" aria-hidden="true">
          {monogramOf(app)}
        </span>
      )}
    </span>
  )
}
