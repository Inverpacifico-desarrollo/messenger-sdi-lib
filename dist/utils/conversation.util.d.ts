import { Conversation } from '../types/conversation.types';
import { UserChat } from '../types/user-chat.types';
export declare const mockGetUserLogged: () => UserChat;
export declare const capitalizeWords: (str?: string | null) => string;
export declare const isGroupConversation: (conversation: Conversation) => boolean;
export declare const getConversationUser: (conversation: Conversation, currentUserId?: string | number) => UserChat | undefined;
export declare const getConversationName: (conversation: Conversation, currentUserId?: string | number) => string;
