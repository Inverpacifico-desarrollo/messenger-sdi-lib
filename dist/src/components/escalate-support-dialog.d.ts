import { default as React } from 'react';
import { EscalateChatSupportResponse } from '../types/chat-support.types';
import { MessageActionButton } from '../types/message.types';
export interface EscalateSupportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (reason: string) => Promise<void> | void;
    isSubmitting?: boolean;
    error?: string | null;
    queueData?: EscalateChatSupportResponse | null;
    onActionSelect?: (action: MessageActionButton) => void;
    isPollingQueue?: boolean;
    onConvertToTicket?: () => Promise<void> | void;
    isConvertingToTicket?: boolean;
}
export declare function EscalateSupportDialog({ open, onOpenChange, onSubmit, isSubmitting, error, queueData, onActionSelect, isPollingQueue, onConvertToTicket, isConvertingToTicket }: EscalateSupportDialogProps): React.JSX.Element;
export default EscalateSupportDialog;
