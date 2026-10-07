import { AxiosError } from 'axios';
import { ResponseError } from '../../../types/api.types';
import { Conversation, MarkConversationAsReadPayload } from '../../../types/conversation.types';
declare const useMarkConversationAsRead: () => {
    data: Conversation | undefined;
    error: AxiosError<ResponseError, any, any> | null;
    isPending: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
    mutate: (variables: MarkConversationAsReadPayload, callOptions?: import('../../use-mutate').UseMutateOptions<Conversation, AxiosError<ResponseError, any, any>, MarkConversationAsReadPayload> | undefined) => void;
    mutateAsync: (variables: MarkConversationAsReadPayload) => Promise<Conversation>;
};
export default useMarkConversationAsRead;
