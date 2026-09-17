'use client'

import React from 'react'
import { cn } from './cn'

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive' | 'success'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const baseClasses =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors'

  const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900',
    secondary: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200',
    outline: 'border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300',
    destructive: 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20',
    success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
  }

  return (
    <span className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {children}
    </span>
  )
}
