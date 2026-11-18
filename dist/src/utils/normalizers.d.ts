import { TypingEvent, TypingUser } from '../types/conversation.types';
import { Message, MessageAttachment } from '../types/message.types';
import { UserChat } from '../types/user-chat.types';
export declare function toUserEnvelope(data: unknown): UserChat | undefined;
export declare function toAttachmentEnvelope(data: unknown): MessageAttachment | undefined;
export declare function toMessageEnvelope(data: unknown): Message;
export declare function toTypingUser(event: TypingEvent): TypingUser;
