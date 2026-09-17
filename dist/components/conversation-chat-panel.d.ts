import { default as React } from 'react';
import { Conversation } from '../types/conversation.types';
export interface ConversationChatPanelProps {
    conversation: Conversation;
    onToggleContextPanel?: () => void;
    isContextPanelOpen?: boolean;
    onBack?: () => void;
    alwaysShowBackButton?: boolean;
    onCloseSuccess?: () => void;
}
export declare function ConversationChatPanel({ conversation, onToggleContextPanel, isContextPanelOpen, onBack, alwaysShowBackButton, onCloseSuccess }: ConversationChatPanelProps): React.JSX.Element;
