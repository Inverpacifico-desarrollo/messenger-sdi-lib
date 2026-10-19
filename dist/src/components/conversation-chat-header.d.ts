import { default as React } from 'react';
import { Conversation } from '../types/conversation.types';
export interface ConversationChatHeaderRenderOptions {
    customHeaderButtons?: React.ReactNode;
}
export type ConversationRenderOptions = ConversationChatHeaderRenderOptions;
export interface ConversationChatHeaderProps {
    conversation: Conversation;
    isClosed: boolean;
    isClosing?: boolean;
    onCloseConversation: () => void;
    isContextPanelOpen?: boolean;
    onToggleContextPanel?: () => void;
    onBack?: () => void;
    alwaysShowBackButton?: boolean;
    renderOptions?: ConversationChatHeaderRenderOptions;
}
export declare function ConversationChatHeader({ conversation, isClosed, isClosing, onCloseConversation, isContextPanelOpen, onToggleContextPanel, onBack, alwaysShowBackButton, renderOptions, }: ConversationChatHeaderProps): React.JSX.Element;
