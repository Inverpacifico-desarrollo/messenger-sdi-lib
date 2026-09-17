'use client'

import React, { forwardRef } from 'react'
import { cn } from './cn'

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0)_transparent] [transition:scrollbar-color_200ms_ease] hover:[scrollbar-color:rgba(156,163,175,0.7)_transparent]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ScrollArea.displayName = 'ChatScrollArea'
