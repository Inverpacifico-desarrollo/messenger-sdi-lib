import { useCallback } from 'react'
import { AxiosError } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { useMutate } from '../../use-mutate'
import { ResponseError } from '../../../types/api.types'
import { markConversationAsReadService } from '../../../services/conversation.services'
import { Conversation, MarkConversationAsReadPayload } from '../../../types/conversation.types'

const useMarkConversationAsRead = () => {
  const queryClient = useQueryClient()
  const markAsRead = useCallback(async (payload: MarkConversationAsReadPayload) => {
    const response = await markConversationAsReadService(payload)

    await queryClient.invalidateQueries({ queryKey: ['list-conversations'] })
    await queryClient.invalidateQueries({ queryKey: ['conversation', payload.conversationId] })

    return response.data.data
  }, [queryClient])

  return useMutate<Conversation, AxiosError<ResponseError>, MarkConversationAsReadPayload>(
    markAsRead
  )
}

export default useMarkConversationAsRead
