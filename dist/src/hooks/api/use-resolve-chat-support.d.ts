import { AxiosError } from 'axios';
import { ResponseError } from '../../types/api.types';
import { ResolveChatSupportPayload, ResolveChatSupportResponse } from '../../types/chat-support.types';
export declare const useResolveChatSupport: () => {
    data: ResolveChatSupportResponse | undefined;
    error: AxiosError<ResponseError, any, any> | null;
    isPending: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
    mutate: (variables: ResolveChatSupportPayload, callOptions?: import('../use-mutate').UseMutateOptions<ResolveChatSupportResponse, AxiosError<ResponseError, any, any>, ResolveChatSupportPayload> | undefined) => void;
    mutateAsync: (variables: ResolveChatSupportPayload) => Promise<ResolveChatSupportResponse>;
};
export default useResolveChatSupport;
