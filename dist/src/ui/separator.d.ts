import { default as React } from 'react';
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
}
export declare function Separator({ orientation, className, ...props }: SeparatorProps): React.JSX.Element;
