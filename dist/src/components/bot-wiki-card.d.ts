import { default as React } from 'react';
import { BotWikiArticle } from '../types/message.types';
export interface BotWikiCardProps {
    article: BotWikiArticle;
}
export declare function BotWikiCard({ article }: BotWikiCardProps): React.JSX.Element;
