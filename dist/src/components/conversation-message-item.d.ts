import { default as React } from 'react';
import { Message, MessageActionButton } from '../types/message.types';
interface ConversationMessageItemProps {
    message: Message;
    isOwnMessage: boolean;
    isGroup: boolean;
    conversationName: string;
    conversationAvatarUrl?: string;
    isBot?: boolean;
    disableActions?: boolean;
    onActionClick?: (action: MessageActionButton) => void;
}
export declare function ConversationMessageItem({ message, isOwnMessage, isGroup, conversationName, conversationAvatarUrl, isBot, disableActions, onActionClick }: ConversationMessageItemProps): React.JSX.Element;
export {};
