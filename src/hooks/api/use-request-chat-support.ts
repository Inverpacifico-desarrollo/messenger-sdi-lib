import { useCallback } from 'react'
import { AxiosError } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { useMutate } from '../use-mutate'
import { ResponseError } from '../../types/api.types'
import { requestChatSupportService } from '../../services/chat-support.services'
import {
  RequestChatSupportPayload,
  RequestChatSupportResponse
} from '../../types/chat-support.types'

export const useRequestChatSupport = () => {
  const queryClient = useQueryClient()
  const requestSupport = useCallback(async (payload: RequestChatSupportPayload) => {
    const response = await requestChatSupportService(payload)
    const data = (response.data as any)?.data ?? response.data

    if (data?.conversation_id) {
      await queryClient.invalidateQueries({ queryKey: ['list-conversations'] })
    }

    return data as RequestChatSupportResponse
  }, [queryClient])

  return useMutate<RequestChatSupportResponse, AxiosError<ResponseError>, RequestChatSupportPayload>(
    requestSupport
  )
}

export default useRequestChatSupport
