import { chatApiUrl, httpRequest } from '../lib/http-request'
import { PermissionAuht, UserAuth } from '../types/user-auth.types'

export const getPermissionsMessenger = ({
  applicationId,
  userId
}: {
  userId: string | number
  applicationId: string | number
}) =>
  httpRequest<PermissionAuht[]>({
    url: `${chatApiUrl('auth', 'v1')}/users/${userId}/permissions`,
    method: 'GET',
    params: {
      application_id: applicationId
    }
  })

export const meService = () => {
  return httpRequest<UserAuth>({
    url: `${chatApiUrl('auth', 'v1')}/me`,
    method: 'GET'
  })
}
