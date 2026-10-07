import { default as React } from 'react';
interface FloatingChatHomeViewProps {
    title: string;
    canRequestSupport: boolean;
    canViewChatList: boolean;
    totalUnreadCount: number;
    conversationsCount: number;
    onRequestSupport: () => void;
    onViewChatList: () => void;
    onClose: () => void;
    onNewConversation: () => void;
    onDragStart: (e: React.PointerEvent) => void;
}
export declare function FloatingChatHomeView({ title, canRequestSupport, canViewChatList, totalUnreadCount, conversationsCount, onRequestSupport, onViewChatList, onClose, onNewConversation, onDragStart }: FloatingChatHomeViewProps): React.JSX.Element;
export {};
