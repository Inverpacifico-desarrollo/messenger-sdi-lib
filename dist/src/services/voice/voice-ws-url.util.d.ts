import { VoiceConnectionParams } from '../../types/voice.types';
/**
 * Construye la URL WebSocket canónica para el Gateway de Voz (`sdi_helpdesk_voice-service`).
 * Prioriza `wsUrl` explícita; si no se provee, la deriva automáticamente de `apiBaseUrl`
 * apuntando a `/messenger_voice/ws/voice/call`.
 */
export declare function buildVoiceWebSocketUrl({ wsUrl, apiBaseUrl, host, port, sessionId, userId, userAuthId, conversationId, senderMessengerId }: VoiceConnectionParams): string;
