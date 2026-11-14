import type { ReactNode } from 'react'

export function BrowserFrame({ domain, children }: { domain?: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-paper/10 bg-[#141614] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3 border-b border-paper/10 px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
        </span>
        {domain && (
          <span className="mx-auto flex items-center gap-2 rounded-full bg-paper/5 px-3 py-0.5 text-[0.65rem] text-paper/50">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            {domain}
          </span>
        )}
        <span aria-hidden="true" className="w-[42px]" />
      </div>
      {children}
    </div>
  )
}
