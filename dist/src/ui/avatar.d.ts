import { default as React } from 'react';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string | null;
    name?: string | null;
    size?: AvatarSize;
    isGroup?: boolean;
    isBot?: boolean;
    status?: 'online' | 'offline' | 'busy';
}
export declare function Avatar({ src, name, size, isGroup, isBot, status, className, ...props }: AvatarProps): React.JSX.Element;
