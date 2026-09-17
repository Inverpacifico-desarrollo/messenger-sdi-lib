'use client'

import React from 'react'
import { AlertTriangle, Loader2, MessageCircle, X } from 'lucide-react'
import { cn } from '../../../ui'

interface FloatingChatButtonProps {
  isOpen: boolean
  totalUnreadCount: number
  isLeft: boolean
  isLoading?: boolean
  hasError?: boolean
  onToggleOpen: () => void
  onPointerDown: (e: React.PointerEvent) => void
}

export function FloatingChatButton({
  isOpen,
  totalUnreadCount,
  isLeft,
  isLoading = false,
  hasError = false,
  onToggleOpen,
  onPointerDown
}: FloatingChatButtonProps) {
  const getButtonBgClass = () => {
    if (isOpen) {
      return 'bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rotate-90 shadow-2xl'
    }
    if (hasError) {
      return 'bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-400/40 shadow-rose-500/30'
    }
    if (isLoading) {
      return 'bg-blue-600/90 text-white'
    }
    return 'bg-blue-600 hover:bg-blue-700 text-white'
  }

  const getAriaLabel = () => {
    if (isOpen) return 'Cerrar chat de soporte'
    if (hasError) return 'Error de conexión en el chat (Haz clic para ver detalles o reintentar)'
    if (isLoading) return 'Conectando al chat de soporte...'
    if (totalUnreadCount > 0) {
      return `Abrir chat de soporte (${totalUnreadCount} mensaje${totalUnreadCount === 1 ? '' : 's'} sin leer)`
    }
    return 'Abrir chat de soporte'
  }

  return (
    <div
      onPointerDown={onPointerDown}
      className='pointer-events-auto relative touch-none'
    >
      <button
        type='button'
        onClick={onToggleOpen}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full cursor-grab active:cursor-grabbing shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40',
          getButtonBgClass()
        )}
        aria-label={getAriaLabel()}
        title={getAriaLabel()}
      >
        {isOpen ? (
          <X className='size-6 transition-transform duration-200 text-white' />
        ) : hasError ? (
          <div className='relative flex items-center justify-center animate-in zoom-in-75 duration-200'>
            <AlertTriangle className='size-6 transition-transform duration-200 text-white' />
          </div>
        ) : isLoading ? (
          <div className='relative flex items-center justify-center'>
            <Loader2 className='size-6 animate-spin text-white' />
          </div>
        ) : (
          <div className='relative flex items-center justify-center'>
            <MessageCircle className='size-6 transition-transform duration-200' />
          </div>
        )}
      </button>

      {/* Indicador Badge de Error si no está abierto */}
      {!isOpen && hasError && (
        <span
          className={cn(
            'absolute -top-1 flex size-5 items-center justify-center rounded-full bg-rose-700 text-white shadow-lg ring-2 ring-white dark:ring-neutral-900 pointer-events-none animate-in zoom-in duration-200',
            isLeft ? '-left-1' : '-right-1'
          )}
          title='Error de conexión'
        >
          <span className='absolute -top-0.5 -right-0.5 -bottom-0.5 -left-0.5 rounded-full bg-rose-500/50 animate-ping pointer-events-none' />
          <span className='text-[10px] font-bold'>!</span>
        </span>
      )}

      {/* Badge Indicador de mensajes sin leer sobre el FAB si no hay error */}
      {!isOpen && !hasError && totalUnreadCount > 0 && (
        <span
          className={cn(
            'absolute -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-bold text-white shadow-lg ring-2 ring-white dark:ring-neutral-900 pointer-events-none animate-in zoom-in duration-200',
            isLeft ? '-left-1' : '-right-1'
          )}
          title={`${totalUnreadCount} mensaje${totalUnreadCount === 1 ? '' : 's'} sin leer`}
        >
          <span className='absolute -top-0.5 -right-0.5 -bottom-0.5 -left-0.5 rounded-full bg-red-500/40 animate-ping pointer-events-none' />
          <span className='relative z-10'>
            {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
          </span>
        </span>
      )}
    </div>
  )
}
