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
    readOnly?: boolean;
    readOnlyMessage?: string;
}
export declare function ConversationComposer({ inputText, setInputText, onSendMessage, onSelectFile, pendingFile, onRemoveFile, isSending, isUploading, conversationName, isClosed, readOnly, readOnlyMessage }: ConversationComposerProps): React.JSX.Element;
export {};
