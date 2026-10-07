import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useListConversations from './api/conversations/use-list-conversations'
import { Conversation, FilterConversation, UnreadEvent } from '../types/conversation.types'
import { subscribeToUser } from '../utils/reverb'
import { toast } from 'sonner'
import useDebounce from './use-debounce'
import { useChatContext } from '../context/chat-context'
import { useCheckHasPermissionMessenger } from './use-check-has-permission-messenger'

export interface UseConversationsPageOptions {
  showToastOnUnread?: boolean
}

export const useConversationsPage = ({
  showToastOnUnread = true
}: UseConversationsPageOptions = {}) => {
  const queryClient = useQueryClient()
  const { config, currentUser, currentUserId } = useChatContext()

  const hasReadPermission = useCheckHasPermissionMessenger({
    permission: ['messenger_chat.read']
  })

  const [closedFilter, setClosedFilter] = useState<'0' | '1'>('0')
  const [typeFilter, setTypeFilter] = useState<'all' | 'direct' | 'group' | 'bot'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 300)

  const params: FilterConversation = useMemo(() => {
    const filter: Record<string, string> = {
      closed: closedFilter
    }
    if (typeFilter !== 'all') {
      filter.type = typeFilter
    }
    if (debouncedSearch.trim()) {
      filter.name = debouncedSearch.trim()
    }

    return {
      user_id: currentUserId,
      paginate: 'false',
      ...(Object.keys(filter).length > 0 ? { filter } : {})
    }
  }, [closedFilter, typeFilter, debouncedSearch, currentUserId])

  const {
    data: conversations,
    isLoading,
    errors,
    refetch: refetchConversations
  } = useListConversations({
    params,
    enable: Boolean(currentUserId) && hasReadPermission
  })

  const [selectedId, setSelectedId] = useState('')
  const [isContextPanelOpen, setIsContextPanelOpen] = useState(false)
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false)

  const handleUnreadUpdate = useCallback(
    (event: UnreadEvent) => {
      if (showToastOnUnread && String(event.conversation_id) !== selectedId) {
        toast.info('Nuevo mensaje', {
          id: `conversation-message-${event.message.id}`,
          description: event.message.body || 'Tienes un mensaje nuevo',
          action: {
            label: 'Abrir',
            onClick: () => {
              setSelectedId(String(event.conversation_id))
              setIsMobileChatOpen(true)
            }
          }
        })
      }

      queryClient.invalidateQueries({ queryKey: ['list-conversations'] })
      refetchConversations()
    },
    [queryClient, refetchConversations, selectedId, showToastOnUnread]
  )

  const handleRealtimeConversationCreated = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['list-conversations'] })
    refetchConversations()
  }, [queryClient, refetchConversations])

  useEffect(() => {
    if (!currentUserId) return

    return subscribeToUser(
      config.reverb,
      currentUserId,
      handleUnreadUpdate,
      handleRealtimeConversationCreated
    )
  }, [config.reverb, handleRealtimeConversationCreated, handleUnreadUpdate, currentUserId])

  const selectedConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedId),
    [conversations, selectedId]
  )

  const selectConversation = (id: string) => {
    setSelectedId(id)
    setIsMobileChatOpen(true)
  }

  const unselectConversation = () => {
    setSelectedId('')
    setIsMobileChatOpen(false)
  }

  const goBackToConversationList = () => setIsMobileChatOpen(false)

  const handleConversationCreated = (conversation: Conversation) => {
    setSelectedId(conversation.id)
    setIsMobileChatOpen(true)
    setIsNewConversationOpen(false)
    queryClient.invalidateQueries({ queryKey: ['list-conversations'] })
    refetchConversations()
  }

  return {
    conversations,
    selectedId,
    setSelectedId,
    selectedConversation,
    closedFilter,
    setClosedFilter,
    typeFilter,
    setTypeFilter,
    searchQuery,
    setSearchQuery,
    isContextPanelOpen,
    isMobileChatOpen,
    isNewConversationOpen,
    isLoading,
    errors,
    hasReadPermission,
    currentUser,
    currentUserId,
    selectConversation,
    unselectConversation,
    setIsContextPanelOpen,
    setIsNewConversationOpen,
    goBackToConversationList,
    handleConversationCreated
  }
}

export default useConversationsPage
