'use client'

import { useMemo, useState, useEffect } from 'react'

export const DEFAULT_HIDDEN_PATHS = ['/messenger']

export function isPathMatch(currentPath: string, pattern: string): boolean {
  if (!currentPath || !pattern) return false
  const cleanCurrent = currentPath.toLowerCase()
  const cleanPattern = pattern.toLowerCase().trim()

  if (cleanPattern.endsWith('/*')) {
    const prefix = cleanPattern.slice(0, -2)
    return cleanCurrent === prefix || cleanCurrent.startsWith(prefix + '/')
  }
  if (cleanPattern.endsWith('*')) {
    const prefix = cleanPattern.slice(0, -1)
    return cleanCurrent.startsWith(prefix)
  }
  return cleanCurrent === cleanPattern || cleanCurrent.startsWith(cleanPattern + '/')
}

interface UseFloatingChatVisibilityProps {
  hiddenPaths?: string[]
  showOnlyPaths?: string[]
  hideCondition?: (pathname: string) => boolean
  hidden?: boolean
  currentPath?: string
}

export function useFloatingChatVisibility({
  hiddenPaths = DEFAULT_HIDDEN_PATHS,
  showOnlyPaths,
  hideCondition,
  hidden = false,
  currentPath
}: UseFloatingChatVisibilityProps) {
  const [pathname, setPathname] = useState<string>(() => {
    if (currentPath) return currentPath
    return typeof window !== 'undefined' ? window.location.pathname : ''
  })

  useEffect(() => {
    if (currentPath !== undefined) {
      setPathname(currentPath)
      return
    }

    if (typeof window === 'undefined') return

    const handleLocationChange = () => {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [currentPath])

  const shouldHide = useMemo(() => {
    if (hidden) return true
    if (!pathname) return false

    if (hideCondition && hideCondition(pathname)) {
      return true
    }

    if (showOnlyPaths && showOnlyPaths.length > 0) {
      const isAllowed = showOnlyPaths.some((p) => isPathMatch(pathname, p))
      if (!isAllowed) return true
    }

    if (hiddenPaths && hiddenPaths.length > 0) {
      const isHidden = hiddenPaths.some((p) => isPathMatch(pathname, p))
      if (isHidden) return true
    }

    return false
  }, [pathname, hidden, hideCondition, showOnlyPaths, hiddenPaths])

  return { shouldHide, pathname }
}
