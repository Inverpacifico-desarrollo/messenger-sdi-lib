interface Props {
    conversationId?: string;
    enabled?: boolean;
}
declare const useGetConversation: ({ conversationId, enabled }?: Props) => {
    data: import('../../..').Conversation | null;
    isLoading: boolean;
    isError: boolean;
    errors: any;
    refetch: (options?: import('@tanstack/query-core').RefetchOptions) => Promise<import('@tanstack/query-core').QueryObserverResult<import('axios').AxiosResponse<import('../../../types/api.types').ResponseAPI<import('../../..').Conversation>, any, {}, any>, Error>>;
};
export default useGetConversation;
