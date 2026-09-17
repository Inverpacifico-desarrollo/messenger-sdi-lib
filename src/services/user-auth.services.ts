import { chatApiUrl, httpRequest } from '../lib/http-request'
import { UserAuth } from '../types/user-auth.types'

export const getAuthUserService = (userId: string | number) =>
  httpRequest<UserAuth>({
    url: `${chatApiUrl('auth', 'v1')}/users/${userId}`,
    method: 'GET'
  })
