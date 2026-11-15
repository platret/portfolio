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
      {/* The bar is decoration: the screenshot's alt text says what the window shows. */}
      <div aria-hidden="true" className="flex items-center gap-3 border-b border-paper/10 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
        </span>
        {title ? (
          <span className="mx-auto min-w-0 truncate py-0.5 text-[0.65rem] text-paper/50">{title}</span>
        ) : domain ? (
          <span className="mx-auto flex min-w-0 items-center gap-2 rounded-full bg-paper/5 px-3 py-0.5 text-[0.65rem] text-paper/50">
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#4ade80]" />
            <span className="truncate">{domain}</span>
          </span>
        ) : (
          <span className="mx-auto py-0.5 text-[0.65rem]">
            &nbsp;
          </span>
        )}
        <span className="w-[42px] flex-none" />
      </div>
      {children}
    </div>
  )
}
