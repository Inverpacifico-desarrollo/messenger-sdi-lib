import { AxiosError } from 'axios';
import { ResponseError } from '../../types/api.types';
import { EscalateChatSupportPayload, EscalateChatSupportResponse } from '../../types/chat-support.types';
import { Conversation } from '../../types/conversation.types';
export declare function buildEscalatedConversation(data: EscalateChatSupportResponse): Conversation | null;
export declare const useEscalateChatSupport: () => {
    data: EscalateChatSupportResponse | undefined;
    error: AxiosError<ResponseError, any, any> | null;
    isPending: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
    mutate: (variables: EscalateChatSupportPayload, callOptions?: import('../use-mutate').UseMutateOptions<EscalateChatSupportResponse, AxiosError<ResponseError, any, any>, EscalateChatSupportPayload> | undefined) => void;
    mutateAsync: (variables: EscalateChatSupportPayload) => Promise<EscalateChatSupportResponse>;
};
export default useEscalateChatSupport;
