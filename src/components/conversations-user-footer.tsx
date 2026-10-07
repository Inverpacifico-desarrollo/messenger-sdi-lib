'use client'

import React from 'react'
import { Avatar, Button, Skeleton, cn } from '../ui'
import { MessageSquarePlus, WifiOff } from 'lucide-react'
import { capitalizeWords } from '../utils/conversation.util'
import { useChatContext } from '../context/chat-context'
import { useCheckHasPermissionMessenger } from '../hooks/use-check-has-permission-messenger'
import { LIB_VERSION } from '../utils/version'

export interface ConversationsUserFooterProps {
  onNewConversation?: () => void
  showNewButton?: boolean
  className?: string
}

export function ConversationsUserFooter({
  onNewConversation,
  showNewButton = true,
  className
}: ConversationsUserFooterProps) {
  const { currentUser, isLoadingUser, hasError } = useChatContext()
  const hasCreatePermission = useCheckHasPermissionMessenger({
    permission: ['messenger_chat_support.provide_support']
  })
  const loggedUserName = capitalizeWords(currentUser?.attributes?.name) || 'Usuario'
  const userEmail = (currentUser?.attributes as any)?.email || 'Mi cuenta'

  if (hasError) {
    return (
      <div
        className={cn(
          'shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/80 dark:bg-neutral-900/80 flex items-center gap-2 text-neutral-500 dark:text-neutral-400',
          className
        )}
      >
        <WifiOff className='size-3.5 shrink-0 text-red-500' />
        <span className='truncate text-[11px] font-medium'>Sin conexión • No disponible</span>
      </div>
    )
  }

  if (isLoadingUser) {
    return (
      <div
        className={cn(
          'shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5',
          className
        )}
      >
        <div className='flex items-center gap-2.5 min-w-0 flex-1'>
          <Skeleton className='size-8 rounded-full' />
          <div className='min-w-0 flex-1 space-y-1.5'>
            <Skeleton className='h-3 w-20' />
            <Skeleton className='h-2.5 w-32' />
          </div>
        </div>
        {showNewButton && <Skeleton className='size-8 rounded-lg shrink-0' />}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5',
        className
      )}
    >
      <div className='flex items-center gap-2.5 min-w-0 flex-1'>
        <Avatar src={currentUser?.attributes.avatar_url} name={loggedUserName} size='sm' />
        <div className='min-w-0 flex-1'>
          <p className='truncate text-xs font-bold text-neutral-900 dark:text-neutral-100'>
            {loggedUserName}
          </p>
          <div className='flex items-center gap-1.5 text-[10px] leading-tight text-neutral-500 dark:text-neutral-400 mt-0.5'>
            <span className='truncate'>{userEmail}</span>
            <span className='text-neutral-300 dark:text-neutral-700 select-none'>•</span>
            <span className='font-mono text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0'>
              v{LIB_VERSION}
            </span>
          </div>
        </div>
      </div>

      {showNewButton && onNewConversation && hasCreatePermission && (
        <Button
          type='button'
          variant='primary'
          size='sm'
          onClick={onNewConversation}
          className='h-8 gap-1.5 px-3 text-xs font-semibold shrink-0 shadow-xs cursor-pointer'
          title='Iniciar nueva conversación'
        >
          <MessageSquarePlus className='size-3.5' />
        </Button>
      )}
    </div>
  )
}

export default ConversationsUserFooter
