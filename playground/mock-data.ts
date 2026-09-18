import type { Conversation } from '../src/types/conversation.types'
import type { Message } from '../src/types/message.types'
import type { UserChat } from '../src/types/user-chat.types'

export const mockCurrentUser: UserChat = {
  id: '101',
  type: 'user',
  attributes: {
    user_auth_id: 101,
    name: 'Luis Hernández',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    updated_at: new Date().toISOString()
  },
  relationships: []
}

export const mockOtherUsers: UserChat[] = [
  {
    id: '201',
    type: 'user',
    attributes: {
      user_auth_id: 201,
      name: 'María Gómez',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      created_at: new Date(Date.now() - 86400000 * 60).toISOString(),
      updated_at: new Date().toISOString()
    },
    relationships: []
  },
  {
    id: '202',
    type: 'user',
    attributes: {
      user_auth_id: 202,
      name: 'Carlos Ruiz',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      created_at: new Date(Date.now() - 86400000 * 45).toISOString(),
      updated_at: new Date().toISOString()
    },
    relationships: []
  }
]

export const mockConversations: Conversation[] = [
  {
    id: '1',
    type: 'conversation',
    attributes: {
      is_group: false,
      name: 'María Gómez',
      closed_at: null,
      unread_count: 2,
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 5).toISOString()
    },
    relationships: {
      users: [mockCurrentUser, mockOtherUsers[0]],
      last_message: null
    }
  },
  {
    id: '2',
    type: 'conversation',
    attributes: {
      is_group: true,
      name: 'Equipo de Soporte SDI',
      closed_at: null,
      unread_count: 0,
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    },
    relationships: {
      users: [mockCurrentUser, mockOtherUsers[0], mockOtherUsers[1]],
      last_message: null
    }
  },
  {
    id: '3',
    type: 'conversation',
    attributes: {
      is_group: false,
      name: 'Carlos Ruiz',
      closed_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      unread_count: 0,
      created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
      updated_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    relationships: {
      users: [mockCurrentUser, mockOtherUsers[1]],
      last_message: null
    }
  }
]

export const mockMessagesByConvId: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      type: 'message',
      attributes: {
        conversation_id: 1,
        sender_id: 101,
        body: 'Buenos días María, ¿podrías ayudarme revisando el estado del ticket #4819?',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      relationships: {
        sender: mockCurrentUser,
        attachments: []
      }
    },
    {
      id: '2',
      type: 'message',
      attributes: {
        conversation_id: 1,
        sender_id: 201,
        body: 'Hola Luis! Claro que sí, dame un momento para consultar los logs del sistema.',
        created_at: new Date(Date.now() - 3600000 * 1.8).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 1.8).toISOString()
      },
      relationships: {
        sender: mockOtherUsers[0],
        attachments: []
      }
    },
    {
      id: '3',
      type: 'message',
      attributes: {
        conversation_id: 1,
        sender_id: 201,
        body: 'Hola Luis, ya revisamos la incidencia del servidor y quedó restablecido.',
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        updated_at: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      },
      relationships: {
        sender: mockOtherUsers[0],
        attachments: []
      }
    }
  ],
  '2': [
    {
      id: '201',
      type: 'message',
      attributes: {
        conversation_id: 2,
        sender_id: 202,
        body: 'Iniciando despliegue de la versión 1.0.0 de la librería de chat.',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      relationships: {
        sender: mockOtherUsers[1],
        attachments: []
      }
    },
    {
      id: '202',
      type: 'message',
      attributes: {
        conversation_id: 2,
        sender_id: 101,
        body: 'Excelente, las pruebas del playground y empaquetado Vite están listas.',
        created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 1).toISOString()
      },
      relationships: {
        sender: mockCurrentUser,
        attachments: []
      }
    }
  ],
  '3': [
    {
      id: '301',
      type: 'message',
      attributes: {
        conversation_id: 3,
        sender_id: 202,
        body: 'Ticket resuelto.',
        created_at: new Date(Date.now() - 86400000 * 5.1).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 5.1).toISOString()
      },
      relationships: {
        sender: mockOtherUsers[1],
        attachments: []
      }
    }
  ]
}
