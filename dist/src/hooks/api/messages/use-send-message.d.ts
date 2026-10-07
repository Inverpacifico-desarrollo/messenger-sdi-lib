import { AxiosError } from 'axios';
import { ResponseError } from '../../../types/api.types';
import { CreateMessagePayload, Message } from '../../../types/message.types';
interface SendMessagePayload extends CreateMessagePayload {
    conversationId: string;
}
declare const useSendMessage: () => {
    data: Message | undefined;
    error: AxiosError<ResponseError, any, any> | null;
    isPending: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
    mutate: (variables: SendMessagePayload, callOptions?: import('../../use-mutate').UseMutateOptions<Message, AxiosError<ResponseError, any, any>, SendMessagePayload> | undefined) => void;
    mutateAsync: (variables: SendMessagePayload) => Promise<Message>;
};
export default useSendMessage;
