import { getConversationService } from '../../../services/conversation.services'
import { Conversation } from '../../../types/conversation.types'
import { useQuery } from '../../use-query'

interface Props {
  conversationId?: string
  enabled?: boolean
}

const useGetConversation = ({ conversationId, enabled = true }: Props = {}) => {
  const isEnabled = enabled && Boolean(conversationId)

  const query = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => getConversationService(conversationId as string),
    enabled: isEnabled,
    keepPreviousData: true
  })

  return {
    data: (query.data?.data?.data as Conversation | null) ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    errors: query.errors,
    refetch: query.refetch
  }
}

export default useGetConversation
