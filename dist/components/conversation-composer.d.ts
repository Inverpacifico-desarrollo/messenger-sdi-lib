import { default as React } from 'react';
interface ConversationComposerProps {
    inputText: string;
    setInputText: (text: string) => void;
    onSendMessage: () => void;
    onSelectFile: (file: File) => void;
    pendingFile: File | null;
    onRemoveFile: () => void;
    isSending: boolean;
    isUploading: boolean;
    conversationName: string;
    isClosed?: boolean;
}
export declare function ConversationComposer({ inputText, setInputText, onSendMessage, onSelectFile, pendingFile, onRemoveFile, isSending, isUploading, conversationName, isClosed }: ConversationComposerProps): React.JSX.Element;
export {};
