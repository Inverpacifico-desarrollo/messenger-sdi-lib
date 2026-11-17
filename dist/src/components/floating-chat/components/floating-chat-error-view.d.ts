import { default as React } from 'react';
interface FloatingChatErrorViewProps {
    error?: Error | null;
    onRetry?: () => void;
    onClose?: () => void;
    onDragStart?: (e: React.PointerEvent) => void;
}
export declare function FloatingChatErrorView({ error, onRetry, onClose, onDragStart }: FloatingChatErrorViewProps): React.JSX.Element;
export default FloatingChatErrorView;
