import { default as React } from 'react';
import { RequestChatSupportPayload } from '../../../types/chat-support.types';
interface FloatingChatFormViewProps {
    userId?: string | number;
    userName: string;
    canViewChatList: boolean;
    totalUnreadCount: number;
    isSubmitting: boolean;
    error?: string;
    onHome: () => void;
    onViewChats: () => void;
    onClose: () => void;
    onSubmit: (payload: RequestChatSupportPayload) => Promise<void>;
    onNewConversation: () => void;
    onDragStart: (e: React.PointerEvent) => void;
}
export declare function FloatingChatFormView({ userId, userName, canViewChatList, totalUnreadCount, isSubmitting, error, onHome, onViewChats, onClose, onSubmit, onNewConversation, onDragStart }: FloatingChatFormViewProps): React.JSX.Element;
export {};
