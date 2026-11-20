import { VoiceCallEndResult } from '../types/voice.types';
export interface ActiveVoiceCallSession {
    conversationId: string | number;
    userId: string | number;
    userAuthId?: string | number;
    senderMessengerId?: string | number;
    sessionId?: string;
    wsUrl?: string;
    onCallEnded?: (result: VoiceCallEndResult) => void;
}
export declare const voiceCallStore: {
    get: () => ActiveVoiceCallSession | null;
    start: (session: ActiveVoiceCallSession) => void;
    stop: () => void;
    subscribe: (listener: (call: ActiveVoiceCallSession | null) => void) => () => void;
};
export declare function useActiveVoiceCall(): ActiveVoiceCallSession | null;
