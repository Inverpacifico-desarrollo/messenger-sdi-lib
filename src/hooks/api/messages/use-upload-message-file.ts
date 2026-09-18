import { AxiosError } from 'axios'
import { useMutate } from '../../use-mutate'
import { ResponseError } from '../../../types/api.types'
import { uploadMessageFileService } from '../../../services/message.services'
import { Message, UploadMessageFilePayload } from '../../../types/message.types'

interface UploadMessageFileHookPayload extends UploadMessageFilePayload {
  conversationId: string
}

const useUploadMessageFile = () =>
  useMutate<Message, AxiosError<ResponseError>, UploadMessageFileHookPayload>(
    ({ conversationId, file, sender_id, caption }) =>
      uploadMessageFileService(conversationId, { file, sender_id, caption }).then(
        (response) => response.data.data
      )
  )

export default useUploadMessageFile
