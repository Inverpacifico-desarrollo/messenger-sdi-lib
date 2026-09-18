'use client'

import React, { useState } from 'react'
import { Button, Input, Textarea, cn } from '../ui'
import {
  SendHorizontal,
  Loader2,
  AlertCircle,
  LifeBuoy,
  MessageSquare,
  Tag,
  ShieldCheck
} from 'lucide-react'
import { RequestChatSupportPayload } from '../types/chat-support.types'

export interface RequestSupportFormProps {
  userId: number | string
  userName?: string
  onSubmit: (payload: RequestChatSupportPayload) => Promise<void> | void
  isSubmitting?: boolean
  error?: string | null
  onCancel?: () => void
}

/*
const SUGGESTED_SUBJECTS = [
  'Problema con mi cuenta',
  'Error en punto de venta / terminal',
  'Problema de facturación o pago',
  'Consulta general de soporte'
]
*/

export function RequestSupportForm({
  userId,
  userName,
  onSubmit,
  isSubmitting = false,
  error = null,
  onCancel
}: RequestSupportFormProps) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)

    const trimmedSubject = subject.trim()
    const trimmedMessage = message.trim()

    if (!trimmedSubject) {
      setValidationError('Por favor ingresa el asunto de tu solicitud.')
      return
    }

    if (!trimmedMessage) {
      setValidationError('Por favor describe el detalle de tu consulta.')
      return
    }

    if (!userId) {
      setValidationError('No se pudo identificar el usuario actual para la solicitud.')
      return
    }

    onSubmit({
      subject: trimmedSubject,
      message: trimmedMessage,
      user_id: userId
    })
  }

  /*
  const handleSelectSuggestedSubject = (suggested: string) => {
    setSubject(suggested)
    setValidationError(null)
  }
  */

  return (
    <form onSubmit={handleSubmit} className='sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900'>
      <div className='flex-1 overflow-y-auto p-4 space-y-4 text-neutral-800 dark:text-neutral-100'>
        {/* Tarjeta de Encabezado / Contexto */}
        <div className='rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-gradient-to-b from-neutral-50/90 to-white dark:from-neutral-800/50 dark:to-neutral-900/50 p-3.5 shadow-2xs space-y-2'>
          <div className='flex items-center gap-2.5'>
            <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'>
              <LifeBuoy className='size-4.5' />
            </div>
            <div className='min-w-0 flex-1'>
              <div className='flex items-center gap-1.5'>
                <h4 className='text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate'>
                  {userName ? `Hola, ${userName}` : 'Nueva solicitud de soporte'}
                </h4>
                <span className='inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 text-[9.5px] font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40'>
                  <span className='size-1.5 rounded-full bg-emerald-500 animate-pulse' />
                  En línea
                </span>
              </div>
              <p className='text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug'>
                Completa los datos para asignarte un técnico de soporte.
              </p>
            </div>
          </div>
        </div>

        {/* Mensaje de error si ocurre */}
        {(validationError || error) && (
          <div className='flex items-start gap-2.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300 shadow-2xs'>
            <AlertCircle className='size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400' />
            <div className='flex-1 leading-snug'>
              <span className='font-medium'>Error en el formulario:</span> {validationError || error}
            </div>
          </div>
        )}

        {/* Campo: Asunto */}
        <div className='space-y-1.5'>
          <label className='flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300'>
            <Tag className='size-3.5 text-neutral-400' />
            <span>Asunto de la consulta</span>
            <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <Input
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value)
                if (validationError) setValidationError(null)
              }}
              placeholder='Ej: Consulta sobre configuración o reporte de falla'
              disabled={isSubmitting}
              maxLength={150}
              className='h-9.5 bg-neutral-50/60 hover:bg-white focus:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus:bg-neutral-900 border-neutral-200 dark:border-neutral-800 focus:border-blue-500 rounded-lg text-xs transition-colors'
            />
          </div>

          {/* Temas frecuentes comentados
          <div className='pt-1'>
            <p className='text-[10px] text-neutral-400 dark:text-neutral-500 font-medium mb-1'>
              Temas frecuentes:
            </p>
            <div className='flex flex-wrap gap-1'>
              {SUGGESTED_SUBJECTS.map((item) => (
                <button
                  key={item}
                  type='button'
                  onClick={() => handleSelectSuggestedSubject(item)}
                  disabled={isSubmitting}
                  className={cn(
                    'text-[10.5px] px-2 py-0.5 rounded-md border text-left transition-colors cursor-pointer',
                    subject === item
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-300 font-medium'
                      : 'border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-800/40 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-200'
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          */}
        </div>

        {/* Campo: Mensaje / Detalle */}
        <div className='space-y-1.5'>
          <label className='flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300'>
            <MessageSquare className='size-3.5 text-neutral-400' />
            <span>Detalle o descripción</span>
            <span className='text-red-500'>*</span>
          </label>
          <div className='relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 hover:bg-white focus-within:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus-within:bg-neutral-900 focus-within:border-blue-500 transition-colors'>
            <Textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                if (validationError) setValidationError(null)
              }}
              placeholder='Describe lo más claro posible tu duda o problema...'
              rows={4}
              disabled={isSubmitting}
              maxLength={1000}
              className='min-h-24 w-full border-0 bg-transparent p-3 text-xs focus:ring-0 focus-visible:ring-0 shadow-none resize-none'
            />
            <div className='flex items-center justify-between px-3 pb-2 pt-1 border-t border-neutral-100 dark:border-neutral-800/60 text-[10px] text-neutral-400 dark:text-neutral-500'>
              <span>Proporciona detalles específicos</span>
              <span className='font-mono'>{message.length}/1000</span>
            </div>
          </div>
        </div>

        {/* Nota informativa al pie */}
        <div className='flex items-start gap-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 p-2.5 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed'>
          <ShieldCheck className='size-4 shrink-0 text-neutral-400 mt-0.5' />
          <span>
            Tu solicitud creará automáticamente una conversación y se notificará al equipo de asistencia.
          </span>
        </div>
      </div>

      {/* Botones de acción Footer */}
      <div className='shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900/80 flex items-center justify-between gap-2'>
        <div>
          {onCancel && (
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={onCancel}
              disabled={isSubmitting}
              className='text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 cursor-pointer'
            >
              Cancelar
            </Button>
          )}
        </div>
        <Button
          type='submit'
          variant='primary'
          size='sm'
          disabled={isSubmitting || !subject.trim() || !message.trim()}
          className='gap-2 h-9 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
        >
          {isSubmitting ? (
            <>
              <Loader2 className='size-3.5 animate-spin' />
              <span>Enviando solicitud...</span>
            </>
          ) : (
            <>
              <span>Iniciar soporte</span>
              <SendHorizontal className='size-3.5' />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

export default RequestSupportForm

