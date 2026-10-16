import { default as React } from 'react';
import { Conversation } from '../types/conversation.types';
export interface ActiveConversationContextValue {
    /** Conversación activa actual */
    conversation: Conversation;
    /** Indica si la conversación está cerrada */
    isClosed: boolean;
    /** Indica si el cierre de la conversación está en proceso */
    isClosing: boolean;
    /** Función para cerrar la conversación activa */
    handleCloseConversation: () => Promise<void>;
}
type ActiveConversationListener = (conversation: Conversation | null) => void;
export declare const activeConversationStore: {
    get: () => Conversation | null;
    set: (conversation: Conversation | null) => void;
    subscribe: (listener: ActiveConversationListener) => () => void;
};
export interface ActiveConversationProviderProps {
    value: ActiveConversationContextValue;
    children: React.ReactNode;
}
export declare function ActiveConversationProvider({ value, children }: ActiveConversationProviderProps): React.JSX.Element;
/**
 * Hook para acceder a la conversación activa actual y a sus acciones (por ejemplo, cerrarla).
 * Funciona tanto dentro del chat (en botones de header / customHeaderButtons) como desde componentes externos.
 * Devuelve `null` si no hay ninguna conversación activa seleccionada en ese momento.
 */
export declare function useActiveConversation(): ActiveConversationContextValue | null;
/**
 * Hook que garantiza la presencia del contexto de conversación activa, lanzando un error si no se encuentra.
 */
export declare function useRequiredActiveConversation(): ActiveConversationContextValue;
export {};
