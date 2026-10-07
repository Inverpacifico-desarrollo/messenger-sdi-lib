import { default as React } from 'react';
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}
export declare function Tabs({ value: controlledValue, defaultValue, onValueChange: controlledOnValueChange, className, children, ...props }: TabsProps): React.JSX.Element;
export declare function TabsList({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
}
export declare function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps): React.JSX.Element;
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
}
export declare function TabsContent({ value, className, children, ...props }: TabsContentProps): React.JSX.Element | null;
