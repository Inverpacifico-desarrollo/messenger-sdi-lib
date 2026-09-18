import React from 'react'
import { cn } from './cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-neutral-900 dark:text-neutral-100',
        className
      )}
      {...props}
    />
  )
}
