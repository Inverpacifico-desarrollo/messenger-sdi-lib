import { default as React } from 'react';
import { Conversation } from '../types/conversation.types';
import { ConversationMessage, Message, MessageActionButton } from '../types/message.types';
interface ConversationMessagesListProps {
    conversation: Conversation;
    messages: ConversationMessage[];
    optimisticMessages?: Message[];
    scrollRef?: React.RefObject<HTMLDivElement | null>;
    isFetchingNextPage?: boolean;
    hasNextPage?: boolean;
    isLoading?: boolean;
    isNearBottom?: boolean;
    newMessagesCount?: number;
    visibleDate?: string;
    disableActions?: boolean;
    onScrollToBottom?: () => void;
    onActionClick?: (action: MessageActionButton) => void;
}
export declare function ConversationMessagesList({ conversation, messages, optimisticMessages, scrollRef, isFetchingNextPage, hasNextPage, isLoading, isNearBottom, newMessagesCount, visibleDate, disableActions, onScrollToBottom, onActionClick }: ConversationMessagesListProps): React.JSX.Element;
export {};
