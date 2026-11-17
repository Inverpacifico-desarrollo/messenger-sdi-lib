import { AxiosResponse } from 'axios';
import { Conversation, FilterConversation } from '../../../types/conversation.types';
import { ResponseAPI } from '../../../types/api.types';
interface Props {
    params?: FilterConversation;
    enable?: boolean;
}
declare const useListConversations: (props?: Props) => {
    data: Conversation[];
    meta: import('../../../types/api.types').MetaPagination | undefined;
    links: Partial<{
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    }> | undefined;
    isLoading: boolean;
    isFetching: boolean;
    errors: any;
    refetch: () => Promise<AxiosResponse<ResponseAPI<Conversation[]>, any, {}, any> | undefined>;
};
export default useListConversations;
