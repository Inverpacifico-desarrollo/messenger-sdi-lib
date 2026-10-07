import { Conversation } from '../types/conversation.types';
export interface UseConversationsPageOptions {
    showToastOnUnread?: boolean;
}
export declare const useConversationsPage: ({ showToastOnUnread }?: UseConversationsPageOptions) => {
    conversations: Conversation[];
    selectedId: string;
    setSelectedId: import('react').Dispatch<import('react').SetStateAction<string>>;
    selectedConversation: Conversation | undefined;
    closedFilter: "0" | "1";
    setClosedFilter: import('react').Dispatch<import('react').SetStateAction<"0" | "1">>;
    typeFilter: "group" | "bot" | "direct" | "all";
    setTypeFilter: import('react').Dispatch<import('react').SetStateAction<"group" | "bot" | "direct" | "all">>;
    searchQuery: string;
    setSearchQuery: import('react').Dispatch<import('react').SetStateAction<string>>;
    isContextPanelOpen: boolean;
    isMobileChatOpen: boolean;
    isNewConversationOpen: boolean;
    isLoading: boolean;
    errors: any;
    hasReadPermission: boolean;
    currentUser: import('..').UserChat | null;
    currentUserId: string;
    selectConversation: (id: string) => void;
    unselectConversation: () => void;
    setIsContextPanelOpen: import('react').Dispatch<import('react').SetStateAction<boolean>>;
    setIsNewConversationOpen: import('react').Dispatch<import('react').SetStateAction<boolean>>;
    goBackToConversationList: () => void;
    handleConversationCreated: (conversation: Conversation) => void;
};
export default useConversationsPage;
