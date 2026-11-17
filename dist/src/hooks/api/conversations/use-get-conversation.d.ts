import { Conversation } from '../../../types/conversation.types';
interface Props {
    conversationId?: string;
    enabled?: boolean;
}
declare const useGetConversation: ({ conversationId, enabled }?: Props) => {
    data: Conversation | null;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    errors: any;
    refetch: () => Promise<import('axios').AxiosResponse<import('../../../types/api.types').ResponseAPI<Conversation>, any, {}, any> | undefined>;
};
export default useGetConversation;
