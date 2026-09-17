'use client'

import React from 'react'
import { Button, Badge } from '../ui'
import {
  CheckCircle2,
  Clock,
  Ticket as TicketIcon,
  RotateCcw,
  MessagesSquare,
  ShieldCheck,
  X
} from 'lucide-react'
import { ChatSupportTicket } from '../types/chat-support.types'

interface SupportNoTechnicianViewProps {
  message?: string
  ticket?: ChatSupportTicket | null
  onNewRequest: () => void
  onViewChats?: () => void
  onClose?: () => void
  canViewChatList?: boolean
}

export function SupportNoTechnicianView({
  message = 'Tu solicitud de soporte ha sido registrada exitosamente. En este momento no hay técnicos disponibles en línea; un técnico atenderá tu requerimiento a la brevedad.',
  ticket,
  onNewRequest,
  onViewChats,
  onClose,
  canViewChatList = false
}: SupportNoTechnicianViewProps) {
  const ticketDisplayNumber = ticket?.number ?? ticket?.id ?? 'N/A'

  return (
    <div className='sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900 overflow-hidden'>
      {/* Barra superior */}
      <div className='flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 bg-neutral-50/70 dark:bg-neutral-900'>
        <div className='flex items-center gap-2'>
          <ShieldCheck className='size-4 text-emerald-600 dark:text-emerald-400' />
          <span className='text-xs font-bold text-neutral-800 dark:text-neutral-200'>
            Solicitud Registrada
          </span>
        </div>
        {onClose && (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={onClose}
            className='size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
          >
            <X className='size-3.5' />
          </Button>
        )}
      </div>

      {/* Contenido Principal */}
      <div className='flex-1 min-h-0 overflow-y-auto p-4 flex flex-col justify-center items-center text-center space-y-4'>
        {/* Ícono de Estado */}
        <div className='relative flex items-center justify-center'>
          <div className='size-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs'>
            <Clock className='size-7' />
          </div>
          <div className='absolute -bottom-1 -right-1 size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm'>
            <CheckCircle2 className='size-3.5' />
          </div>
        </div>

        {/* Título & Mensaje del Servidor */}
        <div className='space-y-1.5 max-w-xs'>
          <h4 className='text-sm font-bold text-neutral-900 dark:text-neutral-100'>
            Ticket de Soporte Creado
          </h4>
          <p className='text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed'>
            {message}
          </p>
        </div>

        {/* Tarjeta de Resumen del Ticket */}
        {ticket && (
          <div className='w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 p-3 text-left space-y-2.5 text-xs shadow-2xs'>
            <div className='flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-700/50 pb-2'>
              <div className='flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200'>
                <TicketIcon className='size-3.5 text-blue-600 dark:text-blue-400' />
                <span>Ticket #{ticketDisplayNumber}</span>
              </div>
              <Badge variant='outline' className='text-[10px] uppercase font-semibold px-1.5 py-0 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'>
                {ticket.status === 'created' ? 'Registrado' : ticket.status}
              </Badge>
            </div>

            {ticket.subject && (
              <div className='space-y-0.5'>
                <span className='text-[10.5px] font-medium text-neutral-400'>Asunto:</span>
                <p className='text-xs font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2'>
                  {ticket.subject}
                </p>
              </div>
            )}

            <div className='flex items-center justify-between text-[11px] text-neutral-500 pt-1'>
              <span>Canal: <strong className='font-medium text-neutral-700 dark:text-neutral-300'>{ticket.request_source || 'Chat'}</strong></span>
              <span className='flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[10.5px] font-medium'>
                <span className='size-1.5 rounded-full bg-emerald-500 animate-pulse' />
                En cola de atención
              </span>
            </div>
          </div>
        )}

        <div className='rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 p-2.5 text-[11px] text-blue-900/80 dark:text-blue-300/80 text-left w-full'>
          <p>
            Te notificaremos en cuanto un técnico tome tu ticket. Puedes consultar el estado en cualquier momento.
          </p>
        </div>
      </div>

      {/* Acciones Footer */}
      <div className='shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900 flex items-center gap-2'>
        <Button
          type='button'
          variant='secondary'
          size='sm'
          onClick={onNewRequest}
          className='flex-1 gap-1.5 text-xs font-medium cursor-pointer'
        >
          <RotateCcw className='size-3.5' />
          <span>Nueva Consulta</span>
        </Button>

        {canViewChatList && onViewChats && (
          <Button
            type='button'
            variant='primary'
            size='sm'
            onClick={onViewChats}
            className='flex-1 gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
          >
            <MessagesSquare className='size-3.5' />
            <span>Ver mis chats</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default SupportNoTechnicianView
