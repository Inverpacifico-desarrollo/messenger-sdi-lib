import { default as React } from 'react';
interface FloatingChatButtonProps {
    isOpen: boolean;
    totalUnreadCount: number;
    isLeft: boolean;
    isLoading?: boolean;
    hasError?: boolean;
    onToggleOpen: () => void;
    onPointerDown: (e: React.PointerEvent) => void;
}
export declare function FloatingChatButton({ isOpen, totalUnreadCount, isLeft, isLoading, hasError, onToggleOpen, onPointerDown }: FloatingChatButtonProps): React.JSX.Element;
export {};
