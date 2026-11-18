import { default as React } from 'react';
import { VoiceMatchedArticle, VoiceTranscriptItem } from '../../types/voice.types';
export interface VoiceTranscriptListProps {
    transcripts: VoiceTranscriptItem[];
    matchedArticle: VoiceMatchedArticle | null;
    noticeBanner: string | null;
}
export declare function VoiceTranscriptList({ transcripts, matchedArticle, noticeBanner }: VoiceTranscriptListProps): React.JSX.Element;
