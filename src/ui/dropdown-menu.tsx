'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { cn } from './cn'

interface DropdownContextValue {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

function useDropdown() {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('Los subcomponentes de DropdownMenu deben usarse dentro de <DropdownMenu>')
  }
  return context
}

export interface DropdownMenuProps {
  children: React.ReactNode
  className?: string
}

export function DropdownMenu({ children, className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={menuRef} className={cn('relative inline-block text-left', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export interface DropdownMenuTriggerProps {
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

export function DropdownMenuTrigger({ children, className }: DropdownMenuTriggerProps) {
  const { open, setOpen } = useDropdown()

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setOpen((prev) => !prev)
      }}
      className={cn('cursor-pointer inline-flex items-center', className)}
    >
      {children}
    </div>
  )
}

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'right' | 'end' | 'start'
}

export function DropdownMenuContent({
  align = 'end',
  className,
  children,
  ...props
}: DropdownMenuContentProps) {
  const { open } = useDropdown()

  if (!open) return null

  const alignClass = align === 'right' || align === 'end' ? 'right-0' : 'left-0'

  return (
    <div
      className={cn(
        'absolute z-50 mt-1.5 min-w-44 origin-top-right rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1.5 shadow-xl transition-all animate-in fade-in zoom-in-95 duration-100 text-neutral-900 dark:text-neutral-100',
        alignClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  destructive?: boolean
}

export function DropdownMenuItem({
  className,
  disabled,
  destructive,
  onClick,
  children,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdown()

  return (
    <div
      role='menuitem'
      onClick={(e) => {
        if (disabled) return
        setOpen(false)
        onClick?.(e)
      }}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors select-none',
        destructive
          ? 'text-red-600 hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/15'
          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:text-neutral-900 dark:hover:text-neutral-100',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn('my-1 h-px bg-neutral-100 dark:bg-neutral-800', className)} />
}
