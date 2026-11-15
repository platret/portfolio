import type { ReactNode } from 'react'

type Props = {
  /** Browser window: the address shown in the bar. */
  domain?: string
  /** Desktop window: the app's name in the bar instead of an address. */
  title?: string
  children: ReactNode
}

/** Window chrome around a screenshot: three dots and either an address or a window title. */
export function BrowserFrame({ domain, title, children }: Props) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-paper/10 bg-panel shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3 border-b border-paper/10 px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
        </span>
        {title ? (
          <span className="mx-auto min-w-0 truncate py-0.5 text-[0.65rem] text-paper/50">{title}</span>
        ) : domain ? (
          <span className="mx-auto flex min-w-0 items-center gap-2 rounded-full bg-paper/5 px-3 py-0.5 text-[0.65rem] text-paper/50">
            <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rounded-full bg-[#4ade80]" />
            <span className="truncate">{domain}</span>
          </span>
        ) : (
          <span aria-hidden="true" className="mx-auto py-0.5 text-[0.65rem]">
            &nbsp;
          </span>
        )}
        <span aria-hidden="true" className="w-[42px] flex-none" />
      </div>
      {children}
    </div>
  )
}
