import Pusher from "pusher-js";
import { TypingEvent, UnreadEvent } from "../types/conversation.types";
import { toMessageEnvelope } from "./normalizers";
import { Message } from "../types/message.types";
import type { ChatConfig } from "../context/chat-context";

let pusher: Pusher | null = null;
let pusherConfigKey: string | null = null;

export function getPusher(reverbConfig: ChatConfig['reverb']): Pusher {
  const configKey = JSON.stringify(reverbConfig)

  if (pusher && pusherConfigKey !== configKey) {
    pusher.disconnect()
    pusher = null
  }

  if (!pusher) {
    pusher = new Pusher(
      reverbConfig.key,
      {
        wsHost: reverbConfig.host,
        wsPort: reverbConfig.port,
        wssPort: reverbConfig.port,
        wsPath: reverbConfig.wsPath,
        forceTLS: reverbConfig.scheme === "https",
        enabledTransports: ["ws", "wss"],
        cluster: "mt1",
      }
    );
    pusherConfigKey = configKey
  }
  return pusher;
}

export function subscribeToConversation(
  reverbConfig: ChatConfig['reverb'],
  conversationId: number,
  onMessage: (message: Message) => void,
  onTyping?: (event: TypingEvent) => void
) {
  const pusher = getPusher(reverbConfig);
  const channel = pusher.subscribe(`conversation.${conversationId}`);

  channel.bind("MessageSent", (data: Record<string, unknown>) => {
    onMessage(toMessageEnvelope(data));
  });

  if (onTyping) {
    const handleTyping = (data: TypingEvent) => onTyping(data)
    channel.bind('UserTyping', handleTyping)
    channel.bind('client-UserTyping', handleTyping)
  }

  return () => {
    channel.unbind_all();
    pusher.unsubscribe(`conversation.${conversationId}`);
  };
}

export function subscribeToUser(
  reverbConfig: ChatConfig['reverb'],
  userId: number | string,
  onUnread: (event: UnreadEvent) => void,
  onConversationCreated?: (data?: unknown) => void
) {
  const pusher = getPusher(reverbConfig);
  const channel = pusher.subscribe(`user.${userId}`);

  channel.bind("ConversationUnreadUpdated", (data: UnreadEvent) => {
    onUnread(data);
  });

  if (onConversationCreated) {
    channel.bind("ConversationCreated", (data: unknown) => {
      onConversationCreated(data);
    });
    channel.bind("conversation.created", (data: unknown) => {
      onConversationCreated(data);
    });
    channel.bind("NewConversation", (data: unknown) => {
      onConversationCreated(data);
    });
  }

  return () => {
    channel.unbind_all();
    pusher.unsubscribe(`user.${userId}`);
  };
}
