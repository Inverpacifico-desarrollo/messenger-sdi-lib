export type VoiceCallState = 'idle' | 'requesting_permission' | 'connecting' | 'connected' | 'listening' | 'thinking' | 'speaking' | 'escalating' | 'resolved' | 'reconnecting' | 'muted' | 'ended' | 'error';
export interface VoiceCallContextBadges {
    sessionId?: string | null;
    terminalId?: string | null;
    ticketNumber?: string | null;
    serviceName?: string | null;
    posLocation?: string | null;
    openTicketsCount?: number;
}
export interface VoiceCallerTicket {
    id?: number | string;
    number?: string;
    subject?: string;
    status?: string;
}
export interface VoiceCallerContext {
    user?: {
        id?: number | string;
        name?: string;
        place_name?: string;
        [key: string]: unknown;
    };
    has_open_tickets?: boolean;
    recent_open_tickets?: VoiceCallerTicket[];
    terminal_id?: string;
    ticket_number?: string;
    service_name?: string;
    [key: string]: unknown;
}
export interface VoiceMatchedArticle {
    id: number;
    title: string;
    slug: string;
}
export interface VoiceToolState {
    tool: string;
    status: 'running' | 'done';
    latency_ms?: number;
}
export interface VoiceTranscriptItem {
    id: string;
    sender: 'assistant' | 'user';
    text: string;
    timestamp: string;
    isFinal?: boolean;
}
export interface VoiceCallEndResult {
    outcome: string;
    data?: Record<string, unknown> | null;
}
export interface VoiceFinalizedPayload {
    outcome: string;
    transcript_turns?: Array<{
        role: string;
        text: string;
    }>;
    finalize?: Record<string, unknown>;
    outcome_meta?: Record<string, unknown>;
    auto_hangup?: boolean;
    message?: string;
}
export interface VoiceClientPingCommand {
    type: 'ping';
}
export interface VoiceClientMuteCommand {
    type: 'mute';
    muted: boolean;
}
export interface VoiceClientHangupCommand {
    type: 'hangup';
    auto_hangup?: boolean;
}
export interface VoiceClientImageCommand {
    type: 'client.image';
    data: string;
    mime_type: string;
}
export interface VoiceClientTextPromptCommand {
    type: 'text_prompt';
    text: string;
}
export type VoiceClientCommand = VoiceClientPingCommand | VoiceClientMuteCommand | VoiceClientHangupCommand | VoiceClientImageCommand | VoiceClientTextPromptCommand;
export interface VoiceSessionReadyEvent {
    type: 'session.ready';
    session_id?: string;
    model?: string;
    max_duration_seconds?: number;
    caller_context?: VoiceCallerContext;
    context?: VoiceCallContextBadges;
}
export interface VoiceAssistantSpeakingEvent {
    type: 'assistant.speaking';
    amplitude?: number;
}
export interface VoiceAssistantTurnCompleteEvent {
    type: 'assistant.turn_complete';
}
export interface VoiceAssistantTranscriptEvent {
    type: 'assistant.transcript' | 'transcript.user' | 'transcript.bot';
    role?: 'assistant' | 'user';
    text: string;
    is_final?: boolean;
}
export type VoiceServerEvent = VoiceSessionReadyEvent | VoiceAssistantSpeakingEvent | VoiceAssistantTurnCompleteEvent | VoiceAssistantTranscriptEvent | {
    type: 'article.matched';
    article: VoiceMatchedArticle;
} | {
    type: 'tool.state';
    tool: string;
    status: 'running' | 'done';
    latency_ms?: number;
} | {
    type: 'assistant.image_received';
    message: string;
    bytes_length: number;
} | {
    type: 'guide.sent';
    article_id: number;
    data?: Record<string, unknown>;
} | {
    type: 'barge_in' | 'assistant.interrupted';
} | {
    type: 'call.outcome';
    outcome: string;
    data?: Record<string, unknown>;
} | {
    type: 'call.closing';
    final_greeting?: string;
    duration_seconds?: number;
    outcome?: string;
    data?: Record<string, unknown>;
} | ({
    type: 'call.finalized';
} & VoiceFinalizedPayload) | {
    type: 'session.reconnecting';
    message?: string;
} | {
    type: 'session.reconnected';
    message?: string;
} | {
    type: 'call.timeout' | 'call.idle_timeout';
    message?: string;
};
export interface VoiceConnectionParams {
    wsUrl?: string;
    apiBaseUrl?: string;
    host?: string;
    port?: number | string;
    sessionId: string;
    userId?: string | number;
    userAuthId?: string | number;
    conversationId?: string | number;
    senderMessengerId?: string | number;
}
export interface VoiceCallCallbacks {
    onReady?: (data: VoiceSessionReadyEvent) => void;
    onCallerContext?: (context: VoiceCallerContext) => void;
    onTranscriptUser?: (text: string, isFinal?: boolean) => void;
    onTranscriptBot?: (text: string, isFinal?: boolean) => void;
    onAssistantSpeaking?: () => void;
    onTurnComplete?: () => void;
    onArticleMatched?: (article: VoiceMatchedArticle | null) => void;
    onToolState?: (state: VoiceToolState) => void;
    onImageReceived?: (data: {
        message: string;
        bytes_length: number;
    }) => void;
    onGuideSent?: (data: {
        article_id: number;
        data?: Record<string, unknown>;
    }) => void;
    onBargeIn?: () => void;
    onOutcome?: (outcome: {
        outcome: string;
        data?: Record<string, unknown>;
    }) => void;
    onClosing?: (data: {
        final_greeting?: string;
        duration_seconds?: number;
        outcome?: string;
        data?: Record<string, unknown>;
    }) => void;
    onReconnecting?: (data: {
        message?: string;
    }) => void;
    onReconnected?: (data: {
        message?: string;
    }) => void;
    onFinalized?: (data: VoiceFinalizedPayload) => void;
    onError?: (error: Error) => void;
    onClose?: () => void;
    onLevels?: (userRms: number, botRms: number) => void;
    onPermissionChange?: (hasPermission: boolean, errorMessage?: string) => void;
}
