import { Conversation } from '../types/conversation.types';
import { ConversationMessage, Message } from '../types/message.types';
export interface UseConversationChatOptions {
    onCloseSuccess?: () => void;
}
export declare const useConversationChat: (conversation: Conversation, options?: UseConversationChatOptions) => {
    messages: ConversationMessage[];
    optimisticMessages: Message[];
    scrollRef: import('react').RefObject<HTMLDivElement>;
    conversationName: string;
    inputText: string;
    pendingFile: File | null;
    isClosed: boolean;
    isClosing: boolean;
    isSending: boolean;
    isUploading: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    isLoading: boolean;
    isNearBottom: boolean;
    newMessagesCount: number;
    typingUser: string | null;
    visibleDate: string;
    currentUser: import('..').UserChat | null;
    currentUserId: string;
    scrollToBottom: () => void;
    setInputText: (text: string) => void;
    setPendingFile: import('react').Dispatch<import('react').SetStateAction<File | null>>;
    handleSendMessage: () => Promise<void>;
    handleSelectFile: (file: File) => void;
    handleCloseConversation: () => Promise<void>;
};
export default useConversationChat;
