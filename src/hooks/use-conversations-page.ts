import { useCallback, useEffect, useMemo, useState } from 'react'
import useListConversations from './api/conversations/use-list-conversations'
import useMarkConversationAsRead from './api/conversations/use-mark-conversation-as-read'
import { Conversation, FilterConversation, UnreadEvent } from '../types/conversation.types'
import { subscribeToUser } from '../utils/reverb'
import { toast } from 'sonner'
import useDebounce from './use-debounce'
import { useChatContext } from '../context/chat-context'
import { useCheckHasPermissionMessenger } from './use-check-has-permission-messenger'
import { playNotificationSound } from '../utils/audio.util'

export interface UseConversationsPageOptions {
  showToastOnUnread?: boolean
  isActive?: boolean
}

export const useConversationsPage = ({
  showToastOnUnread = true,
  isActive = true
}: UseConversationsPageOptions = {}) => {
  const { config, currentUser, currentUserId } = useChatContext()
  const { mutateAsync: markConversationAsRead } = useMarkConversationAsRead()

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
    data: rawConversations,
    isLoading,
    isFetching,
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

  // Solo si la vista está visible/activa y la conversación coincide, aseguramos unread_count: 0
  const conversations = useMemo(() => {
    if (!isActive || !selectedId) return rawConversations
    return rawConversations.map((conv) => {
      if (conv.id === selectedId && conv.attributes.unread_count > 0) {
        return {
          ...conv,
          attributes: {
            ...conv.attributes,
            unread_count: 0
          }
        }
      }
      return conv
    })
  }, [isActive, rawConversations, selectedId])

  const handleUnreadUpdate = useCallback(
    (event: UnreadEvent) => {
      const isFromOtherUser =
        currentUserId && String(event.message.sender_id) !== String(currentUserId)

      const isFocused =
        isActive && String(event.conversation_id) === selectedId

      if (isFromOtherUser) {
        playNotificationSound(isFocused ? 'focused' : 'unfocused')
      }

      if (showToastOnUnread && !isFocused) {
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

      void refetchConversations()
    },
    [currentUserId, isActive, refetchConversations, selectedId, showToastOnUnread]
  )

  const handleRealtimeConversationCreated = useCallback(() => {
    void refetchConversations()
  }, [refetchConversations])

  // Escuchar cuando una conversación es marcada como leída, cerrada o creada para sincronizar la lista
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleSync = () => {
      void refetchConversations()
    }

    window.addEventListener('messenger:conversation-read', handleSync)
    window.addEventListener('messenger:conversation-closed', handleSync)
    window.addEventListener('messenger:conversation-created', handleSync)
    window.addEventListener('messenger:conversation-updated', handleSync)

    return () => {
      window.removeEventListener('messenger:conversation-read', handleSync)
      window.removeEventListener('messenger:conversation-closed', handleSync)
      window.removeEventListener('messenger:conversation-created', handleSync)
      window.removeEventListener('messenger:conversation-updated', handleSync)
    }
  }, [refetchConversations])

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

  const selectConversation = useCallback(
    (id: string) => {
      setSelectedId(id)
      setIsMobileChatOpen(true)

      if (id && currentUserId) {
        void markConversationAsRead({
          conversationId: id,
          read_until: new Date().toISOString(),
          user_id: currentUserId
        })
          .then(() => {
            void refetchConversations()
          })
          .catch(console.error)
      }
    },
    [currentUserId, markConversationAsRead, refetchConversations]
  )

  const unselectConversation = () => {
    setSelectedId('')
    setIsMobileChatOpen(false)
  }

  const goBackToConversationList = () => setIsMobileChatOpen(false)

  const handleConversationCreated = (conversation: Conversation) => {
    setSelectedId(conversation.id)
    setIsMobileChatOpen(true)
    setIsNewConversationOpen(false)
    void refetchConversations()
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
    isFetching,
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
