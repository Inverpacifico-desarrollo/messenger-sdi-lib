'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, X, WifiOff } from 'lucide-react'
import { Button } from '../../../ui'

interface FloatingChatErrorViewProps {
  error?: Error | null
  onRetry?: () => void
  onClose?: () => void
  onDragStart?: (e: React.PointerEvent) => void
}

export function FloatingChatErrorView({
  error,
  onRetry,
  onClose,
  onDragStart
}: FloatingChatErrorViewProps) {
  const errorMessage =
    error?.message || 'No se pudo inicializar la conexión con el servidor de chat.'

  return (
    <div className='flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden'>
      {/* Cabecera */}
      <div
        onPointerDown={onDragStart}
        className='relative shrink-0 overflow-hidden bg-red-600 px-4 py-4 text-white flex items-center justify-between cursor-grab active:cursor-grabbing touch-none select-none'
      >
        <div className='flex items-center gap-2'>
          <AlertTriangle className='size-5' />
          <span className='text-xs font-bold'>Error de Conexión</span>
        </div>
        {onClose && (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onClose}
            className='size-7 rounded-full p-0 text-white/80 hover:bg-white/20 hover:text-white cursor-pointer'
          >
            <X className='size-4' />
          </Button>
        )}
      </div>

      {/* Contenido del Error */}
      <div className='flex-1 min-h-0 p-6 flex flex-col items-center justify-center text-center space-y-4'>
        <div className='size-14 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-xs'>
          <WifiOff className='size-7' />
        </div>

        <div className='space-y-1.5 max-w-xs'>
          <h4 className='text-sm font-bold text-neutral-900 dark:text-neutral-100'>
            No se pudo conectar al Chat
          </h4>
          <p className='text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed'>
            {errorMessage}
          </p>
        </div>

        <div className='pt-2 flex items-center gap-2'>
          <Button
            type='button'
            variant='primary'
            size='sm'
            onClick={() => {
              if (onRetry) {
                onRetry()
              } else {
                window.location.reload()
              }
            }}
            className='h-8 gap-1.5 px-3.5 text-xs font-semibold cursor-pointer'
          >
            <RefreshCw className='size-3.5' />
            <span>Reintentar conexión</span>
          </Button>
          {onClose && (
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={onClose}
              className='h-8 px-3 text-xs cursor-pointer'
            >
              <span>Cerrar</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FloatingChatErrorView
