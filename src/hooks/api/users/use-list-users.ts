import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { FilterUserChat, UserChat } from '../../../types/user-chat.types'
import { ResponseAPI } from '../../../types/api.types'
import { listUsersChatService } from '../../../services/user-messenger.services'

interface Props {
  params?: FilterUserChat
  enable?: boolean
}

const useListUsers = (props?: Props) => {
  const safeParams = props?.params ?? {}
  const query = useQuery<AxiosResponse<ResponseAPI<UserChat[]>>>({
    queryKey: ['list-chat-users', safeParams],
    queryFn: () => listUsersChatService(safeParams),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    enabled: props?.enable !== false
  })

  return {
    data: query.data?.data.data ?? [],
    meta: query.data?.data?.meta,
    links: query.data?.data?.links,
    isLoading: query.isPending,
    errors: (query.error as any)?.data ?? {},
    refetch: query.refetch
  }
}

export default useListUsers
