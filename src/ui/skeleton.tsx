import React from 'react'
import { cn } from './cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80',
        className
      )}
      {...props}
    />
  )
}

export default Skeleton
