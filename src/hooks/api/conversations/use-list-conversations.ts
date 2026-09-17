import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { Conversation, FilterConversation } from '../../../types/conversation.types'
import { ResponseAPI } from '../../../types/api.types'
import { listConversationsService } from '../../../services/conversation.services'

interface Props {
  params?: FilterConversation
  enable?: boolean
}

const useListConversations = (props?: Props) => {
  const safeParams = props?.params ?? {}
  const query = useQuery<AxiosResponse<ResponseAPI<Conversation[]>>>({
    queryKey: ['list-conversations', safeParams],
    queryFn: () => listConversationsService(safeParams),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    enabled: props?.enable !== false
  })

  return {
    data: query.data?.data.data ?? [],
    meta: query.data?.data?.meta,
    links: query.data?.data.links,
    isLoading: query.isPending,
    errors: (query.error as any)?.data ?? {},
    refetch: query.refetch
  }
}

export default useListConversations
