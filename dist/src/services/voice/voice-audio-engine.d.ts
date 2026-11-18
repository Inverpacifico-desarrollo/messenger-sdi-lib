export interface VoiceAudioEngineOptions {
    onPcmChunk?: (buffer: ArrayBuffer, rms: number) => void;
    onAnalyserReady?: (analyser: AnalyserNode | null) => void;
    onOutputAnalyserReady?: (analyser: AnalyserNode | null) => void;
}
/**
 * Motor Web Audio API autónomo para llamadas full-duplex:
 * - Entrada: Captura de micrófono con downsampling a 16,000 Hz Mono Int16 (AudioWorklet + fallback ScriptProcessor).
 * - Salida: Reproducción secuencial de PCM 24,000 Hz Int16 sin cortes ni solapamientos con AnalyserNode de salida en vivo.
 * - Barge-in instantáneo (< 20 ms) y drenado seguro de despedida.
 */
export declare class VoiceAudioEngine {
    private options;
    private inputAudioCtx;
    private outputAudioCtx;
    private mediaStream;
    private analyserNode;
    private outputAnalyserNode;
    private workletNode;
    private scriptProcessor;
    private silentGain;
    private activeSources;
    private nextPlayTime;
    private isDisposed;
    private isMuted;
    private isDrainingFarewell;
    private latestUserRms;
    private latestBotRms;
    constructor(options?: VoiceAudioEngineOptions);
    getAnalyserNode(): AnalyserNode | null;
    getOutputAnalyserNode(): AnalyserNode | null;
    getLevelsAndDecay(): {
        userRms: number;
        botRms: number;
    };
    setMuted(muted: boolean): void;
    /**
     * Inicializa el contexto de reproducción de salida a 24,000 Hz dentro del gesto del usuario.
     */
    initOutput(): Promise<void>;
    /**
     * Inicializa la captura del micrófono a 16,000 Hz Mono Int16 con AnalyserNode para el ecualizador.
     */
    initMicrophone(): Promise<void>;
    private initScriptProcessorFallback;
    /**
     * Reproduce un chunk binario PCM 16-bit little-endian a 24,000 Hz secuencialmente.
     */
    playAudioChunk(arrayBuffer: ArrayBuffer): void;
    /**
     * Interrupción instantánea (Barge-in): purga la cola de reproducción en < 20 ms.
     */
    stopPlaybackImmediately(): void;
    /**
     * Espera a que la locución programada en el AudioContext termine por completo
     * antes de cerrar la conexión WebSocket, evitando cortes en la despedida.
     */
    waitForAudioPlaybackDrain(): Promise<void>;
    stopMicrophoneImmediate(): void;
    dispose(): void;
}
