'use client'

import { useState, useEffect, useRef } from 'react'
import type { FloatingChatCorner } from '../types'

const CORNER_STORAGE_KEY = 'sdi_floating_chat_corner'

export function useFloatingChatDrag(defaultCorner: FloatingChatCorner = 'bottom-right') {
  const containerRef = useRef<HTMLDivElement>(null)
  const [corner, setCorner] = useState<FloatingChatCorner>(defaultCorner)
  const [isDragging, setIsDragging] = useState(false)
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null)

  const dragStartRef = useRef<{
    startX: number
    startY: number
    rect: DOMRect
    moved: boolean
  }>({ startX: 0, startY: 0, rect: new DOMRect(), moved: false })

  const wasDraggedRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)

  // Cargar esquina guardada de localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CORNER_STORAGE_KEY) as FloatingChatCorner | null
      if (saved && ['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(saved)) {
        setCorner(saved)
      }
    } catch {}
  }, [])

  const changeCorner = (newCorner: FloatingChatCorner) => {
    setCorner(newCorner)
    try {
      localStorage.setItem(CORNER_STORAGE_KEY, newCorner)
    } catch {}
  }

  const startDrag = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      rect,
      moved: false
    }

    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const dist = Math.hypot(
        moveEvent.clientX - dragStartRef.current.startX,
        moveEvent.clientY - dragStartRef.current.startY
      )

      if (dist > 5) {
        if (!dragStartRef.current.moved) {
          dragStartRef.current.moved = true
          setIsDragging(true)
        }

        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = requestAnimationFrame(() => {
          const newX = Math.max(
            12,
            Math.min(window.innerWidth - rect.width - 12, moveEvent.clientX - offsetX)
          )
          const newY = Math.max(
            12,
            Math.min(window.innerHeight - rect.height - 12, moveEvent.clientY - offsetY)
          )
          setDragPos({ x: newX, y: newY })
        })
      }
    }

    const handlePointerUp = (upEvent: PointerEvent) => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)

      if (dragStartRef.current.moved) {
        wasDraggedRef.current = true
        setTimeout(() => {
          wasDraggedRef.current = false
        }, 100)

        const isRight = upEvent.clientX > window.innerWidth / 2
        const isBottom = upEvent.clientY > window.innerHeight / 2
        const finalCorner: FloatingChatCorner = isBottom
          ? isRight
            ? 'bottom-right'
            : 'bottom-left'
          : isRight
            ? 'top-right'
            : 'top-left'

        changeCorner(finalCorner)
        setIsDragging(false)
        setDragPos(null)
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
  }

  const isTop = corner.startsWith('top')
  const isLeft = corner.endsWith('left')

  const cornerContainerClass = isTop
    ? isLeft
      ? 'top-6 left-6 items-start flex-col-reverse'
      : 'top-6 right-6 items-end flex-col-reverse'
    : isLeft
      ? 'bottom-6 left-6 items-start flex-col'
      : 'bottom-6 right-6 items-end flex-col'

  const cardOriginClass = isTop
    ? isLeft
      ? 'origin-top-left'
      : 'origin-top-right'
    : isLeft
      ? 'origin-bottom-left'
      : 'origin-bottom-right'

  return {
    containerRef,
    corner,
    isDragging,
    dragPos,
    wasDraggedRef,
    isTop,
    isLeft,
    cornerContainerClass,
    cardOriginClass,
    startDrag,
    changeCorner
  }
}
