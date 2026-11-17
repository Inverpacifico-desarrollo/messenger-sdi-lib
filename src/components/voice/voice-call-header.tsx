'use client'

import React from 'react'
import { Bot, Clock, Loader2, MapPin, Minimize2, Ticket } from 'lucide-react'
import { cn } from '../../ui'
import type { VoiceCallContextBadges, VoiceCallState } from '../../types/voice.types'

export interface VoiceCallHeaderProps {
  callState: VoiceCallState
  isConnecting: boolean
  isEnded: boolean
  formattedDuration: string
  contextBadges: VoiceCallContextBadges
  onMinimize: () => void
}

export function VoiceCallHeader({
  callState,
  isConnecting,
  isEnded,
  formattedDuration,
  contextBadges,
  onMinimize
}: VoiceCallHeaderProps) {
  const isReconnecting = callState === 'reconnecting'

  return (
    <div className='flex items-center justify-between p-5 pb-3 border-b border-neutral-100 bg-white'>
      <div className='flex items-center gap-3 min-w-0'>
        {/* Avatar Bot Circular Violeta */}
        <div className='relative shrink-0'>
          <div className='flex size-11 items-center justify-center rounded-full bg-violet-600 text-white shadow-xs'>
            <Bot className='size-6' />
          </div>
          <span
            className={cn(
              'absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-white',
              isConnecting
                ? 'bg-blue-500 animate-ping'
                : isReconnecting
                ? 'bg-amber-500 animate-ping'
                : isEnded
                ? 'bg-neutral-400'
                : 'bg-emerald-500 animate-pulse'
            )}
          />
        </div>

        {/* Título, Badges y Subtítulo */}
        <div className='flex flex-col min-w-0'>
          <div className='flex items-center gap-2 flex-wrap'>
            <h2 className='text-base font-bold text-neutral-900 leading-tight'>
              Asistente de Voz SDi
            </h2>
            {isEnded ? (
              <span className='inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200'>
                FINALIZADA
              </span>
            ) : isConnecting ? (
              <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-200/80'>
                <Loader2 className='size-2.5 animate-spin' />
                <span>CONECTANDO...</span>
              </span>
            ) : isReconnecting ? (
              <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80'>
                <Loader2 className='size-2.5 animate-spin' />
                <span>RECONECTANDO...</span>
              </span>
            ) : (
              <span className='inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/80'>
                EN VIVO
              </span>
            )}

            {contextBadges.ticketNumber && !isConnecting && !isEnded && (
              <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80'>
                <Ticket className='size-2.5 text-amber-500' />
                <span>Ticket #{contextBadges.ticketNumber}</span>
              </span>
            )}

            {contextBadges.posLocation && !isConnecting && !isEnded && (
              <span className='hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200/80 max-w-44 truncate'>
                <MapPin className='size-2.5 text-blue-500 shrink-0' />
                <span className='truncate'>{contextBadges.posLocation}</span>
              </span>
            )}
          </div>
          <p className='text-xs text-neutral-400 mt-0.5 truncate'>
            {isEnded
              ? 'Resumen de atención completada'
              : isConnecting
              ? 'Estableciendo canal telefónico interactivo...'
              : 'Canal telefónico full-duplex de baja latencia'}
          </p>
        </div>
      </div>

      {/* Acciones de Cabecera: Cronómetro y Minimizar */}
      {!isConnecting && (
        <div className='flex items-center gap-2 shrink-0'>
          <div className='flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-neutral-50/80 px-3 py-1.5 text-xs font-mono font-semibold text-neutral-700 shadow-2xs'>
            <Clock className='size-3.5 text-neutral-500' />
            <span>{formattedDuration}</span>
          </div>

          {!isEnded && (
            <button
              type='button'
              onClick={onMinimize}
              title='Minimizar llamada'
              aria-label='Minimizar llamada'
              className='flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 hover:border-neutral-300 shadow-2xs transition-all cursor-pointer'
            >
              <Minimize2 className='size-3.5 text-neutral-500' />
              <span className='hidden sm:inline text-[11px] font-medium'>Minimizar</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
