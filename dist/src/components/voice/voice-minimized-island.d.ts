import { default as React } from 'react';
import { VoiceCallState } from '../../types/voice.types';
export interface VoiceMinimizedIslandProps {
    visible: boolean;
    callState: VoiceCallState;
    formattedDuration: string;
    isMuted: boolean;
    hasPermission: boolean | null;
    position?: 'top' | 'bottom';
    onPositionChange?: (position: 'top' | 'bottom') => void;
    onToggleMute: () => void;
    onMaximize: () => void;
    onHangup: () => void;
}
export declare function VoiceMinimizedIsland({ visible, callState, formattedDuration, isMuted, hasPermission, position: initialPosition, onPositionChange, onToggleMute, onMaximize, onHangup }: VoiceMinimizedIslandProps): React.ReactPortal | null;
