import { ConversationMessage, Message } from '../types/message.types';
import { UserChat } from '../types/user-chat.types';
import { UserAuth } from '../types/user-auth.types';
export declare const createOptimisticMessage: ({ conversationId, sender, body, file }: {
    conversationId: string;
    sender: UserChat | UserAuth;
    body: string;
    file?: File | null;
}) => Message;
export declare function prependMessage(groups: ConversationMessage[], message: Message): ConversationMessage[];
export declare function mergeOlderGroups(current: ConversationMessage[], older: ConversationMessage[]): ConversationMessage[];
export declare function formatDisplayDate(dateStr: string): string;
