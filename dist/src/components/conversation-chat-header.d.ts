import { default as React } from 'react';
import { Conversation } from '../types/conversation.types';
interface ConversationChatHeaderProps {
    conversation: Conversation;
    isClosed: boolean;
    isClosing?: boolean;
    onCloseConversation: () => void;
    isContextPanelOpen?: boolean;
    onToggleContextPanel?: () => void;
    onBack?: () => void;
    alwaysShowBackButton?: boolean;
}
export declare function ConversationChatHeader({ conversation, isClosed, isClosing, onCloseConversation, isContextPanelOpen, onToggleContextPanel, onBack, alwaysShowBackButton }: ConversationChatHeaderProps): React.JSX.Element;
export {};
