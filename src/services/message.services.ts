import { chatApiUrl, httpRequest } from '../lib/http-request'
import type { AxiosResponse } from 'axios'
import type { ResponseApiMessage } from '../types/api.types'
import {
  ConversationMessage,
  CreateMessagePayload,
  Message,
  MessageParams,
  UploadMessageFilePayload
} from '../types/message.types'

export const listMessagesService = async ({
  conversation,
  ...params
}: MessageParams): Promise<AxiosResponse<ResponseApiMessage<ConversationMessage[]>>> => {
  return (await httpRequest<ConversationMessage[]>({
    url: `${chatApiUrl('messenger', 'v1')}/conversations/${conversation}/messages`,
    method: 'GET',
    params
  })) as unknown as AxiosResponse<ResponseApiMessage<ConversationMessage[]>>
}

export const createMessageService = (conversationId: string, data: CreateMessagePayload) =>
  httpRequest<Message>({
    url: `${chatApiUrl('messenger', 'v1')}/conversations/${conversationId}/messages`,
    method: 'POST',
    data
  })

export const uploadMessageFileService = (
  conversationId: string,
  data: UploadMessageFilePayload
) => {
  const formData = new FormData()
  formData.append('file', data.file)
  formData.append('sender_id', data.sender_id.toString())

  if (data.caption) formData.append('caption', data.caption)

  return httpRequest<Message>({
    url: `${chatApiUrl('messenger', 'v1')}/conversations/${conversationId}/file`,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
