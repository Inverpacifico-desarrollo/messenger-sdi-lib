'use client'

import React from 'react'
import type { Conversation } from '../types/conversation.types'
import useConversationChat from '../hooks/use-conversation-chat'
import { ConversationChatHeader } from './conversation-chat-header'
import { ConversationMessagesList } from './conversation-messages-list'
import { ConversationComposer } from './conversation-composer'
import { ChatWallpaper } from './chat-wallpaper'

export interface ConversationChatPanelProps {
  conversation: Conversation
  onToggleContextPanel?: () => void
  isContextPanelOpen?: boolean
  onBack?: () => void
  alwaysShowBackButton?: boolean
  onCloseSuccess?: () => void
}

export function ConversationChatPanel({
  conversation,
  onToggleContextPanel,
  isContextPanelOpen = true,
  onBack,
  alwaysShowBackButton = false,
  onCloseSuccess
}: ConversationChatPanelProps) {
  const chat = useConversationChat(conversation, {
    onCloseSuccess: () => {
      onCloseSuccess?.()
      onBack?.()
    }
  })

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

      {/* Cuerpo del Chat con Wallpaper continuo (Mensajes + Typing + Composer flotante) */}
      <div className='relative flex flex-1 min-h-0 w-full flex-col overflow-hidden bg-[#f4f6f8]/70 dark:bg-[#0a0f1d]'>
        {/* Fondo estilo Wallpaper Corporativo SDI continuo */}
        <ChatWallpaper />

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

        {chat.typingUser && (
          <div className='relative z-10 flex shrink-0 items-center gap-1.5 px-4 py-1 text-xs text-neutral-500 dark:text-neutral-400 animate-in fade-in duration-150'>
            <span className='font-medium'>{chat.typingUser} está escribiendo</span>
            <span className='inline-flex gap-0.5' aria-hidden='true'>
              <span className='size-1 rounded-full bg-neutral-400 animate-pulse' />
              <span className='size-1 rounded-full bg-neutral-400 animate-pulse delay-75' />
              <span className='size-1 rounded-full bg-neutral-400 animate-pulse delay-150' />
            </span>
          </div>
        )}

        {/* Barra de escritura flotante integrada en el chat */}
        <div className='relative z-10 w-full'>
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
            isClosed={chat.isClosed}
          />
        </div>
      </div>
    </div>
  )
}
