import { default as React } from 'react';
export type ButtonVariant = 'default' | 'primary' | 'outline' | 'ghost' | 'secondary' | 'danger' | 'success';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    asChild?: boolean;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
