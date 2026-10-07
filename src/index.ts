import './styles/index.css'

// 1. Context & Provider
export {
  ChatProvider,
  useChatContext,
  useOptionalChatContext,
  type ChatConfig,
  type ChatContextValue,
  type ChatProviderProps
} from './context/chat-context'

// 2. Componentes Principales
export {
  FloatingChat,
  type FloatingChatProps,
  type FloatingChatView,
  type FloatingChatCorner
} from './components/floating-chat'

export {
  ConversationChatPanel,
  type ConversationChatPanelProps
} from './components/conversation-chat-panel'

export { ConversationEmptyState } from './components/conversation-empty-state'
export { ConversationContextPanel } from './components/conversation-context-panel'

export {
  ConversationsSidebarList,
  type ConversationsSidebarListProps
} from './components/conversations-sidebar-list'

export {
  NewConversationDialog,
  type NewConversationDialogProps
} from './components/new-conversation-dialog'

export { RequestSupportForm, type RequestSupportFormProps } from './components/request-support-form'

// 3. Hooks Principales (para vistas embebidas personalizadas)
export { default as useConversationsPage } from './hooks/use-conversations-page'
export { default as useConversationChat } from './hooks/use-conversation-chat'
export {
  default as useShowConversation,
  type UseShowConversationOptions
} from './hooks/use-show-conversation'

// 4. Tipos de Dominio Esenciales
export type {
  Conversation,
  ConversationType,
  CreateConversationPayload,
  TypingEvent,
  UnreadEvent
} from './types/conversation.types'

export type {
  Message,
  MessageAttachment,
  MessageType,
  CreateMessagePayload,
  UploadMessageFilePayload
} from './types/message.types'

export type { UserChat } from './types/user-chat.types'

export type {
  RequestChatSupportPayload,
  RequestChatSupportResponse
} from './types/chat-support.types'
