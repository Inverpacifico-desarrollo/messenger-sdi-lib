export declare const DEFAULT_HIDDEN_PATHS: string[];
export declare function isPathMatch(currentPath: string, pattern: string): boolean;
interface UseFloatingChatVisibilityProps {
    hiddenPaths?: string[];
    showOnlyPaths?: string[];
    hideCondition?: (pathname: string) => boolean;
    hidden?: boolean;
    currentPath?: string;
}
export declare function useFloatingChatVisibility({ hiddenPaths, showOnlyPaths, hideCondition, hidden, currentPath }: UseFloatingChatVisibilityProps): {
    shouldHide: boolean;
    pathname: string;
};
export {};
