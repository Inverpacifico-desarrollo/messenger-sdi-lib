import { AxiosError } from 'axios';
import { ResponseError } from '../../../types/api.types';
import { Conversation, CreateConversationPayload } from '../../../types/conversation.types';
declare const useCreateConversation: () => {
    data: Conversation | undefined;
    error: AxiosError<ResponseError, any, any> | null;
    isPending: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
    mutate: (variables: CreateConversationPayload, callOptions?: import('../../use-mutate').UseMutateOptions<Conversation, AxiosError<ResponseError, any, any>, CreateConversationPayload> | undefined) => void;
    mutateAsync: (variables: CreateConversationPayload) => Promise<Conversation>;
};
export default useCreateConversation;
