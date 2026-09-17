import { default as React } from 'react';
import { RequestChatSupportPayload } from '../types/chat-support.types';
export interface RequestSupportFormProps {
    userId: number | string;
    userName?: string;
    onSubmit: (payload: RequestChatSupportPayload) => Promise<void> | void;
    isSubmitting?: boolean;
    error?: string | null;
    onCancel?: () => void;
}
export declare function RequestSupportForm({ userId, userName, onSubmit, isSubmitting, error, onCancel }: RequestSupportFormProps): React.JSX.Element;
export default RequestSupportForm;
