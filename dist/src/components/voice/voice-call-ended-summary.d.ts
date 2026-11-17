import { default as React } from 'react';
import { VoiceCallContextBadges } from '../../types/voice.types';
export interface VoiceCallEndedSummaryProps {
    formattedDuration: string;
    transcriptsCount: number;
    outcomeType: string;
    contextBadges: VoiceCallContextBadges;
    onClose: () => void;
}
export declare function VoiceCallEndedSummary({ formattedDuration, transcriptsCount, outcomeType, contextBadges, onClose }: VoiceCallEndedSummaryProps): React.JSX.Element;
