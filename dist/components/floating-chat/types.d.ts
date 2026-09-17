import { Conversation } from '../../types/conversation.types';
export type FloatingChatView = 'home' | 'support-form' | 'no-technician' | 'list' | 'chat';
export type FloatingChatCorner = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
export interface FloatingChatProps {
    /** Permite al usuario ver y explorar su lista de chats (por defecto: true) */
    canViewChatList?: boolean;
    /** Permite al usuario solicitar nuevo soporte (por defecto: true) */
    canRequestSupport?: boolean;
    /** Vista inicial al abrir el widget (por defecto: 'home') */
    defaultView?: FloatingChatView;
    /** Esquina inicial donde se ubicará el widget (por defecto: 'bottom-right' o la guardada) */
    defaultCorner?: FloatingChatCorner;
    /** Conversación inicial predefinida (opcional) */
    initialConversation?: Conversation;
    /** Título de la cabecera en el menú principal */
    title?: string;
    /**
     * Rutas o patrones de ruta donde se debe ocultar el chat flotante.
     * Por defecto: `['/messenger']`
     * Admite rutas exactas o prefijos (ej: `['/messenger', '/reports/*']`).
     */
    hiddenPaths?: string[];
    /**
     * Rutas donde únicamente debe mostrarse (opcional).
     * Si se define, el chat sólo será visible en estas rutas.
     */
    showOnlyPaths?: string[];
    /**
     * Función condicional personalizada para ocultar el chat según la ruta activa.
     */
    hideCondition?: (pathname: string) => boolean;
    /**
     * Forzar ocultamiento mediante valor booleano directo.
     */
    hidden?: boolean;
    /**
     * Ruta activa opcional.
     * Si usas Next.js `usePathname()`, puedes suministrarla: `currentPath={pathname}`.
     * Si se omite, se detectará automáticamente en tiempo real.
     */
    currentPath?: string;
}
