// Small cross-component events: toasts, the command palette and route changes.
export const TOAST_EVENT = 'portfolio:toast'
export const PALETTE_EVENT = 'portfolio:palette'
/** Fired on window after every page change, once the new page is on screen. */
export const ROUTE_EVENT = 'portfolio:route'

export const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }))
}

export async function copyText(text: string, message: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast(message)
  } catch {
    toast(text)
  }
}

export function openPalette() {
  window.dispatchEvent(new Event(PALETTE_EVENT))
}
