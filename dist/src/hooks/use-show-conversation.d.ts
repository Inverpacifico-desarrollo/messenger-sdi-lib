import { Conversation, UnreadEvent } from '../types/conversation.types';
import { Message } from '../types/message.types';
export interface UseShowConversationOptions {
    conversationId?: string | number;
    enabled?: boolean;
    showToastOnUnread?: boolean;
    onMessage?: (message: Message) => void;
    onUnread?: (event: UnreadEvent) => void;
}
export declare const useShowConversation: (param?: string | number | UseShowConversationOptions, extraOptions?: Omit<UseShowConversationOptions, "conversationId">) => {
    conversation: Conversation | null;
    isLoading: boolean;
    isError: boolean;
    errors: any;
    refetch: () => Promise<import('axios').AxiosResponse<import('../types/api.types').ResponseAPI<Conversation>, any, {}, any> | undefined>;
    hasReadPermission: boolean;
    currentUser: import('..').UserChat | null;
    currentUserId: string;
};
export default useShowConversation;
