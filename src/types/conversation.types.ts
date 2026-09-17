import { UserChat } from './user-chat.types'
import { ApiMessengerParams } from './api.types'

export interface Conversation {
  id: string
  type: 'conversation'
  attributes: {
    is_group: boolean
    name: string
    closed_at: null | string
    unread_count: number
    created_at: string
    updated_at: string
  }
  relationships: {
    users: UserChat[]
    last_message?: null
  }
}

export type ConversationType = 'bot' | 'direct' | 'group'

export interface CreateConversationPayload {
  type: ConversationType
  user_id?: number | null
  sender_id?: number | null
  name?: string | null
  user_ids?: number[] | null
}

export interface FilterConversation extends ApiMessengerParams<Partial<Record<'closed' | 'name' | 'type', string>>> {
  user_id?: string
}

export interface MarkConversationAsReadPayload {
  conversationId: string
  read_until: string
  user_id: string | number
}

export interface ConversationTypingPayload {
  conversationId: string
  user_id: string | number
  is_typing: boolean
}


export interface TypingEvent {
  user_id: number;
  user: {
    id: number;
    name: string;
    avatar_url: string | null;
  };
  is_typing: boolean;
}

export interface TypingUser {
  user_id: number;
  name: string;
  avatar_url?: string | null;
}

export interface UnreadEventMessage {
  id: string;
  sender_id: number;
  body: string;
  type: string;
  created_at: string;
}

export interface UnreadEvent {
  conversation_id: number;
  user_id: number;
  unread_count: number;
  message: UnreadEventMessage;
}
