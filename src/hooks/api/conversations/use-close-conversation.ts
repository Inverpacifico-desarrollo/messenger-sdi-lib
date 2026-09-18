import { useCallback } from 'react'
import { AxiosError } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { useMutate } from '../../use-mutate'
import { ResponseError } from '../../../types/api.types'
import { closeConversationService } from '../../../services/conversation.services'
import { Conversation } from '../../../types/conversation.types'

const useCloseConversation = () => {
  const queryClient = useQueryClient()
  const closeConversation = useCallback(async (conversationId: string) => {
    const response = await closeConversationService(conversationId)

    await queryClient.invalidateQueries({ queryKey: ['list-conversations'] })
    await queryClient.invalidateQueries({ queryKey: ['conversation', conversationId] })

    return response.data.data
  }, [queryClient])

  return useMutate<Conversation, AxiosError<ResponseError>, string>(
    closeConversation
  )
}

export default useCloseConversation
