import { default as React } from 'react';
export interface MessageRichTextProps {
    content: string;
    isOwnMessage?: boolean;
    isBot?: boolean;
    className?: string;
}
/**
 * Valida que una URL utilice únicamente protocolos seguros (http, https, mailto).
 * Bloquea javascript:, data:, vbscript:, etc.
 */
export declare function sanitizeUrl(rawUrl: string): string | null;
export type MarkdownInlineNode = {
    type: 'text';
    value: string;
} | {
    type: 'bold';
    children: MarkdownInlineNode[];
} | {
    type: 'italic';
    children: MarkdownInlineNode[];
} | {
    type: 'underline';
    children: MarkdownInlineNode[];
} | {
    type: 'strike';
    children: MarkdownInlineNode[];
} | {
    type: 'inlineCode';
    value: string;
} | {
    type: 'link';
    href: string;
    label: string;
    isAuto?: boolean;
} | {
    type: 'br';
};
export type MarkdownBlockNode = {
    type: 'code';
    language?: string;
    code: string;
} | {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: MarkdownInlineNode[];
} | {
    type: 'quote';
    lines: string[];
} | {
    type: 'list';
    ordered: boolean;
    start?: number;
    items: MarkdownInlineNode[][];
} | {
    type: 'table';
    headers: MarkdownInlineNode[][];
    rows: MarkdownInlineNode[][][];
} | {
    type: 'hr';
} | {
    type: 'paragraph';
    children: MarkdownInlineNode[];
};
export declare function parseMarkdownInline(text: string): MarkdownInlineNode[];
export declare function parseMarkdownToAst(content: string): MarkdownBlockNode[];
export declare function MessageRichText({ content, isOwnMessage, className }: MessageRichTextProps): React.JSX.Element;
export default MessageRichText;
