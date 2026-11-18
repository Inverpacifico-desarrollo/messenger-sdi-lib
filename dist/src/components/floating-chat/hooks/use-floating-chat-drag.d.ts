import { FloatingChatCorner } from '../types';
export declare function useFloatingChatDrag(defaultCorner?: FloatingChatCorner): {
    containerRef: import('react').RefObject<HTMLDivElement>;
    corner: FloatingChatCorner;
    isDragging: boolean;
    dragPos: {
        x: number;
        y: number;
    } | null;
    wasDraggedRef: import('react').MutableRefObject<boolean>;
    isTop: boolean;
    isLeft: boolean;
    cornerContainerClass: string;
    cardOriginClass: string;
    startDrag: (e: React.PointerEvent) => void;
    changeCorner: (newCorner: FloatingChatCorner) => void;
};
