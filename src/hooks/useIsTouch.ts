import { useMediaQuery } from './useMediaQuery'

export function useIsTouch(): boolean {
  return useMediaQuery('(hover: none), (pointer: coarse)')
}

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)')
}
