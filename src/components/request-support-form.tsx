'use client'

import React, { useState } from 'react'
import { Button, Input, Textarea, cn } from '../ui'
import {
  Headphones,
  Send,
  Loader2,
  FileText,
  MessageSquare,
  Sparkles,
  AlertCircle
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

const SUGGESTED_SUBJECTS = [
  'Problema con mi cuenta',
  'Error en punto de venta / terminal',
  'Problema de facturación o pago',
  'Consulta general de soporte'
]

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
      setValidationError('Por favor ingresa el asunto de tu requerimiento.')
      return
    }

    if (!trimmedMessage) {
      setValidationError('Por favor describe tu problema o consulta en el mensaje.')
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

  const handleSelectSuggestedSubject = (suggested: string) => {
    setSubject(suggested)
    setValidationError(null)
  }

  return (
    <form onSubmit={handleSubmit} className='sdi-messenger-root flex flex-col h-full w-full'>
      <div className='flex-1 overflow-y-auto p-4 space-y-4 text-neutral-800 dark:text-neutral-100'>
        {/* Encabezado contextual */}
        <div className='rounded-xl border border-blue-100 dark:border-blue-950/60 bg-blue-50/70 dark:bg-blue-950/20 p-3 text-xs'>
          <div className='flex items-center gap-2 font-semibold text-blue-800 dark:text-blue-300'>
            <Sparkles className='size-4 text-blue-600 dark:text-blue-400 shrink-0' />
            <span>Asistencia en tiempo real</span>
          </div>
          <p className='mt-1 text-[11px] text-blue-900/80 dark:text-blue-300/80 leading-relaxed'>
            {userName ? (
              <>Hola <strong className='font-semibold'>{userName}</strong>, ingresa los datos a continuación para conectarte con un técnico de soporte.</>
            ) : (
              'Ingresa los datos para solicitar asistencia técnica inmediata con un técnico de soporte.'
            )}
          </p>
        </div>

        {/* Mensaje de error si ocurre */}
        {(validationError || error) && (
          <div className='flex items-start gap-2 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 p-2.5 text-xs text-rose-700 dark:text-rose-300'>
            <AlertCircle className='size-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400' />
            <span>{validationError || error}</span>
          </div>
        )}

        {/* Campo: Asunto */}
        <div className='space-y-1.5'>
          <label className='flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300'>
            <FileText className='size-3.5 text-blue-600 dark:text-blue-400' />
            <span>Asunto / Motivo</span>
            <span className='text-rose-500'>*</span>
          </label>
          <Input
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value)
              if (validationError) setValidationError(null)
            }}
            placeholder='Ej: Necesito ayuda con mi cuenta'
            disabled={isSubmitting}
            maxLength={150}
            className='bg-neutral-50/70 dark:bg-neutral-800/60 focus:bg-white dark:focus:bg-neutral-900'
          />

          {/* Sugerencias Rápidas */}
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
        </div>

        {/* Campo: Mensaje / Detalle */}
        <div className='space-y-1.5'>
          <label className='flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300'>
            <MessageSquare className='size-3.5 text-blue-600 dark:text-blue-400' />
            <span>Detalle de tu problema o consulta</span>
            <span className='text-rose-500'>*</span>
          </label>
          <Textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              if (validationError) setValidationError(null)
            }}
            placeholder='Hola, tengo un problema y necesito asistencia...'
            rows={4}
            disabled={isSubmitting}
            maxLength={1000}
            className='min-h-24 bg-neutral-50/70 dark:bg-neutral-800/60 focus:bg-white dark:focus:bg-neutral-900 text-xs'
          />
          <div className='flex justify-between items-center text-[10px] text-neutral-400'>
            <span>Sé lo más detallado posible</span>
            <span>{message.length}/1000</span>
          </div>
        </div>
      </div>

      {/* Botones de acción Footer */}
      <div className='shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/60 dark:bg-neutral-900/60 flex items-center gap-2'>
        {onCancel && (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={onCancel}
            disabled={isSubmitting}
            className='text-xs text-neutral-600 dark:text-neutral-400'
          >
            Cancelar
          </Button>
        )}
        <Button
          type='submit'
          variant='primary'
          size='sm'
          disabled={isSubmitting}
          className='flex-1 gap-1.5 h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm cursor-pointer'
        >
          {isSubmitting ? (
            <>
              <Loader2 className='size-4 animate-spin' />
              <span>Conectando con soporte...</span>
            </>
          ) : (
            <>
              <Headphones className='size-4' />
              <span>Iniciar Asistencia</span>
              <Send className='size-3.5 ml-0.5 opacity-80' />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

export default RequestSupportForm
