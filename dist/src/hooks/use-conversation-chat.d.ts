import { default as React } from 'react';
import { Conversation } from '../types/conversation.types';
import { ConversationMessage, Message } from '../types/message.types';
import { UserChat } from '../types/user-chat.types';
export interface UseConversationChatOptions {
    onCloseSuccess?: () => void;
}
export declare const useConversationChat: (conversation: Conversation, options?: UseConversationChatOptions) => {
    messages: ConversationMessage[];
    optimisticMessages: Message[];
    scrollRef: React.RefObject<HTMLDivElement>;
    conversationName: string;
    inputText: string;
    pendingFile: File | null;
    isClosed: boolean;
    isClosing: boolean;
    isSending: boolean;
    isBotStreaming: boolean;
    isUploading: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    isLoading: boolean;
    isNearBottom: boolean;
    newMessagesCount: number;
    typingUser: string | null;
    visibleDate: string;
    currentUser: UserChat | null;
    currentUserId: string;
    scrollToBottom: () => void;
    setInputText: (text: string) => void;
    setPendingFile: React.Dispatch<React.SetStateAction<File | null>>;
    handleSendMessage: (customText?: string) => Promise<void>;
    handleSelectFile: (file: File) => void;
    handleCloseConversation: () => Promise<void>;
    refetchMessages: () => Promise<void>;
};
export default useConversationChat;
