import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { UserAuth } from '../../../types/user-auth.types'
import { ResponseAPI } from '../../../types/api.types'
import { getAuthUserService } from '../../../services/user-auth.services'

export interface UseGetAuthUserProps {
  userId?: string | number | null
  enabled?: boolean
}

export const useGetAuthUser = ({ userId, enabled = true }: UseGetAuthUserProps = {}) => {
  const query = useQuery<AxiosResponse<ResponseAPI<UserAuth>>>({
    queryKey: ['auth-user', userId],
    queryFn: () => getAuthUserService(userId!),
    enabled: Boolean(userId) && enabled,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000 // 5 minutos de cache
  })

  const userAuth = query.data?.data?.data

  return {
    userAuth,
    isLoading: query.isPending || query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch
  }
}

export default useGetAuthUser
