import { default as React } from 'react';
import { VoiceCallContextBadges } from '../../types/voice.types';
export interface VoiceCallEndedSummaryProps {
    formattedDuration: string;
    transcriptsCount: number;
    outcomeType: string;
    contextBadges: VoiceCallContextBadges;
    sessionId?: string;
    conversationId?: string | number;
    onClose: (wasResolved?: boolean) => void;
    onSubmitRating?: (data: {
        rating: number;
        comment: string;
        helpful: boolean;
    }) => Promise<void> | void;
}
export declare function VoiceCallEndedSummary({ formattedDuration, transcriptsCount, outcomeType, contextBadges, sessionId, conversationId, onClose, onSubmitRating }: VoiceCallEndedSummaryProps): React.JSX.Element;
