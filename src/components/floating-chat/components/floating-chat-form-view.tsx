'use client'

import React from 'react'
import { ArrowLeft, MessagesSquare, X } from 'lucide-react'
import { Button } from '../../../ui'
import { RequestSupportForm } from '../../request-support-form'
import { ConversationsUserFooter } from '../../conversations-user-footer'
import type { RequestChatSupportPayload } from '../../../types/chat-support.types'

interface FloatingChatFormViewProps {
  userId?: string | number
  userName: string
  canViewChatList: boolean
  totalUnreadCount: number
  isSubmitting: boolean
  error?: string
  onHome: () => void
  onViewChats: () => void
  onClose: () => void
  onSubmit: (payload: RequestChatSupportPayload) => Promise<void>
  onNewConversation: () => void
  onDragStart: (e: React.PointerEvent) => void
}

export function FloatingChatFormView({
  userId,
  userName,
  canViewChatList,
  totalUnreadCount,
  isSubmitting,
  error,
  onHome,
  onViewChats,
  onClose,
  onSubmit,
  onNewConversation,
  onDragStart
}: FloatingChatFormViewProps) {
  return (
    <div className='flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden'>
      {/* Cabecera del Formulario - Arrastrable */}
      <div
        onPointerDown={onDragStart}
        className='relative shrink-0 overflow-hidden bg-blue-600 px-3.5 py-4 text-white cursor-grab active:cursor-grabbing touch-none select-none'
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onHome}
              className='h-7 gap-1 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer'
            >
              <ArrowLeft className='size-3.5' />
              <span>Inicio</span>
            </Button>
            <span className='text-xs font-bold text-white'>Solicitar Asistencia</span>
          </div>
          <div className='flex items-center gap-1'>
            {canViewChatList && (
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onPointerDown={(e) => e.stopPropagation()}
                onClick={onViewChats}
                title='Ver mis chats'
                className='relative h-7 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer gap-1'
              >
                <MessagesSquare className='size-3.5' />
                <span className='hidden sm:inline text-[11px] font-medium'>Mis chats</span>
                {totalUnreadCount > 0 && (
                  <span className='flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-xs'>
                    {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
                  </span>
                )}
              </Button>
            )}
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onClose}
              className='size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer'
            >
              <X className='size-4' />
            </Button>
          </div>
        </div>
      </div>

      {/* Formulario de Solicitud */}
      <div className='flex-1 min-h-0 overflow-hidden flex flex-col'>
        {userId && (
          <RequestSupportForm
            userId={userId}
            userName={userName}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            error={error}
            onCancel={onHome}
          />
        )}
      </div>

      {/* Footer con usuario autenticado */}
      <ConversationsUserFooter onNewConversation={onNewConversation} />
    </div>
  )
}
