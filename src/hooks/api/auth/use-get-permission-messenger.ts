import { getPermissionsMessenger } from '../../../services/auth-services'
import { useChatContext } from '../../../context/chat-context'
import { useQuery } from '../../use-query'

export const useGetUserPermissionMessenger = () => {
  const { config, currentUser } = useChatContext()

  const applicationId = config?.applicationId
  const userId = currentUser?.attributes.user_auth_id
  const isEnabled = Boolean(applicationId !== undefined && applicationId !== null && userId)

  const query = useQuery({
    queryKey: ['get-permission-messenger', applicationId, userId],
    queryFn: async () => {
      if (applicationId === undefined || applicationId === null || !userId) return []
      const { data } = await getPermissionsMessenger({ applicationId, userId })
      return data.data ?? []
    },
    enabled: isEnabled,
    keepPreviousData: true,
    initialData: []
  })

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch
  }
}
