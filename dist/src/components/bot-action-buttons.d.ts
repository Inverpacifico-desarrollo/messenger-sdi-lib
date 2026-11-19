import { default as React } from 'react';
import { MessageActionButton } from '../types/message.types';
export interface BotActionButtonsProps {
    actions: MessageActionButton[];
    disabled?: boolean;
    onActionClick?: (action: MessageActionButton) => void;
}
export declare function BotActionButtons({ actions, disabled, onActionClick }: BotActionButtonsProps): React.JSX.Element | null;
