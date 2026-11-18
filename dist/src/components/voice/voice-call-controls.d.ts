import { default as React } from 'react';
export interface VoiceCallControlsProps {
    isMuted: boolean;
    hasPermission: boolean | null;
    userRms: number;
    textInput: string;
    isCapturingScreen?: boolean;
    onTextInputChange: (val: string) => void;
    onSendTextPrompt: (e: React.FormEvent) => void;
    onCaptureScreen?: () => void;
    onPhotoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleMute?: () => void;
    onHeroMicClick: () => void;
    onRequestMicrophone?: () => void;
    onMinimize: () => void;
    onHangup: () => void;
}
export declare function VoiceCallControls({ isMuted, hasPermission, userRms, textInput, isCapturingScreen, onTextInputChange, onSendTextPrompt, onCaptureScreen, onPhotoUpload, onHeroMicClick, onMinimize, onHangup }: VoiceCallControlsProps): React.JSX.Element;
