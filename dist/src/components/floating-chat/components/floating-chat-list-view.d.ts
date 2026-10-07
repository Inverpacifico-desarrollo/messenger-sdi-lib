import { default as React } from 'react';
import { Conversation } from '../../../types/conversation.types';
interface FloatingChatListViewProps {
    conversations: Conversation[];
    selectedId: string;
    searchQuery: string;
    closedFilter: '0' | '1';
    typeFilter: 'all' | 'direct' | 'group' | 'bot';
    isLoading: boolean;
    onHome: () => void;
    onClose: () => void;
    onSelectConversation: (id: string) => void;
    onSearchChange: (val: string) => void;
    onClosedFilterChange: (val: '0' | '1') => void;
    onTypeFilterChange: (val: 'all' | 'direct' | 'group' | 'bot') => void;
    onNewConversation: () => void;
    onDragStart: (e: React.PointerEvent) => void;
}
export declare function FloatingChatListView({ conversations, selectedId, searchQuery, closedFilter, typeFilter, isLoading, onHome, onClose, onSelectConversation, onSearchChange, onClosedFilterChange, onTypeFilterChange, onNewConversation, onDragStart }: FloatingChatListViewProps): React.JSX.Element;
export {};
