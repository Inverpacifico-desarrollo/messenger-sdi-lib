'use client'

import React from 'react'
import { Skeleton } from '../../../ui'

export function FloatingChatSkeleton({
  onDragStart
}: {
  onDragStart?: (e: React.PointerEvent) => void
}) {
  return (
    <div className='flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden'>
      {/* Cabecera Shimmer */}
      <div
        onPointerDown={onDragStart}
        className='relative shrink-0 overflow-hidden bg-blue-600 px-4.5 py-6 text-white cursor-grab active:cursor-grabbing touch-none select-none'
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2.5'>
            <Skeleton className='size-9 rounded-xl bg-white/20' />
            <div className='space-y-1.5'>
              <Skeleton className='h-3.5 w-32 bg-white/30' />
              <Skeleton className='h-2.5 w-24 bg-white/20' />
            </div>
          </div>
          <Skeleton className='size-7 rounded-full bg-white/20' />
        </div>

        <div className='mt-4 space-y-1.5'>
          <Skeleton className='h-3 w-48 bg-white/30' />
          <Skeleton className='h-2.5 w-64 bg-white/20' />
        </div>
      </div>

      {/* Opciones de Entrada Skeleton */}
      <div className='flex-1 min-h-0 overflow-y-auto p-4 space-y-3'>
        {/* Tarjeta 1 */}
        <div className='flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5'>
          <div className='flex items-center gap-3'>
            <Skeleton className='size-10 rounded-xl' />
            <div className='space-y-1.5'>
              <Skeleton className='h-3.5 w-28' />
              <Skeleton className='h-2.5 w-44' />
            </div>
          </div>
          <Skeleton className='size-4 rounded-md' />
        </div>

        {/* Tarjeta 2 */}
        <div className='flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5'>
          <div className='flex items-center gap-3'>
            <Skeleton className='size-10 rounded-xl' />
            <div className='space-y-1.5'>
              <Skeleton className='h-3.5 w-24' />
              <Skeleton className='h-2.5 w-48' />
            </div>
          </div>
          <Skeleton className='size-4 rounded-md' />
        </div>

        {/* Mensaje Informativo Skeleton */}
        <div className='rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/20 p-3 mt-4 space-y-2'>
          <div className='flex items-center gap-2'>
            <Skeleton className='size-3.5 rounded-full' />
            <Skeleton className='h-3 w-32' />
          </div>
          <Skeleton className='h-2.5 w-full' />
          <Skeleton className='h-2.5 w-3/4' />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className='shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5'>
        <div className='flex items-center gap-2.5 flex-1'>
          <Skeleton className='size-8 rounded-full' />
          <div className='space-y-1.5 flex-1'>
            <Skeleton className='h-3 w-24' />
            <Skeleton className='h-2.5 w-36' />
          </div>
        </div>
        <Skeleton className='size-8 rounded-lg' />
      </div>
    </div>
  )
}

export default FloatingChatSkeleton
