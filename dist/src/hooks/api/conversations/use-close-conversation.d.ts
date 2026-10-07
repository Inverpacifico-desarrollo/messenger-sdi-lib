import { AxiosError } from 'axios';
import { ResponseError } from '../../../types/api.types';
import { Conversation } from '../../../types/conversation.types';
declare const useCloseConversation: () => {
    data: Conversation | undefined;
    error: AxiosError<ResponseError, any, any> | null;
    isPending: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
    mutate: (variables: string, callOptions?: import('../../use-mutate').UseMutateOptions<Conversation, AxiosError<ResponseError, any, any>, string> | undefined) => void;
    mutateAsync: (variables: string) => Promise<Conversation>;
};
export default useCloseConversation;
