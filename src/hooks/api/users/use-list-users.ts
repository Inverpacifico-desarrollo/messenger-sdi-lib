import { AxiosResponse } from 'axios'
import { FilterUserChat, UserChat } from '../../../types/user-chat.types'
import { ResponseAPI } from '../../../types/api.types'
import { listUsersChatService } from '../../../services/user-messenger.services'
import { useQuery } from '../../use-query'

interface Props {
  params?: FilterUserChat
  enable?: boolean
}

const useListUsers = (props?: Props) => {
  const safeParams = props?.params ?? {}

  const query = useQuery<AxiosResponse<ResponseAPI<UserChat[]>>>({
    queryKey: ['list-chat-users', safeParams],
    queryFn: () => listUsersChatService(safeParams),
    enabled: props?.enable !== false,
    keepPreviousData: true
  })

  return {
    data: query.data?.data.data ?? [],
    meta: query.data?.data?.meta,
    links: query.data?.data?.links,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    errors: query.errors,
    refetch: query.refetch
  }
}

export default useListUsers
