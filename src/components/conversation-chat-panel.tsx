'use client'

import React from 'react'
import type { Conversation } from '../types/conversation.types'
import useConversationChat from '../hooks/use-conversation-chat'
import { ConversationChatHeader } from './conversation-chat-header'
import { ConversationMessagesList } from './conversation-messages-list'
import { ConversationComposer } from './conversation-composer'

export interface ConversationChatPanelProps {
  conversation: Conversation
  onToggleContextPanel?: () => void
  isContextPanelOpen?: boolean
  onBack?: () => void
  alwaysShowBackButton?: boolean
}

export function ConversationChatPanel({
  conversation,
  onToggleContextPanel,
  isContextPanelOpen = true,
  onBack,
  alwaysShowBackButton = false
}: ConversationChatPanelProps) {
  const chat = useConversationChat(conversation)

  return (
    <div className='sdi-messenger-root flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'>
      {/* Cabecera del Chat Activo */}
      <ConversationChatHeader
        conversation={conversation}
        isClosed={chat.isClosed}
        isClosing={chat.isClosing}
        onCloseConversation={chat.handleCloseConversation}
        isContextPanelOpen={isContextPanelOpen}
        onToggleContextPanel={onToggleContextPanel}
        onBack={onBack}
        alwaysShowBackButton={alwaysShowBackButton}
      />

      {/* Área Principal de Mensajes */}
      <ConversationMessagesList
        conversation={conversation}
        messages={chat.messages}
        optimisticMessages={chat.optimisticMessages}
        scrollRef={chat.scrollRef}
        isFetchingNextPage={chat.isFetchingNextPage}
        hasNextPage={chat.hasNextPage}
        isLoading={chat.isLoading}
        isNearBottom={chat.isNearBottom}
        newMessagesCount={chat.newMessagesCount}
        visibleDate={chat.visibleDate}
        onScrollToBottom={chat.scrollToBottom}
      />
      {/* <div className='overflow-y-scroll'><pre>{JSON.stringify(chat.messages, null, 2)}</pre></div> */}

      {chat.typingUser && (
        <div className='flex shrink-0 items-center gap-1.5 border-t border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-950 px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400'>
          <span>{chat.typingUser} está escribiendo</span>
          <span className='inline-flex gap-0.5' aria-hidden='true'>
            <span className='size-1 rounded-full bg-neutral-400 animate-pulse' />
            <span className='size-1 rounded-full bg-neutral-400 animate-pulse delay-75' />
            <span className='size-1 rounded-full bg-neutral-400 animate-pulse delay-150' />
          </span>
        </div>
      )}

      {/* Respuestas Rápidas y Editor de Mensajes */}
      <ConversationComposer
        inputText={chat.inputText}
        setInputText={chat.setInputText}
        onSendMessage={chat.handleSendMessage}
        onSelectFile={chat.handleSelectFile}
        pendingFile={chat.pendingFile}
        onRemoveFile={() => chat.setPendingFile(null)}
        isSending={chat.isSending}
        isUploading={chat.isUploading}
        conversationName={chat.conversationName}
      />
    </div>
  )
}
