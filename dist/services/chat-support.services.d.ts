import { RequestChatSupportPayload, RequestChatSupportResponse } from '../types/chat-support.types';
export declare const requestChatSupportService: (data: RequestChatSupportPayload) => Promise<import('axios').AxiosResponse<import('../types/api.types').ResponseAPI<RequestChatSupportResponse>, any, {}, any>>;
