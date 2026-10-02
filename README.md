# SDI Messenger Library (`messenger-sdi-lib`)

Librería de componentes React para mensajería y chat de soporte en tiempo real (con soporte para Laravel Reverb / Pusher WebSockets), diseñada para funcionar de forma transparente y aislada en cualquier proyecto **React / Next.js (App Router & Pages)**.

---

## ✨ Características Principales

- **⚡ Cero Configuración Extra:** Maneja su propio `QueryClientProvider` internamente de forma 100% aislada. No requiere que configures TanStack React Query en tu proyecto anfitrión.
- **🛡️ Compatibilidad SSR / Next.js:** Incluye directivas `'use client'` y polyfills seguros para evaluación en servidor durante Server-Side Rendering (SSR).
- **🎨 Aislamiento de Estilos Garantizado:** Todos los estilos CSS están encapsulados bajo `.sdi-messenger-root` con Tailwind CSS v4, evitando colisiones con los estilos o clases globales de tu app.
- **🗺️ Detección de Rutas en Tiempo Real:** Detección instantánea de cambios de URL en SPAs (Next.js `<Link>`, `router.push`, React Router) para ocultar o mostrar el chat flotante dinámicamente sin recargar la página.
- **🔒 Bloqueo en Conversaciones Cerradas:** Deshabilita el compositor de texto/archivos con aviso de candado al interactuar con conversaciones finalizadas y regresa limpiamente a la lista al cerrarlas.
- **💬 Vistas Flexibles:** Widget flotante (FAB) o componentes independientes para crear vistas a pantalla completa / paneles laterales.

---

## 📦 Instalación

### Opción A: Desde archivo empaquetado local (`.tgz`)
```bash
npm install https://github.com/Inverpacifico-desarrollo/messenger-sdi-lib.git#lib
```


## 🚀 Requisitos Previos

La librería requiere **React 18+** y **React DOM 18+** como dependencias pares (`peerDependencies`):

```json
"peerDependencies": {
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```

---

## 🎨 1. Importación de Estilos

Importa la hoja de estilos de la librería una sola vez en el archivo raíz de tu aplicación (ej. `layout.tsx`, `_app.tsx`, `App.tsx` o `main.tsx`):

```tsx
import 'messenger-sdi-lib/styles.css'
```

---

## ⚙️ 2. Configuración con `ChatProvider`

Envuelve tu aplicación o layout con el `ChatProvider`, pasando las credenciales de API y WebSockets (Laravel Reverb):

```tsx
'use client'

import React from 'react'
import { ChatProvider, FloatingChat, type ChatConfig } from 'messenger-sdi-lib'
import 'messenger-sdi-lib/styles.css'

const chatConfig: ChatConfig = {
  apiBaseUrl: 'https://api.tu-servidor.com',
  authToken: 'TU_TOKEN_BEARER_DE_AUTENTICACION',
  applicationId: 10,
  reverb: {
    key: 'tu-reverb-key',
    host: 'reverb.tu-servidor.com',
    port: 443,
    wsPath: '/messenger-ws',
    scheme: 'https'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChatProvider config={chatConfig}>
      {children}
      <FloatingChat />
    </ChatProvider>
  )
}
```

---

## 💬 3. Modos de Uso

### A. Widget Flotante (`<FloatingChat />`)
Widget interactivo completo con botón flotante (FAB), lista de chats, soporte técnico y panel de conversación en tiempo real:

```tsx
import { FloatingChat } from 'messenger-sdi-lib'

<FloatingChat
  title="Centro de Ayuda SDI"
  defaultView="home"                    // 'home' | 'list' | 'chat' | 'support-form'
  defaultCorner="bottom-right"           // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  canViewChatList={true}
  canRequestSupport={true}
  hiddenPaths={['/messenger', '/login']} // Ocultar automáticamente en estas rutas
/>
```

#### Propiedades de `<FloatingChat />`:

| Propiedad | Tipo | Por Defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `'Centro de Ayuda SDI'` | Título en la cabecera del widget. |
| `defaultView` | `'home' \| 'list' \| 'chat' \| 'support-form'` | `'home'` | Vista inicial al abrir el chat. |
| `defaultCorner` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Esquina inicial en pantalla. |
| `canViewChatList` | `boolean` | `true` | Permite navegar por la lista de conversaciones. |
| `canRequestSupport` | `boolean` | `true` | Permite solicitar tickets de soporte técnico. |
| `hiddenPaths` | `string[]` | `['/messenger']` | Rutas donde el chat se oculta automáticamente (ej: `['/messenger', '/admin/*']`). |
| `showOnlyPaths` | `string[]` | `undefined` | Mostrar únicamente en las rutas especificadas. |
| `hideCondition` | `(pathname: string) => boolean` | `undefined` | Callback booleano para evaluar dinámicamente si ocultar. |
| `currentPath` | `string` | `undefined` | *(Opcional)* Ruta activa forzada (ej. desde `usePathname()`). |
| `hidden` | `boolean` | `false` | Forzar ocultamiento mediante booleano directo. |

---

### B. Vistas Embebidas (Pantalla Completa o Sección de Mensajería)
Si deseas construir una página completa de mensajería dentro de tu aplicación:

```tsx
'use client'

import React from 'react'
import {
  ConversationsSidebarList,
  ConversationChatPanel,
  ConversationEmptyState,
  useConversationsPage
} from 'messenger-sdi-lib'

export function FullMessengerPage() {
  const {
    conversations,
    selectedId,
    selectedConversation,
    selectConversation,
    searchQuery,
    setSearchQuery,
    closedFilter,
    setClosedFilter,
    typeFilter,
    setTypeFilter,
    isLoading
  } = useConversationsPage()

  return (
    <div className="flex h-[calc(100vh-80px)] w-full gap-4 p-4">
      {/* Lista Lateral de Conversaciones */}
      <div className="w-80 h-full">
        <ConversationsSidebarList
          conversations={conversations}
          selectedId={selectedId}
          onSelectConversation={selectConversation}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          closedFilter={closedFilter}
          onClosedFilterChange={setClosedFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          isLoading={isLoading}
        />
      </div>

      {/* Panel de Conversación Activa */}
      <div className="flex-1 h-full">
        {selectedConversation ? (
          <ConversationChatPanel conversation={selectedConversation} />
        ) : (
          <ConversationEmptyState />
        )}
      </div>
    </div>
  )
}
```

---

## 🎛️ Componentes y Hooks Disponibles

### Componentes Exportados:
- `ChatProvider`: Proveedor de contexto y cliente de consultas.
- `FloatingChat`: Widget de chat flotante completo.
- `ConversationChatPanel`: Panel activo de mensajes, cabecera y compositor.
- `ConversationsSidebarList`: Lista lateral filtrable con pestañas y buscador.
- `ConversationEmptyState`: Vista de estado vacío cuando no hay chat seleccionado.
- `ConversationContextPanel`: Panel lateral con detalles y participantes.
- `NewConversationDialog`: Modal para iniciar conversaciones directas o grupales.
- `RequestSupportForm`: Formulario para crear solicitudes de asistencia técnica.

### Hooks Exportados:
- `useConversationsPage`: Gestiona estado de lista, filtros, búsqueda y selección.
- `useConversationChat`: Gestiona mensajes, paginación, typing, archivos y cierre de conversación.
- `useChatContext`: Acceso a la configuración activa y usuario autenticado.

---

## 🌓 4. Modo Oscuro (Dark Mode)

La librería detecta el modo oscuro automáticamente:
1. Si el elemento `<html>` o `<body>` de tu app tiene la clase `dark`.
2. O si agregas la clase `dark` a cualquier elemento contenedor del chat.

---

## 🛠️ Licencia
Propiedad privada - SDI / Gane ByD.