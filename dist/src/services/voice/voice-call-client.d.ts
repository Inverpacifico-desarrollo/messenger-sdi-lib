import { VoiceCallCallbacks, VoiceConnectionParams } from '../../types/voice.types';
export interface VoiceCallClientOptions {
    onAnalyserReady?: (analyser: AnalyserNode | null) => void;
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
    private isDisposed;
    private levelIntervalId;
    private heartbeatIntervalId;
    constructor(config: VoiceConnectionParams, callbacks?: VoiceCallCallbacks, options?: VoiceCallClientOptions);
    isConnected(): boolean;
    getAnalyserNode(): AnalyserNode | null;
    start(): Promise<void>;
    private handleJsonEvent;
    setMuted(muted: boolean): void;
    sendImage(dataUrlOrBase64: string, mimeType?: string): void;
    sendTextPrompt(text: string): void;
    hangup(options?: {
        autoHangup?: boolean;
    }): Promise<void>;
    cleanup(): void;
}
