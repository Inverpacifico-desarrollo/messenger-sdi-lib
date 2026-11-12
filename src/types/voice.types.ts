export type VoiceCallState =
  | 'idle'
  | 'requesting_permission'
  | 'connecting'
  | 'connected'
  | 'speaking'
  | 'listening'
  | 'muted'
  | 'ended'
  | 'error'

export interface VoiceCallContextBadges {
  sessionId?: string | null
  terminalId?: string | null
  ticketNumber?: string | null
  serviceName?: string | null
  posLocation?: string | null
}

export interface VoiceTranscriptItem {
  id: string
  sender: 'assistant' | 'user'
  text: string
  timestamp: string
  isFinal?: boolean
}

// Comandos de cliente WebSocket
export interface VoiceClientPingCommand {
  type: 'ping'
}

export interface VoiceClientMuteCommand {
  type: 'mute'
  muted: boolean
}

export interface VoiceClientHangupCommand {
  type: 'hangup'
  auto_hangup?: boolean
}

export type VoiceClientCommand =
  | VoiceClientPingCommand
  | VoiceClientMuteCommand
  | VoiceClientHangupCommand

// Eventos del servidor WebSocket
export interface VoiceSessionReadyEvent {
  type: 'session.ready'
  session_id: string
  context?: VoiceCallContextBadges
}

export interface VoiceAssistantSpeakingEvent {
  type: 'assistant.speaking'
  amplitude?: number
}

export interface VoiceAssistantTurnCompleteEvent {
  type: 'assistant.turn_complete'
}

export interface VoiceAssistantTranscriptEvent {
  type: 'assistant.transcript'
  role: 'assistant' | 'user'
  text: string
  is_final: boolean
}

export type VoiceServerEvent =
  | VoiceSessionReadyEvent
  | VoiceAssistantSpeakingEvent
  | VoiceAssistantTurnCompleteEvent
  | VoiceAssistantTranscriptEvent

export interface VoiceConnectionParams {
  host?: string
  port?: number | string
  sessionId: string
  userId: string | number
  conversationId: string | number
  senderMessengerId: string | number
}

