import { default as React } from 'react';
import { ChatSupportTicket } from '../types/chat-support.types';
interface SupportNoTechnicianViewProps {
    message?: string;
    ticket?: ChatSupportTicket | null;
    onNewRequest: () => void;
    onViewChats?: () => void;
    onClose?: () => void;
    canViewChatList?: boolean;
}
export declare function SupportNoTechnicianView({ message, ticket, onNewRequest, onViewChats, onClose, canViewChatList }: SupportNoTechnicianViewProps): React.JSX.Element;
export default SupportNoTechnicianView;
