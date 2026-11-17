'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { Maximize2, Mic, MicOff, PhoneOff } from 'lucide-react'
import { Avatar, cn } from '../../ui'
import type { VoiceCallState } from '../../types/voice.types'

export interface VoiceMinimizedIslandProps {
  visible: boolean
  callState: VoiceCallState
  formattedDuration: string
  isMuted: boolean
  hasPermission: boolean | null
  onToggleMute: () => void
  onMaximize: () => void
  onHangup: () => void
}

export function VoiceMinimizedIsland({
  visible,
  callState,
  formattedDuration,
  isMuted,
  hasPermission,
  onToggleMute,
  onMaximize,
  onHangup
}: VoiceMinimizedIslandProps) {
  if (!visible || typeof window === 'undefined') return null

  return createPortal(
    <div className='sdi-messenger-root fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-2 pl-3 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-2xl animate-in slide-in-from-top-4 duration-200 max-w-[95vw]'>
      {/* Avatar del Asistente (estilo Messenger) */}
      <div className='relative shrink-0'>
        <Avatar name='Asistente de Voz SDi' isBot size='sm' />
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-white animate-pulse',
            hasPermission === false
              ? 'bg-amber-500'
              : callState === 'speaking'
              ? 'bg-blue-500'
              : callState === 'listening'
              ? 'bg-emerald-500'
              : isMuted
              ? 'bg-amber-500'
              : 'bg-neutral-400'
          )}
        />
      </div>

      {/* Información del Estado y Cronómetro */}
      <div className='flex flex-col min-w-0 pr-1'>
        <div className='flex items-center gap-1.5'>
          <span className='text-xs font-bold text-neutral-900'>Asistente de Voz SDi</span>
          <span className='text-[10px] font-mono text-neutral-600 font-semibold bg-neutral-100 px-1.5 py-0.2 rounded-md'>
            {formattedDuration}
          </span>
        </div>
        <span
          className={cn(
            'text-[11px] font-medium truncate max-w-44 sm:max-w-64',
            hasPermission === false ? 'text-amber-700 font-semibold' : 'text-emerald-600'
          )}
        >
          {hasPermission === false
            ? 'Micrófono sin permiso'
            : callState === 'speaking'
            ? 'Asistente hablando...'
            : callState === 'listening'
            ? 'Te escucho...'
            : isMuted
            ? 'Micrófono en silencio'
            : 'En llamada activa'}
        </span>
      </div>

      {/* Controles Rápidos: Mute, Maximizar, Colgar */}
      <div className='flex items-center gap-1.5 pl-2 border-l border-neutral-200'>
        <button
          type='button'
          onClick={onToggleMute}
          title={isMuted ? 'Activar micrófono' : 'Silenciar micrófono'}
          className={cn(
            'size-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs',
            isMuted
              ? 'bg-amber-500 text-white'
              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
          )}
        >
          {isMuted ? <MicOff className='size-3.5' /> : <Mic className='size-3.5' />}
        </button>

        <button
          type='button'
          onClick={onMaximize}
          title='Maximizar llamada'
          className='size-8 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all cursor-pointer shadow-2xs'
        >
          <Maximize2 className='size-3.5' />
        </button>

        <button
          type='button'
          onClick={onHangup}
          title='Finalizar llamada'
          className='size-8 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white shadow-xs cursor-pointer active:scale-95 transition-all'
        >
          <PhoneOff className='size-3.5' />
        </button>
      </div>
    </div>,
    document.body
  )
}
