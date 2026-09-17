import { InfiniteData } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ConversationMessage, MessageParams } from '../../../types/message.types';
import { ResponseApiMessage } from '../../../types/api.types';
interface Props {
    params: MessageParams;
    enabled?: boolean;
}
declare const useListMessages: ({ params, enabled }: Props) => {
    data: ConversationMessage[];
    rawPages: AxiosResponse<ResponseApiMessage<ConversationMessage[]>, any, {}, any>[] | undefined;
    isLoading: boolean;
    isPending: boolean;
    isFetching: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: (options?: import('@tanstack/query-core').FetchNextPageOptions) => Promise<import('@tanstack/query-core').InfiniteQueryObserverResult<InfiniteData<AxiosResponse<ResponseApiMessage<ConversationMessage[]>, any, {}, any>, unknown>, unknown>>;
    errors: any;
    refetch: (options?: import('@tanstack/query-core').RefetchOptions) => Promise<import('@tanstack/query-core').QueryObserverResult<InfiniteData<AxiosResponse<ResponseApiMessage<ConversationMessage[]>, any, {}, any>, unknown>, unknown>>;
    meta: {
        path: string;
        per_page: number;
        next_cursor: string | null;
        prev_cursor: string | null;
        has_more: boolean;
    } | undefined;
};
export default useListMessages;
