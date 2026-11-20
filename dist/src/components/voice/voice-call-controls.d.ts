import { default as React } from 'react';
export interface VoiceCallControlsProps {
    isMuted: boolean;
    hasPermission: boolean | null;
    userRms: number;
    textInput: string;
    isCapturingScreen?: boolean;
    isSimulatingMicroCut?: boolean;
    onTextInputChange: (val: string) => void;
    onSendTextPrompt: (e: React.FormEvent) => void;
    onCaptureScreen?: () => void;
    onOpenCamera?: () => void;
    onPhotoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTriggerFileUpload?: () => void;
    onSimulateMicroCut?: () => void;
    onToggleMute?: () => void;
    onHeroMicClick: () => void;
    onRequestMicrophone?: () => void;
    onMinimize: () => void;
    onHangup: () => void;
}
export declare function VoiceCallControls({ isMuted, hasPermission, userRms, textInput, isCapturingScreen, isSimulatingMicroCut, onTextInputChange, onSendTextPrompt, onCaptureScreen, onOpenCamera, onPhotoUpload, onTriggerFileUpload, onSimulateMicroCut, onHeroMicClick, onMinimize, onHangup }: VoiceCallControlsProps): React.JSX.Element;
