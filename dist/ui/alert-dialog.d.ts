import { default as React } from 'react';
import { ButtonProps } from './button';
export interface AlertDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}
export declare function AlertDialog({ open, onOpenChange, children }: AlertDialogProps): React.JSX.Element;
export declare function AlertDialogContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactPortal | null;
export declare function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function AlertDialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>): React.JSX.Element;
export declare function AlertDialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>): React.JSX.Element;
export declare function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function AlertDialogCancel({ className, onClick, children, ...props }: ButtonProps): React.JSX.Element;
export declare function AlertDialogAction({ className, variant, size, ...props }: ButtonProps): React.JSX.Element;
