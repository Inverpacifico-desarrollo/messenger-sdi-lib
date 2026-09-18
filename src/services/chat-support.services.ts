import { chatApiUrl, httpRequest } from '../lib/http-request'
import {
  RequestChatSupportPayload,
  RequestChatSupportResponse
} from '../types/chat-support.types'

export const requestChatSupportService = (data: RequestChatSupportPayload) =>
  httpRequest<RequestChatSupportResponse>({
    url: `${chatApiUrl('helpdesk', 'v1')}/requests/chat-support`,
    method: 'POST',
    data
  })
