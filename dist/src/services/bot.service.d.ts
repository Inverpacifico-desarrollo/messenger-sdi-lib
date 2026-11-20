import { BotStreamCallbacks, BotStreamDoneEvent, SendBotMessagePayload } from '../types/chat-support.types';
export declare function sendBotMessageSync(payload: SendBotMessagePayload): Promise<BotStreamDoneEvent>;
export interface SendBotMessageStreamOptions {
    signal?: AbortSignal;
    openTimeoutMs?: number;
}
export declare function sendBotMessageStream(payload: SendBotMessagePayload, callbacks: BotStreamCallbacks, options?: SendBotMessageStreamOptions): Promise<void>;
