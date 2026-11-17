import { AxiosError } from 'axios';
import { ResponseError } from '../../../types/api.types';
import { ConversationTypingPayload } from '../../../types/conversation.types';
declare const useUpdateConversationTyping: () => {
    data: void | undefined;
    error: AxiosError<ResponseError, any, any> | null;
    isPending: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
    mutate: (variables: ConversationTypingPayload, callOptions?: import('../../use-mutate').UseMutateOptions<void, AxiosError<ResponseError, any, any>, ConversationTypingPayload> | undefined) => void;
    mutateAsync: (variables: ConversationTypingPayload) => Promise<void>;
};
export default useUpdateConversationTyping;
