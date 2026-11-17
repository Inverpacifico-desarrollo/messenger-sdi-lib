import { AxiosError } from 'axios';
import { ResponseError } from '../../types/api.types';
import { ChatBotQueueStatusResponse } from '../../types/chat-support.types';
export interface UseChatBotQueuePollingOptions {
    sessionId?: string | null;
    enabled?: boolean;
    intervalMs?: number;
    onStatusUpdate?: (data: ChatBotQueueStatusResponse) => void;
    onAssigned?: (data: ChatBotQueueStatusResponse) => void;
    onError?: (error: AxiosError<ResponseError>) => void;
}
export declare const useChatBotQueuePolling: ({ sessionId, enabled, intervalMs, onStatusUpdate, onAssigned, onError }?: UseChatBotQueuePollingOptions) => {
    data: ChatBotQueueStatusResponse | null;
    isPolling: boolean;
    error: AxiosError<ResponseError, any, any> | null;
    checkStatus: () => Promise<ChatBotQueueStatusResponse | null>;
    isAssigned: boolean;
};
export default useChatBotQueuePolling;
