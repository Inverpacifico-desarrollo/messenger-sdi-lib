import { useQuery } from '@tanstack/react-query'
import { getPermissionsMessenger } from '../../../services/auth-services'
import { useChatContext } from '../../../context/chat-context'

export const useGetUserPermissionMessenger = () => {
  const { config, currentUser } = useChatContext()

  const applicationId = config?.applicationId
  const userId = currentUser?.attributes.user_auth_id

  return useQuery({
    queryKey: ['get-permission-messenger', applicationId, userId],
    enabled: Boolean(applicationId && userId),
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!applicationId || !userId) return []
      const { data } = await getPermissionsMessenger({ applicationId, userId })
      return data.data
    }
  })
}
