import { useCallback } from 'react'
import { AxiosError } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { useMutate } from '../../use-mutate'
import { ResponseError } from '../../../types/api.types'
import { createConversationService } from '../../../services/conversation.services'
import { Conversation, CreateConversationPayload } from '../../../types/conversation.types'

const useCreateConversation = () => {
  const queryClient = useQueryClient()
  const createConversation = useCallback(async (payload: CreateConversationPayload) => {
    const response = await createConversationService(payload)

    await queryClient.invalidateQueries({ queryKey: ['list-conversations'] })

    return response.data.data
  }, [queryClient])

  return useMutate<Conversation, AxiosError<ResponseError>, CreateConversationPayload>(
    createConversation
  )
}

export default useCreateConversation
