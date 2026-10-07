import { useCallback } from 'react'
import { AxiosError } from 'axios'
import { useMutate } from '../use-mutate'
import { ResponseError } from '../../types/api.types'
import { requestChatSupportService } from '../../services/chat-support.services'
import {
  RequestChatSupportPayload,
  RequestChatSupportResponse
} from '../../types/chat-support.types'

export const useRequestChatSupport = () => {
  const requestSupport = useCallback(async (payload: RequestChatSupportPayload) => {
    const response = await requestChatSupportService(payload)
    const data = (response.data as any)?.data ?? response.data
    if (typeof window !== 'undefined' && data?.conversation_id) {
      window.dispatchEvent(
        new CustomEvent('messenger:conversation-created', {
          detail: { conversationId: data.conversation_id }
        })
      )
    }
    return data as RequestChatSupportResponse
  }, [])

  return useMutate<RequestChatSupportResponse, AxiosError<ResponseError>, RequestChatSupportPayload>(
    requestSupport
  )
}

export default useRequestChatSupport
