import { default as React } from 'react';
import { UserChat } from '../types/user-chat.types';
export interface ChatConfig {
    apiBaseUrl: string;
    authToken: string;
    applicationId: string | number;
    reverb: {
        key: string;
        host: string;
        port: number;
        wsPath: string;
        scheme: 'http' | 'https';
    };
}
export interface ChatContextValue {
    currentUser: UserChat | null;
    currentUserId: string;
    permissions: string[];
    isLoadingUser: boolean;
    hasError: boolean;
    error: Error | null;
    config: ChatConfig;
    setCurrentUser: (user: UserChat) => void;
}
export interface ChatProviderProps {
    config: ChatConfig;
    children: React.ReactNode;
}
export declare function ChatProvider({ config, children }: ChatProviderProps): React.JSX.Element;
export declare function useOptionalChatContext(): ChatContextValue | null;
export declare function useChatContext(): ChatContextValue;
