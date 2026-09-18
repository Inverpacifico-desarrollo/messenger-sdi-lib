import { useQuery } from '@tanstack/react-query'
import { getConversationService } from '../../../services/conversation.services'

interface Props {
  conversationId?: string
  enabled?: boolean
}

const useGetConversation = ({ conversationId, enabled = true }: Props = {}) => {
  const query = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => getConversationService(conversationId as string),
    enabled: enabled && Boolean(conversationId),
    refetchOnWindowFocus: false
  })

  return {
    data: query.data?.data?.data ?? null,
    isLoading: query.isPending,
    isError: query.isError,
    errors: (query.error as any)?.data ?? {},
    refetch: query.refetch
  }
}

export default useGetConversation
