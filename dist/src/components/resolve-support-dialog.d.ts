import { default as React } from 'react';
export interface ResolveSupportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: {
        rating: number;
        comment: string;
        helpful: boolean;
    }) => Promise<void> | void;
    isSubmitting?: boolean;
    error?: string | null;
}
export declare function ResolveSupportDialog({ open, onOpenChange, onSubmit, isSubmitting, error }: ResolveSupportDialogProps): React.JSX.Element;
export default ResolveSupportDialog;
