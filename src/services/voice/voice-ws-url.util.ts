import type { VoiceConnectionParams } from '../../types/voice.types'

/**
 * Construye la URL WebSocket canónica para el Gateway de Voz (`sdi_helpdesk_voice-service`).
 * Prioriza `wsUrl` explícita; si no se provee, la deriva automáticamente de `apiBaseUrl`
 * apuntando a `/messenger_voice/ws/voice/call`.
 */
export function buildVoiceWebSocketUrl({
  wsUrl,
  apiBaseUrl,
  host = '172.16.30.114',
  port,
  sessionId,
  userId,
  userAuthId,
  conversationId,
  senderMessengerId
}: VoiceConnectionParams): string {
  let baseEndpoint = ''

  if (wsUrl?.trim()) {
    const trimmed = wsUrl.trim().replace(/\/+$/, '')
    if (trimmed.startsWith('http://')) {
      baseEndpoint = `ws://${trimmed.slice(7)}`
    } else if (trimmed.startsWith('https://')) {
      baseEndpoint = `wss://${trimmed.slice(8)}`
    } else if (trimmed.startsWith('ws://') || trimmed.startsWith('wss://')) {
      baseEndpoint = trimmed
    } else {
      const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:'
      baseEndpoint = `${isSecure ? 'wss://' : 'ws://'}${trimmed}`
    }
  } else if (apiBaseUrl?.trim()) {
    const cleanApi = apiBaseUrl.trim().replace(/\/+$/, '')
    const wsBase = cleanApi
      .replace(/^https:\/\//i, 'wss://')
      .replace(/^http:\/\//i, 'ws://')
    baseEndpoint = `${wsBase}/messenger_voice/ws/voice/call`
  } else {
    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:'
    const protocol = isSecure ? 'wss:' : 'ws:'
    const effectivePort = port || 8095
    const portSuffix = `:${effectivePort}`
    const cleanHost = host.replace(/^https?:\/\//i, '').replace(/^wss?:\/\//i, '').replace(/\/+$/, '')
    baseEndpoint = `${protocol}//${cleanHost}${portSuffix}/ws/voice/call`
  }

  const params = new URLSearchParams()
  if (sessionId) params.set('session_id', String(sessionId))
  if (userAuthId !== undefined && userAuthId !== null && String(userAuthId) !== '') {
    params.set('user_auth_id', String(userAuthId))
  }
  if (conversationId !== undefined && conversationId !== null && String(conversationId) !== '') {
    params.set('conversation_id', String(conversationId))
  }
  if (userId !== undefined && userId !== null && String(userId) !== '') {
    params.set('user_id', String(userId))
  }
  if (senderMessengerId !== undefined && senderMessengerId !== null && String(senderMessengerId) !== '') {
    params.set('sender_messenger_id', String(senderMessengerId))
  }

  const query = params.toString()
  return query ? `${baseEndpoint}?${query}` : baseEndpoint
}
