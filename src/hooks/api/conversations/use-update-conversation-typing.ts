import { AxiosError } from 'axios'
import { useMutate } from '../../use-mutate'
import { ResponseError } from '../../../types/api.types'
import { updateConversationTypingService } from '../../../services/conversation.services'
import { ConversationTypingPayload } from '../../../types/conversation.types'

const useUpdateConversationTyping = () =>
  useMutate<void, AxiosError<ResponseError>, ConversationTypingPayload>(
    (payload) => updateConversationTypingService(payload).then(() => undefined)
  )

export default useUpdateConversationTyping
