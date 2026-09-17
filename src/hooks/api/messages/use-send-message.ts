import { AxiosError } from 'axios'
import { useMutate } from '../../use-mutate'
import { ResponseError } from '../../../types/api.types'
import { createMessageService } from '../../../services/message.services'
import { CreateMessagePayload, Message } from '../../../types/message.types'

interface SendMessagePayload extends CreateMessagePayload {
  conversationId: string
}

const useSendMessage = () =>
  useMutate<Message, AxiosError<ResponseError>, SendMessagePayload>(
    ({ conversationId, body, sender_id }) =>
      createMessageService(conversationId, { body, sender_id }).then(
        (response) => response.data.data
      )
  )

export default useSendMessage
