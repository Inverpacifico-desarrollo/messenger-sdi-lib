import { default as React } from 'react';
import { Message } from '../types/message.types';
interface ConversationMessageItemProps {
    message: Message;
    isOwnMessage: boolean;
    isGroup: boolean;
    conversationName: string;
    conversationAvatarUrl?: string;
}
export declare function ConversationMessageItem({ message, isOwnMessage, isGroup, conversationName, conversationAvatarUrl }: ConversationMessageItemProps): React.JSX.Element;
export {};
