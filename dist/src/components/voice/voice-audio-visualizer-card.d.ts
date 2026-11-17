import { default as React } from 'react';
import { VoiceCallState, VoiceToolState } from '../../types/voice.types';
export interface VoiceAudioVisualizerCardProps {
    callState: VoiceCallState;
    statusText: string;
    isMuted: boolean;
    hasPermission: boolean | null;
    analyserNode: AnalyserNode | null;
    userRms: number;
    botRms: number;
    activeVUSegments: number;
    activeTool: VoiceToolState | null;
    onRequestMicrophone: () => void;
}
export declare function VoiceAudioVisualizerCard({ callState, statusText, isMuted, hasPermission, analyserNode, userRms, botRms, activeVUSegments, activeTool, onRequestMicrophone }: VoiceAudioVisualizerCardProps): React.JSX.Element;
