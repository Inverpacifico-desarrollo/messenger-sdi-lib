import { default as React } from 'react';
export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive' | 'success';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}
export declare function Badge({ className, variant, children, ...props }: BadgeProps): React.JSX.Element;
