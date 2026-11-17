import { default as React } from 'react';
import { Conversation } from '../types/conversation.types';
export interface NewConversationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: (conversation: Conversation) => void;
}
export declare function NewConversationDialog({ open, onOpenChange, onSuccess }: NewConversationDialogProps): React.JSX.Element;
