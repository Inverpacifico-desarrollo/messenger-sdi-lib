import { default as React } from 'react';
import { VoiceCallState } from '../../types/voice.types';
export interface VoiceMinimizedIslandProps {
    visible: boolean;
    callState: VoiceCallState;
    formattedDuration: string;
    isMuted: boolean;
    hasPermission: boolean | null;
    onToggleMute: () => void;
    onMaximize: () => void;
    onHangup: () => void;
}
export declare function VoiceMinimizedIsland({ visible, callState, formattedDuration, isMuted, hasPermission, onToggleMute, onMaximize, onHangup }: VoiceMinimizedIslandProps): React.ReactPortal | null;
