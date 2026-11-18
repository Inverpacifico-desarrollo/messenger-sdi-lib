import { default as Pusher } from 'pusher-js';
import { TypingEvent, UnreadEvent } from '../types/conversation.types';
import { Message } from '../types/message.types';
import { ChatConfig } from '../context/chat-context';
export declare function getPusher(reverbConfig: ChatConfig['reverb']): Pusher | null;
export declare function subscribeToConversation(reverbConfig: ChatConfig['reverb'], conversationId: number, onMessage: (message: Message) => void, onTyping?: (event: TypingEvent) => void): () => void;
export declare function subscribeToUser(reverbConfig: ChatConfig['reverb'], userId: number | string, onUnread: (event: UnreadEvent) => void, onConversationCreated?: (data?: unknown) => void): () => void;
