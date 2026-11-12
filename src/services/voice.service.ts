import type {
  VoiceCallState,
  VoiceCallContextBadges,
  VoiceTranscriptItem,
  VoiceConnectionParams
} from '../types/voice.types'

export function buildVoiceWebSocketUrl({
  host = 'preview-sdi-services-helpdeskservice-nshtoc-ijvejp.ganebyd.com',
  port,
  sessionId,
  userId,
  conversationId,
  senderMessengerId
}: VoiceConnectionParams): string {
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:'
  const protocol = isSecure ? 'wss:' : 'ws:'
  const portSuffix = port ? `:${port}` : ''
  const cleanHost = host.replace(/^https?:\/\//, '').replace(/^wss?:\/\//, '').replace(/\/+$/, '')

  const params = new URLSearchParams({
    session_id: String(sessionId),
    user_id: String(userId),
    conversation_id: String(conversationId),
    sender_messenger_id: String(senderMessengerId)
  })

  return `${protocol}//${cleanHost}${portSuffix}/ws/voice/call?${params.toString()}`
}

export interface VoiceCallDriverListeners {
  onStateChange?: (state: VoiceCallState) => void
  onContextReady?: (badges: VoiceCallContextBadges) => void
  onTranscript?: (item: VoiceTranscriptItem) => void
  onError?: (error: Error) => void
}

/**
 * Simulador reactivo de llamada telefónica interactiva para HU-14.2.
 * Permite reproducir turnos de conversación, amplitudes de ondas de audio,
 * silenciamiento y finalización de llamada sin requerir el backend de audio en vivo.
 */
export class MockVoiceCallDriver {
  private state: VoiceCallState = 'idle'
  private isMuted: boolean = false
  private timers: NodeJS.Timeout[] = []
  private pingInterval: NodeJS.Timeout | null = null
  private listeners: VoiceCallDriverListeners = {}
  private amplitudeValue: number = 0

  constructor(listeners: VoiceCallDriverListeners = {}) {
    this.listeners = listeners
  }

  public getAmplitude(): number {
    return this.amplitudeValue
  }

  public connect(params: VoiceConnectionParams) {
    this.clearAllTimers()
    this.setState('connecting')

    // Simulación: Handshake WebSocket (800ms)
    const connectTimer = setTimeout(() => {
      this.setState('connected')

      this.listeners.onContextReady?.({
        sessionId: params.sessionId,
        terminalId: 'POS-TERM-8841',
        ticketNumber: 'INC-2409',
        serviceName: 'Terminal POS Verifone V200c',
        posLocation: 'Caja Principal - Sucursal Norte'
      })

      // Escenario 1 (DoD): El bot saluda verbalmente en menos de 2 segundos
      const greetingTimer = setTimeout(() => {
        this.startAssistantTurn(
          '¡Hola! Soy tu Asistente Virtual de Soporte SDi.\nTe escucho atentamente. ¿Qué inconveniente presenta tu terminal o impresora PGT?'
        )
      }, 1000)

      this.timers.push(greetingTimer)
    }, 800)

    this.timers.push(connectTimer)

    // Heartbeat Keepalive cada 20 segundos según la HU
    this.pingInterval = setInterval(() => {
      // Keepalive simulado
    }, 20000)
  }

  private startAssistantTurn(fullText: string) {
    this.setState('speaking')
    this.amplitudeValue = 0.85

    const transcriptId = 'msg-' + Date.now()
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    // Simulación reactiva de streaming palabra por palabra
    const words = fullText.split(' ')
    let currentWordIndex = 0

    const streamInterval = setInterval(() => {
      currentWordIndex++
      const partialText = words.slice(0, currentWordIndex).join(' ')
      const isFinal = currentWordIndex >= words.length

      this.listeners.onTranscript?.({
        id: transcriptId,
        sender: 'assistant',
        text: partialText,
        timestamp,
        isFinal
      })

      if (isFinal) {
        clearInterval(streamInterval)

        // Pequeño retardo natural al terminar la frase antes de ceder el turno al usuario
        const turnCompleteTimer = setTimeout(() => {
          this.amplitudeValue = 0.15
          if (!this.isMuted) {
            this.setState('listening')
          } else {
            this.setState('muted')
          }
        }, 500)

        this.timers.push(turnCompleteTimer)
      }
    }, 70) // ~70ms por palabra simula cadencia natural de habla por streaming

    this.timers.push(streamInterval as any)
  }

  public simulateUserSpeech(speechText: string) {
    if (this.state !== 'listening') return

    const userTranscriptId = 'user-' + Date.now()
    this.listeners.onTranscript?.({
      id: userTranscriptId,
      sender: 'user',
      text: speechText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFinal: true
    })

    // Respuesta del asistente a la entrada del usuario
    const respondTimer = setTimeout(() => {
      this.startAssistantTurn(
        'Entendido. Por favor desconecta el cable de red de la terminal durante 5 segundos y vuelve a conectarlo firmemente. Avisame cuando veas la luz verde en pantalla.'
      )
    }, 1200)

    this.timers.push(respondTimer)
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
    if (this.state === 'speaking') {
      // El asistente sigue hablando aunque el usuario se mutee
      return
    }

    if (muted) {
      this.amplitudeValue = 0
      this.setState('muted')
    } else {
      this.amplitudeValue = 0.2
      this.setState('listening')
    }
  }

  public hangup() {
    this.clearAllTimers()
    this.amplitudeValue = 0
    this.setState('ended')
  }

  private setState(nextState: VoiceCallState) {
    this.state = nextState
    this.listeners.onStateChange?.(nextState)
  }

  private clearAllTimers() {
    this.timers.forEach((t) => {
      clearTimeout(t)
      clearInterval(t)
    })
    this.timers = []
    if (this.pingInterval) {
      clearInterval(this.pingInterval)
      this.pingInterval = null
    }
  }
}

