# SDI Messenger Library (`messenger-sdi-lib`)

Librería de componentes React para mensajería y chat de soporte en tiempo real (con soporte para Laravel Reverb / Pusher WebSockets), diseñada con Tailwind CSS encapsulado para evitar colisiones en proyectos anfitriones.

---

## 📦 Instalación

### Opción A: Desde registro NPM (si está publicado)
```bash
npm install messenger-sdi-lib
# o con pnpm / yarn
pnpm add messenger-sdi-lib
yarn add messenger-sdi-lib
```

### Opción B: Desde archivo empaquetado local (`.tgz`)
```bash
npm install ./ruta/a/messenger-sdi-lib-1.0.0.tgz
```

---

## 🚀 Requisitos Previos

La librería requiere **React 18+** y **React DOM 18+** en el proyecto anfitrión:

```json
"peerDependencies": {
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```

---

## 🎨 1. Importación de Estilos

Debes importar la hoja de estilos de la librería una sola vez en el archivo raíz de tu aplicación (ej. `main.tsx`, `App.tsx`, o `_app.tsx` / `layout.tsx` en Next.js):

```tsx
import 'messenger-sdi-lib/styles.css'
```

> **🛡️ Aislamiento de Estilos Garantizado:**  
> Todos los estilos de la librería están encapsulados bajo el prefijo `.sdi-messenger-root`. No afectarán los estilos de tu aplicación ni interferirán con tu propia configuración de Tailwind CSS o CSS Modules.

---

## ⚙️ 2. Configuración con `ChatProvider`

Envuelve tu aplicación o sección de chat con el `ChatProvider`, pasando las credenciales de API y WebSockets (Reverb):

```tsx
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

export default function App() {
  return (
    <ChatProvider config={chatConfig}>
      {/* Tu aplicación */}
      <FloatingChat />
    </ChatProvider>
  )
}
```

---

## 💬 3. Modos de Uso

### A. Widget Flotante (`<FloatingChat />`)
El widget de chat flotante incluye botón interactivo, lista de conversaciones, panel de chat y soporte a tickets en tiempo real:

```tsx
import { FloatingChat } from 'messenger-sdi-lib'

<FloatingChat
  title="Centro de Ayuda SDI"
  defaultView="home"               // 'home' | 'list' | 'chat' | 'form'
  defaultCorner="bottom-right"      // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  canViewChatList={true}
  canRequestSupport={true}
  hiddenPaths={['/login', '/checkout']} // Ocultar automáticamente en ciertas rutas
/>
```

#### Propiedades Principales de `<FloatingChat />`:

| Propiedad | Tipo | Por Defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `'Centro de Ayuda SDI'` | Título de la cabecera del widget. |
| `defaultView` | `'home' \| 'list' \| 'chat' \| 'form'` | `'home'` | Vista inicial al abrir el chat. |
| `defaultCorner` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Esquina inicial del botón flotante. |
| `canViewChatList` | `boolean` | `true` | Habilita o restringe ver la lista de conversaciones. |
| `canRequestSupport` | `boolean` | `true` | Permite solicitar tickets de soporte técnico. |
| `hiddenPaths` | `string[]` | Rutas de auth | Rutas de la URL donde el chat no debe mostrarse. |
| `showOnlyPaths` | `string[]` | `undefined` | Mostrar únicamente en las rutas especificadas. |
| `hideCondition` | `() => boolean` | `undefined` | Callback booleano para ocultar dinámicamente. |

---

### B. Vistas Embebidas (Pantalla Completa o Sidebar)
Si deseas construir una página de mensajería dentro del layout de tu aplicación:

```tsx
import React, { useState } from 'react'
import {
  ConversationsSidebarList,
  ConversationChatPanel,
  useConversationsPage
} from 'messenger-sdi-lib'

export function MessengerFullPage() {
  const {
    conversations,
    activeConversation,
    activeConversationId,
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
    <div className="flex h-[800px] w-full gap-4 p-4">
      {/* Lista lateral */}
      <div className="w-80 h-full">
        <ConversationsSidebarList
          conversations={conversations}
          selectedId={activeConversationId || ''}
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

      {/* Panel de chat activo */}
      <div className="flex-1 h-full">
        {activeConversation ? (
          <ConversationChatPanel conversation={activeConversation} />
        ) : (
          <div className="flex h-full items-center justify-center border rounded-2xl">
            <p className="text-sm text-neutral-400">Selecciona una conversación</p>
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## 🌓 4. Modo Oscuro (Dark Mode)

La librería detecta el modo oscuro automáticamente:
1. Si el elemento `<html>` o `<body>` de tu app tiene la clase `dark`.
2. O si agregas la clase `dark` a un elemento contenedor.

---

## 🛠️ Licencia
Propiedad privada - SDI / Gane ByD.