import { default as React } from 'react';
export interface ConversationsUserFooterProps {
    onNewConversation?: () => void;
    showNewButton?: boolean;
    className?: string;
}
export declare function ConversationsUserFooter({ onNewConversation, showNewButton, className }: ConversationsUserFooterProps): React.JSX.Element;
export default ConversationsUserFooter;
