import { default as React } from 'react';
import { Conversation } from '../types/conversation.types';
export interface ConversationChatPanelProps {
    conversation: Conversation;
    onToggleContextPanel?: () => void;
    isContextPanelOpen?: boolean;
    onBack?: () => void;
    alwaysShowBackButton?: boolean;
    onCloseSuccess?: () => void;
    showHeader?: boolean;
    showWallpaper?: boolean;
    readOnly?: boolean;
    readOnlyMessage?: string;
    showComposer?: boolean;
}
export declare function ConversationChatPanel({ conversation, onToggleContextPanel, isContextPanelOpen, onBack, alwaysShowBackButton, onCloseSuccess, showHeader, showWallpaper, readOnly, readOnlyMessage, showComposer }: ConversationChatPanelProps): React.JSX.Element;
