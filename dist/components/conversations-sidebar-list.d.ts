import { default as React } from 'react';
import { Conversation } from '../types/conversation.types';
export interface ConversationsSidebarListProps {
    conversations: Conversation[];
    selectedId: string;
    onSelectConversation: (id: string) => void;
    searchQuery: string;
    onSearchChange: (val: string) => void;
    closedFilter: '0' | '1';
    onClosedFilterChange: (val: '0' | '1') => void;
    typeFilter: 'all' | 'direct' | 'group' | 'bot';
    onTypeFilterChange: (val: 'all' | 'direct' | 'group' | 'bot') => void;
    onNewConversation?: () => void;
    isLoading?: boolean;
    error?: Error | null;
    onRetry?: () => void;
}
export declare function ConversationsSidebarList({ conversations, selectedId, onSelectConversation, searchQuery, onSearchChange, closedFilter, onClosedFilterChange, typeFilter, onTypeFilterChange, onNewConversation, isLoading }: ConversationsSidebarListProps): React.JSX.Element;
