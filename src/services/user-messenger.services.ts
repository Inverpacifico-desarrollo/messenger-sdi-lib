import { chatApiUrl, httpRequest } from '../lib/http-request'
import { FilterUserChat, UserChat } from '../types/user-chat.types'

export const listUsersChatService = (params?: FilterUserChat) =>
  httpRequest<UserChat[]>({
    url: `${chatApiUrl('messenger', 'v1')}/users`,
    method: 'GET',
    params
  })

  export const getUserByUserAuthIdChatService = (id: string | number) =>
  httpRequest<UserChat>({
    url: `${chatApiUrl('messenger', 'v1')}/users/${id}/user`,
    method: 'GET'
  })