import { default as React } from 'react';
import { Conversation } from '../types/conversation.types';
interface BtnCloseConversationProps extends Omit<React.ComponentProps<'button'>, 'onClick'> {
    conversation: Conversation;
    isClosed?: boolean;
    isClosing?: boolean;
    onCloseConversation?: () => void;
    showResolvedBadge?: boolean;
    className?: string;
}
export declare function BtnCloseConversation({ conversation, isClosed, isClosing, onCloseConversation, showResolvedBadge, className, ...props }: BtnCloseConversationProps): React.JSX.Element | null;
export {};
