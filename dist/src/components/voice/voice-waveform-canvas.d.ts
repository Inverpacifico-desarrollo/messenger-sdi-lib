import { default as React } from 'react';
import { VoiceCallState } from '../../types/voice.types';
export interface VoiceWaveformCanvasProps {
    state: VoiceCallState;
    isMuted?: boolean;
    className?: string;
    height?: number | string;
    /** Nodo Analyser de la API Web Audio para hacer reaccionar la onda al micrófono en vivo */
    analyserNode?: AnalyserNode | null;
    /** Nivel RMS de salida del asistente (0.0 a 1.0) para sincronizar la onda con la voz del bot */
    botRms?: number;
    /** Estado del permiso del micrófono: false apaga completamente la onda */
    hasPermission?: boolean | null;
}
export declare function VoiceWaveformCanvas({ state, isMuted, className, height, analyserNode, botRms, hasPermission }: VoiceWaveformCanvasProps): React.JSX.Element;
