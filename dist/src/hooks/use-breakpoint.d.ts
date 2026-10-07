declare const BREAKPOINTS: {
    readonly sm: 640;
    readonly md: 768;
    readonly lg: 1024;
    readonly xl: 1280;
    readonly '2xl': 1536;
};
export type Breakpoint = keyof typeof BREAKPOINTS;
export interface BreakpointState {
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    '2xl': boolean;
}
export declare function useBreakpoint(): BreakpointState;
export {};
