import { default as React } from 'react';
export interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}
export declare function Dialog({ open, onOpenChange, children }: DialogProps): React.JSX.Element;
export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    showClose?: boolean;
}
export declare function DialogContent({ className, children, showClose, ...props }: DialogContentProps): React.ReactPortal | null;
export declare function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>): React.JSX.Element;
export declare function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>): React.JSX.Element;
export declare function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
