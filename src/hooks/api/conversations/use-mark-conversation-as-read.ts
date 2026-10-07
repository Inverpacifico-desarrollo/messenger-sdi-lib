import { useCallback } from 'react'
import { AxiosError } from 'axios'
import { useMutate } from '../../use-mutate'
import { ResponseError } from '../../../types/api.types'
import { markConversationAsReadService } from '../../../services/conversation.services'
import { Conversation, MarkConversationAsReadPayload } from '../../../types/conversation.types'

const useMarkConversationAsRead = () => {
  const markAsRead = useCallback(async (payload: MarkConversationAsReadPayload) => {
    const response = await markConversationAsReadService(payload)
    return response.data.data
  }, [])

  return useMutate<Conversation, AxiosError<ResponseError>, MarkConversationAsReadPayload>(
    markAsRead
  )
}

export default useMarkConversationAsRead
