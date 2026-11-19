import { VoiceCallCallbacks, VoiceConnectionParams } from '../../types/voice.types';
export interface VoiceCallClientOptions {
    onAnalyserReady?: (analyser: AnalyserNode | null) => void;
    onOutputAnalyserReady?: (analyser: AnalyserNode | null) => void;
}
/**
 * Cliente WebSocket full-duplex para el Asistente Telefónico de Voz SDI.
 * Coordina la señalización JSON y el flujo binario PCM con VoiceAudioEngine.
 */
export declare class VoiceCallClient {
    private config;
    private callbacks;
    private ws;
    private audioEngine;
    private connected;
    private wasEverConnected;
    private isDisposed;
    private isCallFinalized;
    private isSimulatingMicroCut;
    private levelIntervalId;
    private heartbeatIntervalId;
    private microCutTimerId;
    private reconnectTimerId;
    constructor(config: VoiceConnectionParams, callbacks?: VoiceCallCallbacks, options?: VoiceCallClientOptions);
    isConnected(): boolean;
    getAnalyserNode(): AnalyserNode | null;
    getOutputAnalyserNode(): AnalyserNode | null;
    start(): Promise<void>;
    private handleJsonEvent;
    setMuted(muted: boolean): void;
    sendImage(dataUrlOrBase64: string, mimeType?: string): void;
    sendTextPrompt(text: string): void;
    hangup(options?: {
        autoHangup?: boolean;
    }): Promise<void>;
    private formatMicrophoneError;
    retryMicrophone(): Promise<boolean>;
    /**
     * Simula un micro-corte de red temporal (p.ej. 2s) pausando tramas PCM
     * y emitiendo la secuencia session.reconnecting -> session.reconnected
     * sin cortar AudioEngine ni finalizar la sesión.
     */
    simulateMicroCut(durationMs?: number): void;
    cleanup(): void;
}
