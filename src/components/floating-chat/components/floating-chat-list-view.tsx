'use client'

import React from 'react'
import { ArrowLeft, X } from 'lucide-react'
import { Button } from '../../../ui'
import { ConversationsSidebarList } from '../../conversations-sidebar-list'
import type { Conversation } from '../../../types/conversation.types'

interface FloatingChatListViewProps {
  conversations: Conversation[]
  selectedId: string
  searchQuery: string
  closedFilter: '0' | '1'
  typeFilter: 'all' | 'direct' | 'group' | 'bot'
  isLoading: boolean
  onHome: () => void
  onClose: () => void
  onSelectConversation: (id: string) => void
  onSearchChange: (val: string) => void
  onClosedFilterChange: (val: '0' | '1') => void
  onTypeFilterChange: (val: 'all' | 'direct' | 'group' | 'bot') => void
  onNewConversation: () => void
  onDragStart: (e: React.PointerEvent) => void
}

export function FloatingChatListView({
  conversations,
  selectedId,
  searchQuery,
  closedFilter,
  typeFilter,
  isLoading,
  onHome,
  onClose,
  onSelectConversation,
  onSearchChange,
  onClosedFilterChange,
  onTypeFilterChange,
  onNewConversation,
  onDragStart
}: FloatingChatListViewProps) {
  return (
    <div className='flex h-full w-full flex-col min-w-0 overflow-hidden'>
      {/* Cabecera de la lista - Arrastrable */}
      <div
        onPointerDown={onDragStart}
        className='flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900 cursor-grab active:cursor-grabbing touch-none select-none'
      >
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onHome}
          className='h-7 gap-1 px-2 text-xs font-medium cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100'
        >
          <ArrowLeft className='size-3.5' />
          <span>Inicio</span>
        </Button>
        <span className='text-xs font-bold text-neutral-900 dark:text-neutral-100'>
          Mis Conversaciones
        </span>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onClose}
          className='size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
        >
          <X className='size-3.5' />
        </Button>
      </div>

      <div className='flex-1 min-h-0 w-full overflow-hidden'>
        <ConversationsSidebarList
          conversations={conversations}
          selectedId={selectedId}
          onSelectConversation={onSelectConversation}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          closedFilter={closedFilter}
          onClosedFilterChange={onClosedFilterChange}
          typeFilter={typeFilter}
          onTypeFilterChange={onTypeFilterChange}
          onNewConversation={onNewConversation}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
