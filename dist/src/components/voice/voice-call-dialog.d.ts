import { default as React } from 'react';
import { VoiceCallEndResult } from '../../types/voice.types';
export interface VoiceCallDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    sessionId: string;
    conversationId?: string | number;
    userId?: string | number;
    userAuthId?: string | number;
    senderMessengerId?: string | number;
    wsUrl?: string;
    onCallEnded?: (result: VoiceCallEndResult) => void;
}
export declare function VoiceCallDialog({ open, onOpenChange, sessionId, conversationId, userId, userAuthId, senderMessengerId, wsUrl, onCallEnded }: VoiceCallDialogProps): React.JSX.Element | null;
