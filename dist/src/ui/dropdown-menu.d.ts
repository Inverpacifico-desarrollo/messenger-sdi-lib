import { default as React } from 'react';
export interface DropdownMenuProps {
    children: React.ReactNode;
    className?: string;
}
export declare function DropdownMenu({ children, className }: DropdownMenuProps): React.JSX.Element;
export interface DropdownMenuTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}
export declare function DropdownMenuTrigger({ children, className }: DropdownMenuTriggerProps): React.JSX.Element;
export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: 'left' | 'right' | 'end' | 'start';
}
export declare function DropdownMenuContent({ align, className, children, ...props }: DropdownMenuContentProps): React.JSX.Element | null;
export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    destructive?: boolean;
}
export declare function DropdownMenuItem({ className, disabled, destructive, onClick, children, ...props }: DropdownMenuItemProps): React.JSX.Element;
export declare function DropdownMenuSeparator({ className }: {
    className?: string;
}): React.JSX.Element;
