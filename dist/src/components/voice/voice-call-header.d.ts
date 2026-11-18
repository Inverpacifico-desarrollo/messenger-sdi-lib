import { default as React } from 'react';
import { VoiceCallContextBadges, VoiceCallState } from '../../types/voice.types';
export interface VoiceCallHeaderProps {
    callState: VoiceCallState;
    isConnecting: boolean;
    isEnded: boolean;
    formattedDuration: string;
    contextBadges: VoiceCallContextBadges;
    onMinimize?: () => void;
}
export declare function VoiceCallHeader({ callState, isConnecting, isEnded, formattedDuration, contextBadges }: VoiceCallHeaderProps): React.JSX.Element;
