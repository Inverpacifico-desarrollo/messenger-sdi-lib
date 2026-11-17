import { AxiosError } from 'axios';
import { ResponseError } from '../../types/api.types';
import { ChatBotQueueToTicketPayload, ChatBotQueueToTicketResponse } from '../../types/chat-support.types';
export declare const useChatBotQueueToTicket: () => {
    data: ChatBotQueueToTicketResponse | undefined;
    error: AxiosError<ResponseError, any, any> | null;
    isPending: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
    mutate: (variables: ChatBotQueueToTicketPayload, callOptions?: import('../use-mutate').UseMutateOptions<ChatBotQueueToTicketResponse, AxiosError<ResponseError, any, any>, ChatBotQueueToTicketPayload> | undefined) => void;
    mutateAsync: (variables: ChatBotQueueToTicketPayload) => Promise<ChatBotQueueToTicketResponse>;
};
export default useChatBotQueueToTicket;
