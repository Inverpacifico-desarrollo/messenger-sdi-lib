'use client'

import React from 'react'
import { Bot, CheckCircle2, Clock, Ticket } from 'lucide-react'
import { Button } from '../../ui'
import type { VoiceCallContextBadges } from '../../types/voice.types'

export interface VoiceCallEndedSummaryProps {
  formattedDuration: string
  transcriptsCount: number
  outcomeType: string
  contextBadges: VoiceCallContextBadges
  onClose: () => void
}

export function VoiceCallEndedSummary({
  formattedDuration,
  transcriptsCount,
  outcomeType,
  contextBadges,
  onClose
}: VoiceCallEndedSummaryProps) {
  const isEscalated = outcomeType.startsWith('escalated')
  const isResolved = outcomeType === 'resolved'

  return (
    <div className='flex flex-1 flex-col items-center justify-center text-center p-8 min-h-[350px] animate-in fade-in zoom-in-95 duration-200'>
      <div className='relative mb-4'>
        <div className='flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-md'>
          <CheckCircle2 className='size-8 text-emerald-600' />
        </div>
        <span className='absolute inset-0 rounded-full bg-emerald-500/15 animate-ping' />
      </div>

      <h3 className='text-lg font-bold text-neutral-900'>Llamada finalizada</h3>
      <p className='text-xs text-neutral-500 mt-1 max-w-xs leading-relaxed'>
        {isEscalated
          ? 'Tu caso ha sido escalado con un especialista. La transcripción y el ticket han quedado registrados.'
          : isResolved
          ? '¡Caso resuelto con éxito! La atención con el Asistente Virtual SDi ha concluido.'
          : 'Gracias por comunicarte. La atención con el Asistente Virtual SDi ha concluido con éxito.'}
      </p>

      {/* Resumen de Métricas de la Llamada */}
      <div className='mt-5 flex items-center justify-center gap-2 flex-wrap max-w-sm'>
        <div className='flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-1.5 text-xs text-neutral-700 shadow-2xs font-medium'>
          <Clock className='size-3.5 text-neutral-500' />
          <span>
            Duración: <strong className='font-mono text-neutral-900'>{formattedDuration}</strong>
          </span>
        </div>

        <div className='flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-1.5 text-xs text-neutral-700 shadow-2xs font-medium'>
          <Bot className='size-3.5 text-violet-600' />
          <span>
            <strong className='text-neutral-900'>{transcriptsCount}</strong> intervenciones
          </span>
        </div>

        {contextBadges.ticketNumber && (
          <div className='flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-1.5 text-xs text-amber-700 shadow-2xs font-medium'>
            <Ticket className='size-3.5 text-amber-600' />
            <span>
              Ticket <strong className='text-amber-800'>#{contextBadges.ticketNumber}</strong>
            </span>
          </div>
        )}
      </div>

      <p className='text-[11px] text-neutral-400 mt-3'>
        El registro de la llamada se encuentra disponible en tu conversación.
      </p>

      <div className='mt-5'>
        <Button
          type='button'
          variant='primary'
          onClick={onClose}
          className='h-10 px-6 text-xs sm:text-sm font-semibold rounded-xl shadow-xs cursor-pointer'
        >
          Aceptar y cerrar
        </Button>
      </div>
    </div>
  )
}
