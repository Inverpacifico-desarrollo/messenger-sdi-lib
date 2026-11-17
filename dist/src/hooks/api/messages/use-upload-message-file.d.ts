import { AxiosError } from 'axios';
import { ResponseError } from '../../../types/api.types';
import { Message, UploadMessageFilePayload } from '../../../types/message.types';
interface UploadMessageFileHookPayload extends UploadMessageFilePayload {
    conversationId: string;
}
declare const useUploadMessageFile: () => {
    data: Message | undefined;
    error: AxiosError<ResponseError, any, any> | null;
    isPending: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
    mutate: (variables: UploadMessageFileHookPayload, callOptions?: import('../../use-mutate').UseMutateOptions<Message, AxiosError<ResponseError, any, any>, UploadMessageFileHookPayload> | undefined) => void;
    mutateAsync: (variables: UploadMessageFileHookPayload) => Promise<Message>;
};
export default useUploadMessageFile;
