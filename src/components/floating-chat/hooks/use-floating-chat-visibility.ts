'use client'

import { useMemo, useState, useEffect } from 'react'

export const DEFAULT_HIDDEN_PATHS = ['/messenger']

export function isPathMatch(currentPath: string, pattern: string): boolean {
  if (!currentPath || !pattern) return false
  const cleanCurrent = (currentPath.startsWith('/') ? currentPath : `/${currentPath}`)
    .toLowerCase()
    .replace(/\/+$/, '') || '/'

  const cleanPattern = (pattern.startsWith('/') ? pattern : `/${pattern}`)
    .toLowerCase()
    .trim()

  if (cleanPattern.endsWith('/*')) {
    const prefix = cleanPattern.slice(0, -2).replace(/\/+$/, '') || '/'
    return cleanCurrent === prefix || cleanCurrent.startsWith(prefix === '/' ? '/' : `${prefix}/`)
  }

  if (cleanPattern.endsWith('*')) {
    const prefix = cleanPattern.slice(0, -1).replace(/\/+$/, '') || '/'
    return cleanCurrent === prefix || cleanCurrent.startsWith(prefix)
  }

  const normalizedPattern = cleanPattern.replace(/\/+$/, '') || '/'
  return cleanCurrent === normalizedPattern || cleanCurrent.startsWith(`${normalizedPattern}/`)
}

// Inyección única para interceptar cambios de ruta SPA generados por pushState/replaceState (Next.js, React Router, etc.)
if (typeof window !== 'undefined') {
  const customWindow = window as Window & { __sdi_messenger_history_patched__?: boolean }

  if (!customWindow.__sdi_messenger_history_patched__) {
    customWindow.__sdi_messenger_history_patched__ = true

    const originalPushState = window.history.pushState
    window.history.pushState = function (...args) {
      const result = originalPushState.apply(this, args)
      window.setTimeout(() => {
        window.dispatchEvent(new Event('pushstate'))
        window.dispatchEvent(new Event('locationchange'))
      }, 0)
      return result
    }

    const originalReplaceState = window.history.replaceState
    window.history.replaceState = function (...args) {
      const result = originalReplaceState.apply(this, args)
      window.setTimeout(() => {
        window.dispatchEvent(new Event('replacestate'))
        window.dispatchEvent(new Event('locationchange'))
      }, 0)
      return result
    }
  }
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
    if (currentPath !== undefined) return currentPath
    return typeof window !== 'undefined' ? window.location.pathname : ''
  })

  useEffect(() => {
    if (currentPath !== undefined) {
      setPathname(currentPath)
      return
    }

    if (typeof window === 'undefined') return

    const updatePath = () => {
      const activePath = window.location.pathname
      setPathname((prev) => (prev !== activePath ? activePath : prev))
    }

    // Actualización inmediata
    updatePath()

    // Escuchamos eventos nativos y sintéticos de navegación SPA
    window.addEventListener('popstate', updatePath)
    window.addEventListener('pushstate', updatePath)
    window.addEventListener('replacestate', updatePath)
    window.addEventListener('locationchange', updatePath)

    // Polling ligero (150ms) para garantizar detección en cualquier router o Server Action
    const interval = window.setInterval(updatePath, 150)

    return () => {
      window.removeEventListener('popstate', updatePath)
      window.removeEventListener('pushstate', updatePath)
      window.removeEventListener('replacestate', updatePath)
      window.removeEventListener('locationchange', updatePath)
      window.clearInterval(interval)
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
