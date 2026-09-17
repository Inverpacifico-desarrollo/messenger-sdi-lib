'use client'

import React from 'react'
import { Avatar, cn } from '../ui'
import { CheckCheck, Clock, Download, FileText } from 'lucide-react'
import type { Message, MessageAttachment } from '../types/message.types'
import { capitalizeWords } from '../utils/conversation.util'

interface ConversationMessageItemProps {
  message: Message
  isOwnMessage: boolean
  isGroup: boolean
  conversationName: string
  conversationAvatarUrl?: string
}

function formatMessageTime(dateStr?: string | null): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  } catch {
    return ''
  }
}

export function ConversationMessageItem({
  message,
  isOwnMessage,
  isGroup,
  conversationName,
  conversationAvatarUrl
}: ConversationMessageItemProps) {
  const senderName = capitalizeWords(message.relationships?.sender?.attributes?.name || conversationName)
  const senderAvatar = message.relationships?.sender?.attributes?.avatar_url || undefined
  const hoursAgo = formatMessageTime(message.attributes.created_at)
  const attachments = message.relationships?.attachments ?? []

  return (
    <div
      className={cn(
        'flex items-start gap-2 sm:gap-2.5 max-w-[90%] sm:max-w-[75%] min-w-0',
        isOwnMessage && 'ml-auto flex-row-reverse'
      )}
    >
      {isGroup && !isOwnMessage ? (
        <Avatar
          name={senderName}
          src={senderAvatar}
          size='sm'
          className='mt-0.5 shrink-0'
        />
      ) : !isOwnMessage ? (
        <Avatar
          name={conversationName}
          src={conversationAvatarUrl}
          size='sm'
          className='mt-0.5 shrink-0'
        />
      ) : null}
      <div className={cn('flex min-w-0 flex-col gap-1', isOwnMessage && 'items-end')}>
        <span className='text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate'>
          {isOwnMessage ? 'Tú' : senderName}
        </span>
        <div
          className={cn(
            'rounded-2xl px-3.5 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed break-words',
            isOwnMessage
              ? 'rounded-tr-xs bg-blue-600 text-white'
              : 'rounded-tl-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200/60 dark:border-neutral-700/60'
          )}
        >
          {attachments.map((attachment: MessageAttachment) => {
            const isImage = attachment.attributes.file_mime_type.startsWith('image/')

            return isImage ? (
              <a
                key={attachment.id}
                href={attachment.attributes.file_url}
                target='_blank'
                rel='noreferrer'
                className='mb-2 block overflow-hidden rounded-xl border border-black/10 dark:border-white/10'
              >
                <img
                  src={attachment.attributes.file_url}
                  alt={attachment.attributes.file_name}
                  className='max-h-64 max-w-full object-contain rounded-xl'
                  loading='lazy'
                />
              </a>
            ) : (
              <a
                key={attachment.id}
                href={attachment.attributes.file_url}
                target='_blank'
                rel='noreferrer'
                download={attachment.attributes.file_name}
                className='mb-2 flex items-center gap-2 rounded-lg border border-current/20 px-2.5 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors'
              >
                <FileText className='size-4 shrink-0' />
                <span className='min-w-0 flex-1 truncate font-medium'>{attachment.attributes.file_name}</span>
                <Download className='size-3.5 shrink-0' />
              </a>
            )
          })}
          {message.attributes.body && attachments.length === 0 && (
            <p className='whitespace-pre-wrap break-words'>{message.attributes.body}</p>
          )}
          {message.attributes.body && attachments.length > 0 && message.attributes.body !== 'Archivo adjunto' && (
            <p className='whitespace-pre-wrap break-words mt-1'>{message.attributes.body}</p>
          )}
          <div className='mt-1 flex items-center justify-end gap-1 text-[10px] leading-none'>
            <time
              dateTime={message.attributes.created_at}
              className={isOwnMessage ? 'text-blue-100' : 'text-neutral-500 dark:text-neutral-400'}
            >
              {hoursAgo}
            </time>
            {isOwnMessage && message.local_status === 'sending' && (
              <Clock
                className='size-3 text-blue-200 animate-spin'
                aria-label='Pendiente de envío'
              />
            )}
            {isOwnMessage && message.local_status === 'sent' && (
              <CheckCheck className='size-3 text-blue-200' aria-label='Enviado' />
            )}
            {isOwnMessage && message.local_status === 'error' && (
              <span className='text-red-200 font-medium'>No enviado</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
