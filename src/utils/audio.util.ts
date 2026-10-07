export type NotificationSoundType = 'focused' | 'unfocused'

export interface PlaySoundOptions {
  /**
   * Intervalo mínimo en milisegundos para evitar repeticiones sucesivas.
   * Por defecto: 1000ms (1 segundo).
   */
  throttleMs?: number
  /**
   * Factor multiplicador de volumen (0.0 a 1.0).
   * Por defecto: 1.0.
   */
  volume?: number
  /**
   * Ignora el throttle y fuerza la reproducción inmediata.
   */
  force?: boolean
}

let lastSoundPlayedAt = 0
const DEFAULT_THROTTLE_MS = 1000
let audioContextInstance: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext

    if (!AudioContextClass) return null

    if (!audioContextInstance || audioContextInstance.state === 'closed') {
      audioContextInstance = new AudioContextClass()
    }

    if (audioContextInstance.state === 'suspended') {
      void audioContextInstance.resume()
    }

    return audioContextInstance
  } catch {
    return null
  }
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  peakGain: number
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(frequency, startTime)

  // Envolvente suave con ataque y decaimiento exponencial
  gain.gain.setValueAtTime(0.0001, startTime)
  gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(startTime)
  osc.stop(startTime + duration + 0.05)
}

/**
 * Reproduce un sonido de notificación sintético mediante Web Audio API.
 * Aplica rate-limiting (throttle) de 1 segundo por defecto para evitar sonidos repetidos.
 *
 * @param type - 'focused' para tono sutil en chat activo, 'unfocused' para tono de alerta general
 * @param options - Opciones de throttle y volumen
 * @returns boolean indicando si el sonido fue reproducido
 */
export function playNotificationSound(
  type: NotificationSoundType = 'focused',
  options: PlaySoundOptions = {}
): boolean {
  if (typeof window === 'undefined') return false

  const throttleMs = options.throttleMs ?? DEFAULT_THROTTLE_MS
  const now = Date.now()

  if (!options.force && now - lastSoundPlayedAt < throttleMs) {
    return false
  }

  lastSoundPlayedAt = now

  const ctx = getAudioContext()
  if (!ctx) return false

  const volume = Math.max(0, Math.min(1, options.volume ?? 1))

  try {
    const nowTime = ctx.currentTime

    if (type === 'focused') {
      // Tono sutil agradable: D5 (587.33Hz) -> A5 (880Hz)
      playTone(ctx, 587.33, nowTime, 0.08, 0.12 * volume)
      playTone(ctx, 880.0, nowTime + 0.06, 0.14, 0.10 * volume)
    } else {
      // Tono de alerta armónico ascendente: C5 (523.25Hz) -> E5 (659.25Hz) -> G5 (783.99Hz)
      playTone(ctx, 523.25, nowTime, 0.1, 0.15 * volume)
      playTone(ctx, 659.25, nowTime + 0.08, 0.1, 0.14 * volume)
      playTone(ctx, 783.99, nowTime + 0.16, 0.22, 0.16 * volume)
    }

    return true
  } catch {
    return false
  }
}
