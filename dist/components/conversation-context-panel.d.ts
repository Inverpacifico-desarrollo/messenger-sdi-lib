import { default as React } from 'react';
import { Conversation } from '../types/conversation.types';
interface ConversationContextPanelProps {
    conversation: Conversation;
    onClose?: () => void;
    className?: string;
}
export declare function ConversationContextPanel({ conversation, onClose, className, }: ConversationContextPanelProps): React.JSX.Element;
export {};
