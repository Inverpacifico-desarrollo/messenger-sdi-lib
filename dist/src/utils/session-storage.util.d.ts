export declare function saveConversationSessionId(conversationId: string | number, sessionId: string): void;
export declare function getConversationSessionId(conversationId: string | number): string | null;
export declare function getAllConversationSessions(): Record<string, string>;
export declare function getStoredConversationSession(conversationId?: string | number | null): string | null;
export declare function removeConversationSessionId(conversationId: string | number): void;
