import type { App } from '../../content/apps'
import { linkLabel, repoLabel } from '../../lib/apps'

const ROW = 'hairline grid min-h-12 grid-cols-[auto_minmax(0,1fr)] items-baseline gap-6 border-t py-3.5 text-[0.75rem] lg:text-sm'
const LABEL = 'text-paper/55'

function LinkRow({ label, value, href, wrap = false }: { label: string; value: string; href: string; wrap?: boolean }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noreferrer" title={href} data-cursor="hover" className={`${ROW} group -outline-offset-2`}>
        <span className={`${LABEL} transition-colors duration-[600ms] ease-out-expo group-hover:text-paper`}>{label}</span>
        <span className="flex min-w-0 items-baseline justify-end gap-2 text-right text-paper">
          <span className={wrap ? 'min-w-0 text-balance' : 'min-w-0 truncate'}>{value}</span>
          <span aria-hidden="true" className="flex-none text-accent transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5">
            ↗
          </span>
          <span className="sr-only">, opens in a new tab</span>
        </span>
      </a>
    </li>
  )
}

function TextRow({ label, value, dim = false }: { label: string; value: string; dim?: boolean }) {
  return (
    <li className={ROW}>
      <span className={LABEL}>{label}</span>
      <span className={`min-w-0 text-balance text-right ${dim ? 'text-paper/50' : 'text-paper'}`}>{value}</span>
    </li>
  )
}

/** Where the app can be opened, installed or read. A missing link is simply a missing row;
 *  the status row is always there, so the block is never empty. */
export function LinkLedger({ app }: { app: App }) {
  return (
    <ul aria-label={`${app.name}: links and status`}>
      {app.liveUrl && <LinkRow label="Open" value={linkLabel(app.liveUrl)} href={app.liveUrl} />}
      {app.installUrl && app.installLabel && <LinkRow label="Install" value={app.installLabel} href={app.installUrl} wrap />}
      {app.repoUrl ? <LinkRow label="Code" value={repoLabel(app.repoUrl)} href={app.repoUrl} /> : app.isPrivateRepo ? <TextRow label="Code" value="Private repository" dim /> : null}
      <TextRow label="Status" value={app.status} />
      <li aria-hidden="true" className="hairline border-t" />
    </ul>
  )
}
