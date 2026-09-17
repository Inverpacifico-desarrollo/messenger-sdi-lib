'use client'

import React, { createContext, useContext, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from './cn'
import { Button, ButtonProps } from './button'

interface AlertDialogContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null)

function useAlertDialog() {
  const context = useContext(AlertDialogContext)
  if (!context) {
    throw new Error('Los subcomponentes de AlertDialog deben usarse dentro de <AlertDialog>')
  }
  return context
}

export interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onOpenChange])

  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

export function AlertDialogContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open, onOpenChange } = useAlertDialog()
  const overlayRef = useRef<HTMLDivElement>(null)

  if (!open || typeof window === 'undefined') return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onOpenChange(false)
    }
  }

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className='sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150'
    >
      <div
        role='alertdialog'
        aria-modal='true'
        className={cn(
          'relative w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-5 text-neutral-900 dark:text-neutral-100 transition-all animate-in zoom-in-95 duration-150',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}

export function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-2 text-left', className)} {...props} />
}

export function AlertDialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-sm font-bold text-neutral-900 dark:text-neutral-100', className)} {...props} />
}

export function AlertDialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-xs leading-relaxed text-neutral-500 dark:text-neutral-400', className)} {...props} />
}

export function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center justify-end gap-2 mt-4', className)} {...props} />
}

export function AlertDialogCancel({
  className,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const { onOpenChange } = useAlertDialog()

  return (
    <Button
      variant='outline'
      size='sm'
      onClick={(e) => {
        onOpenChange(false)
        onClick?.(e)
      }}
      className={cn('text-xs', className)}
      {...props}
    >
      {children || 'Cancelar'}
    </Button>
  )
}

export function AlertDialogAction({
  className,
  variant = 'danger',
  size = 'sm',
  ...props
}: ButtonProps) {
  return <Button variant={variant} size={size} className={cn('text-xs font-semibold', className)} {...props} />
}
