'use client'

import React from 'react'
import { AlertTriangle, MessageSquarePlus, RefreshCw, Lock } from 'lucide-react'
import { Button } from '../ui'
import { useChatContext } from '../context/chat-context'
import { useCheckHasPermissionMessenger } from '../hooks/use-check-has-permission-messenger'

interface ConversationEmptyStateProps {
  onNewConversation?: () => void
}

export function ConversationEmptyState({ onNewConversation }: ConversationEmptyStateProps) {
  const { hasError, error, isLoadingUser } = useChatContext()
  const hasReadPermission = useCheckHasPermissionMessenger({
    permission: ['messenger_chat.read']
  })
  const hasCreatePermission = useCheckHasPermissionMessenger({
    permission: ['messenger_chat_support.provide_support']
  })

  if (hasError) {
    return (
      <div className=' sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'>
        <div className='absolute inset-x-0 top-0 h-1 bg-red-500/30' />
        <div className='flex max-w-md flex-col items-center px-6 text-center animate-in fade-in duration-200'>
          <div className='mb-5 flex size-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 shadow-xs'>
            <AlertTriangle className='size-8' />
          </div>
          <p className='mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400'>
            Servicio no disponible
          </p>
          <h2 className='text-base font-bold text-neutral-900 dark:text-neutral-100'>
            Error de conexión
          </h2>
          <p className='mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400'>
            {error?.message ||
              'No fue posible conectar con el servidor de chat. Las funciones de mensajería están temporalmente deshabilitadas.'}
          </p>
          <Button
            type='button'
            variant='primary'
            className='mt-6 gap-1.5 cursor-pointer shadow-xs'
            onClick={() => window.location.reload()}
          >
            <RefreshCw className='size-4' />
            Reintentar conexión
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className=' sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#f4f6f8] dark:bg-[#0a0f1d] shadow-xs'>

      <div className='relative z-10 flex max-w-md flex-col items-center px-6 text-center'>
        <div className='mb-5 flex size-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-xs'>
          <MessageSquarePlus className='size-8' />
        </div>
        <p className='mb-2 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400'>
          Bandeja de conversaciones
        </p>
        <h2 className='text-base font-bold text-neutral-900 dark:text-neutral-100'>
          Selecciona una conversación
        </h2>
        <p className='mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400'>
          {hasReadPermission
            ? 'Elige una conversación del panel lateral para ver sus mensajes o inicia una nueva cuando estés listo.'
            : 'No cuentas con permisos para ver la lista de conversaciones.'}
        </p>
        {onNewConversation && !isLoadingUser && hasCreatePermission && (
          <Button
            type='button'
            variant='outline'
            className='mt-6 gap-1.5 cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-colors'
            onClick={onNewConversation}
          >
            <MessageSquarePlus className='size-4' />
            Nueva conversación
          </Button>
        )}
      </div>
    </div>
  )
}
