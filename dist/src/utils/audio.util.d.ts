export type NotificationSoundType = 'focused' | 'unfocused';
export interface PlaySoundOptions {
    /**
     * Intervalo mínimo en milisegundos para evitar repeticiones sucesivas.
     * Por defecto: 1000ms (1 segundo).
     */
    throttleMs?: number;
    /**
     * Factor multiplicador de volumen (0.0 a 1.0).
     * Por defecto: 1.0.
     */
    volume?: number;
    /**
     * Ignora el throttle y fuerza la reproducción inmediata.
     */
    force?: boolean;
}
/**
 * Reproduce un sonido de notificación sintético mediante Web Audio API.
 * Aplica rate-limiting (throttle) de 1 segundo por defecto para evitar sonidos repetidos.
 *
 * @param type - 'focused' para tono sutil en chat activo, 'unfocused' para tono de alerta general
 * @param options - Opciones de throttle y volumen
 * @returns boolean indicando si el sonido fue reproducido
 */
export declare function playNotificationSound(type?: NotificationSoundType, options?: PlaySoundOptions): boolean;
