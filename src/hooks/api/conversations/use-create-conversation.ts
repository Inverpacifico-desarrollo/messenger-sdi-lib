import { useCallback } from 'react'
import { AxiosError } from 'axios'
import { useMutate } from '../../use-mutate'
import { ResponseError } from '../../../types/api.types'
import { createConversationService } from '../../../services/conversation.services'
import { Conversation, CreateConversationPayload } from '../../../types/conversation.types'

const useCreateConversation = () => {
  const createConversation = useCallback(async (payload: CreateConversationPayload) => {
    const response = await createConversationService(payload)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('messenger:conversation-created', {
          detail: { conversation: response.data.data }
        })
      )
    }
    return response.data.data
  }, [])

  return useMutate<Conversation, AxiosError<ResponseError>, CreateConversationPayload>(
    createConversation
  )
}

export default useCreateConversation
