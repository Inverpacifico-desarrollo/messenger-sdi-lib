import './styles/index.css'

// Components
export * from './components/floating-chat'
export * from './components/conversation-chat-panel'
export * from './components/conversation-chat-header'
export * from './components/conversation-messages-list'
export * from './components/conversation-message-item'
export * from './components/conversation-composer'
export * from './components/conversations-sidebar-list'
export * from './components/conversation-context-panel'
export * from './components/conversation-empty-state'
export * from './components/btn-close-conversation'
export * from './components/new-conversation-dialog'
export * from './components/conversations-user-footer'
export * from './components/request-support-form'
export * from './components/support-no-technician-view'

// UI Primitives
export * from './ui'

// Context & Provider
export * from './context/chat-context'

// Types
export * from './types/conversation.types'
export * from './types/message.types'
export * from './types/user-chat.types'
export * from './types/user-auth.types'
export * from './types/api.types'
export * from './types/chat-support.types'
export * from './types/permission.types'

// Services
export * from './services/user-auth.services'
export * from './services/user-messenger.services'
export * from './services/chat-support.services'
export * from './services/conversation.services'
export * from './services/message.services'
export * from './services/auth-services'

// HTTP & Query Client
export * from './lib/http-request'
export * from './lib/react-query'

// Hooks
export * from './hooks/use-check-has-permission-messenger'
export * from './hooks/use-debounce'
export * from './hooks/use-mutate'
export { default as useConversationsPage } from './hooks/use-conversations-page'
export { default as useConversationChat } from './hooks/use-conversation-chat'
export { default as useGetAuthUser } from './hooks/api/users/use-get-auth-user'
export { default as useListUsers } from './hooks/api/users/use-list-users'
export { default as useRequestChatSupport } from './hooks/api/use-request-chat-support'
export { default as useListConversations } from './hooks/api/conversations/use-list-conversations'
export { default as useGetConversation } from './hooks/api/conversations/use-get-conversation'
export { default as useCreateConversation } from './hooks/api/conversations/use-create-conversation'
export { default as useCloseConversation } from './hooks/api/conversations/use-close-conversation'
export { default as useMarkConversationAsRead } from './hooks/api/conversations/use-mark-conversation-as-read'
export { default as useUpdateConversationTyping } from './hooks/api/conversations/use-update-conversation-typing'
export { default as useListMessages } from './hooks/api/messages/use-list-messages'
export { default as useSendMessage } from './hooks/api/messages/use-send-message'
export { default as useUploadMessageFile } from './hooks/api/messages/use-upload-message-file'

// Utils
export { subscribeToConversation, subscribeToUser, getPusher } from './utils/reverb'
export { capitalizeWords, getConversationName, getConversationUser, isGroupConversation, mockGetUserLogged } from './utils/conversation.util'
export * from './utils/message.util'
export * from './utils/normalizers'
