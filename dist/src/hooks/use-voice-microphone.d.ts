export interface UseVoiceMicrophoneOptions {
    /** Activa o desactiva la captura del micrófono */
    enabled?: boolean;
    /** Silencia el stream sin apagar el hardware */
    isMuted?: boolean;
    /** Tamaño FFT para el AnalyserNode (default: 64 para 32 bins de frecuencia) */
    fftSize?: number;
    /** Intervalo en ms para actualizar el estado React del nivel de volumen (default: 50ms) */
    levelUpdateInterval?: number;
}
export interface UseVoiceMicrophoneReturn {
    /** AnalyserNode Web Audio nativo para renderizado directo a 60 FPS en Canvas */
    analyserNode: AnalyserNode | null;
    /** Nivel de volumen normalizado y suavizado (0.0 a 1.0) */
    audioLevel: number;
    /** Indica si el micrófono está capturando audio activamente */
    isRecording: boolean;
    /** Estado del permiso del micrófono: null (sin solicitar), true (otorgado), false (denegado) */
    hasPermission: boolean | null;
    /** Mensaje de error en caso de fallo de hardware o denegación de permisos */
    error: string | null;
    /** Inicia manualmente la captura del micrófono */
    start: () => Promise<void>;
    /** Detiene y libera completamente el hardware del micrófono */
    stop: () => void;
}
/**
 * Hook para capturar el micrófono real del usuario mediante la API Web Audio nativa.
 * Proporciona un AnalyserNode para renderizado reactivo a 60 FPS en Canvas
 * y un `audioLevel` normalizado para medidores VU y componentes React.
 */
export declare function useVoiceMicrophone({ enabled, isMuted, fftSize, levelUpdateInterval }?: UseVoiceMicrophoneOptions): UseVoiceMicrophoneReturn;
