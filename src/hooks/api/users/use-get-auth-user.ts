import { AxiosResponse } from 'axios'
import { UserAuth } from '../../../types/user-auth.types'
import { ResponseAPI } from '../../../types/api.types'
import { getAuthUserService } from '../../../services/user-auth.services'
import { useQuery } from '../../use-query'

export interface UseGetAuthUserProps {
  userId?: string | number | null
  enabled?: boolean
}

export const useGetAuthUser = ({ userId, enabled = true }: UseGetAuthUserProps = {}) => {
  const isEnabled = Boolean(userId) && enabled

  const query = useQuery<AxiosResponse<ResponseAPI<UserAuth>>>({
    queryKey: ['auth-user', userId],
    queryFn: () => getAuthUserService(userId!),
    enabled: isEnabled,
    keepPreviousData: true
  })

  return {
    userAuth: query.data?.data?.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch
  }
}

export default useGetAuthUser
