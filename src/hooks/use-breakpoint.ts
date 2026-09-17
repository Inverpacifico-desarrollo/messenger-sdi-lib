'use client'

import * as React from 'react'

// Tailwind CSS breakpoints
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

export interface BreakpointState {
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  '2xl': boolean
}

export function useBreakpoint(): BreakpointState {
  const [breakpoints, setBreakpoints] = React.useState<BreakpointState>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  })

  React.useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth
      setBreakpoints({
        sm: width >= BREAKPOINTS.sm,
        md: width >= BREAKPOINTS.md,
        lg: width >= BREAKPOINTS.lg,
        xl: width >= BREAKPOINTS.xl,
        '2xl': width >= BREAKPOINTS['2xl'],
      })
    }

    updateBreakpoints()

    const mediaQueries = Object.entries(BREAKPOINTS).map(([, px]) => {
      const mql = window.matchMedia(`(min-width: ${px}px)`)
      const listener = () => updateBreakpoints()
      mql.addEventListener('change', listener)
      return { mql, listener }
    })

    return () => {
      mediaQueries.forEach(({ mql, listener }) => {
        mql.removeEventListener('change', listener)
      })
    }
  }, [])

  return breakpoints
}
