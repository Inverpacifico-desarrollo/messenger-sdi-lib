'use client'

import React, { forwardRef } from 'react'
import { cn } from './cn'

export type ButtonVariant = 'default' | 'primary' | 'outline' | 'ghost' | 'secondary' | 'danger' | 'success'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', disabled, children, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer'

    const variantClasses: Record<ButtonVariant, string> = {
      default: 'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-xs',
      primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-xs',
      outline: 'border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200',
      ghost: 'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300',
      secondary: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-xs',
      success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
    }

    const sizeClasses: Record<ButtonSize, string> = {
      default: 'h-9 px-4 py-2 text-sm rounded-lg gap-2',
      sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
      lg: 'h-10 px-6 text-base rounded-xl gap-2.5',
      icon: 'size-9 p-0 rounded-lg',
      'icon-sm': 'size-8 p-0 rounded-lg'
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'ChatButton'
