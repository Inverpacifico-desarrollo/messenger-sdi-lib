import { useCallback, useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useGetConversation from './api/conversations/use-get-conversation'
import { Conversation, TypingEvent, UnreadEvent } from '../types/conversation.types'
import { Message } from '../types/message.types'
import { subscribeToConversation, subscribeToUser } from '../utils/reverb'
import { toast } from 'sonner'
import { useChatContext } from '../context/chat-context'
import { useCheckHasPermissionMessenger } from './use-check-has-permission-messenger'

export interface UseShowConversationOptions {
  conversationId?: string | number
  enabled?: boolean
  showToastOnUnread?: boolean
  onMessage?: (message: Message) => void
  onUnread?: (event: UnreadEvent) => void
}

export const useShowConversation = (
  param?: string | number | UseShowConversationOptions,
  extraOptions?: Omit<UseShowConversationOptions, 'conversationId'>
) => {
  const options: UseShowConversationOptions =
    typeof param === 'object' && param !== null
      ? param
      : { conversationId: param, ...extraOptions }

  const {
    conversationId,
    enabled = true,
    showToastOnUnread = false,
    onMessage,
    onUnread
  } = options

  const queryClient = useQueryClient()
  const { config, currentUser, currentUserId } = useChatContext()

  const hasReadPermission = useCheckHasPermissionMessenger({
    permission: ['messenger_chat.read']
  })

  const conversationIdStr =
    conversationId !== undefined && conversationId !== null ? String(conversationId) : undefined
  const conversationIdNum =
    conversationId !== undefined && conversationId !== null ? Number(conversationId) : undefined

  const isQueryEnabled = enabled && Boolean(conversationIdStr) && hasReadPermission

  const {
    data: conversation,
    isLoading,
    isError,
    errors,
    refetch
  } = useGetConversation({
    conversationId: conversationIdStr,
    enabled: isQueryEnabled
  })

  const handleMessage = useCallback(
    (message: Message) => {
      queryClient.invalidateQueries({ queryKey: ['conversation', conversationIdStr] })
      queryClient.invalidateQueries({ queryKey: ['list-conversations'] })
      refetch()
      onMessage?.(message)
    },
    [conversationIdStr, onMessage, queryClient, refetch]
  )


  const handleUnreadUpdate = useCallback(
    (event: UnreadEvent) => {
      if (showToastOnUnread && String(event.conversation_id) !== conversationIdStr) {
        toast.info('Nuevo mensaje', {
          id: `conversation-message-${event.message.id}`,
          description: event.message.body || 'Tienes un mensaje nuevo'
        })
      }

      if (String(event.conversation_id) === conversationIdStr) {
        queryClient.invalidateQueries({ queryKey: ['conversation', conversationIdStr] })
        refetch()
      }

      queryClient.invalidateQueries({ queryKey: ['list-conversations'] })
      onUnread?.(event)
    },
    [conversationIdStr, onUnread, queryClient, refetch, showToastOnUnread]
  )



  useEffect(() => {
    if (!conversationIdNum || !isQueryEnabled) return

    return subscribeToConversation(
      config.reverb,
      conversationIdNum,
      handleMessage,
    )
  }, [config.reverb, conversationIdNum, handleMessage, isQueryEnabled])

  useEffect(() => {
    if (!currentUserId || !isQueryEnabled) return

    return subscribeToUser(
      config.reverb,
      currentUserId,
      handleUnreadUpdate
    )
  }, [config.reverb, currentUserId, handleUnreadUpdate, isQueryEnabled])

  return {
    conversation: (conversation as Conversation | null) ?? null,
    isLoading,
    isError,
    errors,
    refetch,
    hasReadPermission,
    currentUser,
    currentUserId
  }
}

export default useShowConversation
