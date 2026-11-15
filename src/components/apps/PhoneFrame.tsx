import type { ReactNode } from 'react'

/** A phone screenshot with rounded corners, a fine edge and a deep shadow. No drawn bezel or notch.
 *  The two radii make the corners round on a tall box. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-[13.5%/6.2%] border border-paper/15 bg-panel shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">{children}</div>
}
