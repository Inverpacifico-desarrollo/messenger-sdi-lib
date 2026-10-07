import { AxiosResponse } from 'axios';
import { ResponseApiMessage } from '../types/api.types';
import { ConversationMessage, CreateMessagePayload, Message, MessageParams, UploadMessageFilePayload } from '../types/message.types';
export declare const listMessagesService: ({ conversation, ...params }: MessageParams) => Promise<AxiosResponse<ResponseApiMessage<ConversationMessage[]>>>;
export declare const createMessageService: (conversationId: string, data: CreateMessagePayload) => Promise<AxiosResponse<import('../types/api.types').ResponseAPI<Message>, any, {}, any>>;
export declare const uploadMessageFileService: (conversationId: string, data: UploadMessageFilePayload) => Promise<AxiosResponse<import('../types/api.types').ResponseAPI<Message>, any, {}, any>>;
