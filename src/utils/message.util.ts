import { ConversationMessage, Message } from '../types/message.types'
import { UserChat } from '../types/user-chat.types'
import { UserAuth } from '../types/user-auth.types'
import { format, isToday, isThisWeek, isYesterday, isValid, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export const createOptimisticMessage = ({
  conversationId,
  sender,
  body,
  file
}: {
  conversationId: string
  sender: UserChat | UserAuth
  body: string
  file?: File | null
}): Message => {
  const optimisticId = `optimistic-${Date.now()}`
  const createdAt = new Date().toISOString()
  const senderId = Number(sender.id)
  const senderAttributes = (sender as any).attributes || {}
  const senderName = senderAttributes.name || senderAttributes.username || 'Usuario'
  const senderAvatar = senderAttributes.avatar_url ?? senderAttributes.avatar ?? null

  const senderUserChat: UserChat = {
    id: String(sender.id),
    type: 'user',
    attributes: {
      user_auth_id: senderAttributes.user_auth_id ?? sender.id,
      name: senderName,
      avatar_url: senderAvatar,
      created_at: createdAt,
      updated_at: createdAt
    },
    relationships: []
  }

  return {
    id: optimisticId,
    type: 'message',
    attributes: {
      conversation_id: Number(conversationId),
      created_at: createdAt,
      sender_id: senderId,
      body: body || 'Archivo adjunto',
      type: { id: 0, name: 'message', icon: '' }
    },
    relationships: {
      sender: senderUserChat,
      attachments: file
        ? [
            {
              id: `${optimisticId}-attachment`,
              type: 'messageAttachment',
              attributes: {
                file_url: URL.createObjectURL(file),
                file_name: file.name,
                file_mime_type: file.type,
                file_size: file.size,
                created_at: createdAt
              },
              relationships: []
            }
          ]
        : []
    },
    local_status: 'sending'
  }
}

function dayKeyOf(iso: string): string {
  return iso.slice(0, 10)
}

export function prependMessage(
  groups: ConversationMessage[],
  message: Message
): ConversationMessage[] {
  if (message.attributes.sender_id == null) return groups

  const key = dayKeyOf(message.attributes.created_at || '')
  const first = groups[0]

  if (first && first.date === key) {
    if (first.messages.some((m) => m.id === message.id)) return groups
    return [{ ...first, messages: [message, ...first.messages] }, ...groups.slice(1)]
  }

  return [{ date: key, messages: [message] }, ...groups]
}

export function mergeOlderGroups(
  current: ConversationMessage[],
  older: ConversationMessage[]
): ConversationMessage[] {
  if (current.length === 0) return older
  if (older.length === 0) return current

  const currentLast = current[current.length - 1]
  const olderFirst = older[0]

  if (olderFirst.date === currentLast.date) {
    const known = new Set(currentLast.messages.map((m) => m.id))
    const extra = olderFirst.messages.filter((m) => !known.has(m.id))
    return [
      ...current.slice(0, -1),
      { date: currentLast.date, messages: [...currentLast.messages, ...extra] },
      ...older.slice(1)
    ]
  }

  return [...current, ...older]
}

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return 'Hoy'
  const trimmed = dateStr.trim().toLowerCase()
  if (trimmed === 'hoy' || trimmed === 'today') return 'Hoy'
  if (trimmed === 'ayer' || trimmed === 'yesterday') return 'Ayer'

  const parsed = parseISO(dateStr)
  if (!isValid(parsed)) return dateStr

  if (isToday(parsed)) return 'Hoy'
  if (isYesterday(parsed)) return 'Ayer'

  if (isThisWeek(parsed, { weekStartsOn: 1 })) {
    return format(parsed, 'EEEE', { locale: es })
  }

  return format(parsed, "d 'de' MMMM 'de' yyyy", { locale: es })
}
