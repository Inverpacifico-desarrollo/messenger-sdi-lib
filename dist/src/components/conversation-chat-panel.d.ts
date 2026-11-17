import { default as React } from 'react';
import { Conversation } from '../types/conversation.types';
import { EscalateChatSupportResponse, ResolveChatSupportResponse } from '../types/chat-support.types';
import { ConversationChatHeaderRenderOptions } from './conversation-chat-header';
export interface ConversationChatPanelProps {
    conversation: Conversation;
    onToggleContextPanel?: () => void;
    isContextPanelOpen?: boolean;
    onBack?: () => void;
    alwaysShowBackButton?: boolean;
    onCloseSuccess?: () => void;
    onEscalateSuccess?: (response: EscalateChatSupportResponse) => void;
    onResolveSuccess?: (response: ResolveChatSupportResponse) => void;
    showHeader?: boolean;
    showWallpaper?: boolean;
    readOnly?: boolean;
    readOnlyMessage?: string;
    showComposer?: boolean;
    renderOptions?: ConversationChatHeaderRenderOptions;
}
export declare function ConversationChatPanel({ conversation, onToggleContextPanel, isContextPanelOpen, onBack, alwaysShowBackButton, onCloseSuccess, onEscalateSuccess, onResolveSuccess, showHeader, showWallpaper, readOnly, readOnlyMessage, showComposer, renderOptions }: ConversationChatPanelProps): React.JSX.Element;
