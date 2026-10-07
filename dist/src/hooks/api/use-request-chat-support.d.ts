import { AxiosError } from 'axios';
import { ResponseError } from '../../types/api.types';
import { RequestChatSupportPayload, RequestChatSupportResponse } from '../../types/chat-support.types';
export declare const useRequestChatSupport: () => {
    data: RequestChatSupportResponse | undefined;
    error: AxiosError<ResponseError, any, any> | null;
    isPending: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
    mutate: (variables: RequestChatSupportPayload, callOptions?: import('../use-mutate').UseMutateOptions<RequestChatSupportResponse, AxiosError<ResponseError, any, any>, RequestChatSupportPayload> | undefined) => void;
    mutateAsync: (variables: RequestChatSupportPayload) => Promise<RequestChatSupportResponse>;
};
export default useRequestChatSupport;
