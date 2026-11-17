import { AxiosResponse } from 'axios';
import { ConversationMessage, Message, MessageParams } from '../../../types/message.types';
import { ResponseApiMessage } from '../../../types/api.types';
interface Props {
    params: MessageParams;
    enabled?: boolean;
}
declare const useListMessages: ({ params, enabled }: Props) => {
    data: ConversationMessage[];
    rawPages: AxiosResponse<ResponseApiMessage<ConversationMessage[]>, any, {}, any>[];
    isLoading: boolean;
    isPending: boolean;
    isFetching: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<void>;
    errors: any;
    refetch: () => Promise<void>;
    prependIncomingMessage: (message: Message) => void;
    meta: {
        path: string;
        per_page: number;
        next_cursor: string | null;
        prev_cursor: string | null;
        has_more: boolean;
    } | undefined;
};
export default useListMessages;
