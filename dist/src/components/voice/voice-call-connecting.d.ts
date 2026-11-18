import { default as React } from 'react';
export interface VoiceCallConnectingProps {
    statusText: string;
    onCancel: () => void;
}
export declare function VoiceCallConnecting({ statusText, onCancel }: VoiceCallConnectingProps): React.JSX.Element;
