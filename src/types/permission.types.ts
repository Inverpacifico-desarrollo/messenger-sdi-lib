// Listar mis chats => messenger_chat.read
// Solictar asistencia chat => messenger_chat_support.request_support
// Dar soporte por chat => messenger_chat_support.provide_support
export type PermissionsMessenger =
  | 'messenger_chat.read'
  | 'messenger_chat_support.request_support'
  | 'messenger_chat_support.provide_support'
