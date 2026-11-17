'use client'

import React, { useState } from 'react'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { cn } from '../ui'

export interface MessageRichTextProps {
  content: string
  isOwnMessage?: boolean
  isBot?: boolean
  className?: string
}

const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:'])

/**
 * Valida que una URL utilice únicamente protocolos seguros (http, https, mailto).
 * Bloquea javascript:, data:, vbscript:, etc.
 */
export function sanitizeUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim()
  if (!trimmed) return null

  try {
    const parsed = new URL(trimmed)
    if (SAFE_PROTOCOLS.has(parsed.protocol.toLowerCase())) {
      return parsed.href
    }
    return null
  } catch {
    return null
  }
}

function decodeHtmlEntities(input: string): string {
  if (!input) return ''
  return input
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&amp;/gi, '&')
}

// -------------------------------------------------------------
// Tipos del AST de Markdown
// -------------------------------------------------------------

export type MarkdownInlineNode =
  | { type: 'text'; value: string }
  | { type: 'bold'; children: MarkdownInlineNode[] }
  | { type: 'italic'; children: MarkdownInlineNode[] }
  | { type: 'underline'; children: MarkdownInlineNode[] }
  | { type: 'strike'; children: MarkdownInlineNode[] }
  | { type: 'inlineCode'; value: string }
  | { type: 'link'; href: string; label: string; isAuto?: boolean }
  | { type: 'br' }

export type MarkdownBlockNode =
  | { type: 'code'; language?: string; code: string }
  | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; children: MarkdownInlineNode[] }
  | { type: 'quote'; lines: string[] }
  | { type: 'list'; ordered: boolean; start?: number; items: MarkdownInlineNode[][] }
  | { type: 'table'; headers: MarkdownInlineNode[][]; rows: MarkdownInlineNode[][][] }
  | { type: 'hr' }
  | { type: 'paragraph'; children: MarkdownInlineNode[] }

// -------------------------------------------------------------
// Componente de Bloque de Código
// -------------------------------------------------------------

function CodeBlock({
  language,
  code,
  isOwnMessage
}: {
  language?: string
  code: string
  isOwnMessage?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Ignorar si el portapapeles no está disponible
    }
  }

  return (
    <div
      className={cn(
        'my-2 overflow-hidden rounded-xl border text-xs',
        isOwnMessage
          ? 'border-blue-400/40 bg-slate-950/90 text-slate-100'
          : 'border-neutral-200 dark:border-neutral-700/80 bg-slate-900 dark:bg-slate-950 text-slate-100'
      )}
    >
      <div className='flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-3 py-1.5 text-[10px] text-slate-400'>
        <span className='font-mono uppercase tracking-wider'>
          {language || 'código'}
        </span>
        <button
          type='button'
          onClick={handleCopy}
          className='inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer'
          title='Copiar código'
        >
          {copied ? (
            <>
              <Check className='size-3 text-emerald-400' />
              <span className='text-emerald-400'>Copiado</span>
            </>
          ) : (
            <>
              <Copy className='size-3' />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>
      <pre className='overflow-x-auto p-3 font-mono text-[11.5px] leading-relaxed whitespace-pre'>
        <code>{code}</code>
      </pre>
    </div>
  )
}

// -------------------------------------------------------------
// Parser Inline de Markdown (+ compatibilidad HTML básica)
// -------------------------------------------------------------

export function parseMarkdownInline(text: string): MarkdownInlineNode[] {
  if (!text) return []

  const nodes: MarkdownInlineNode[] = []
  let remaining = text

  // Expresiones regulares para tokens inline
  const codeRegex = /^`([^`]+)`/
  const boldAsteriskRegex = /^\*\*([^*]+)\*\*/
  const boldUnderscoreRegex = /^__([^_]+)__/
  const italicAsteriskRegex = /^\*([^*]+)\*/
  const italicUnderscoreRegex = /^_([^_]+)_/
  const strikeRegex = /^~~([^~]+)~~/
  const linkMarkdownRegex = /^\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/
  const autoUrlRegex = /^((?:https?:\/\/|mailto:)[^\s<]+[^<.,:;"')\]\s])/

  // Compatibilidad HTML retroactiva
  const htmlBoldRegex = /^<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>/i
  const htmlItalicRegex = /^<(?:i|em)>([\s\S]*?)<\/(?:i|em)>/i
  const htmlUnderlineRegex = /^<u>([\s\S]*?)<\/u>/i
  const htmlStrikeRegex = /^<(?:s|strike|del)>([\s\S]*?)<\/(?:s|strike|del)>/i
  const htmlCodeRegex = /^<code>([\s\S]*?)<\/code>/i
  const htmlAnchorRegex = /^<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/i
  const htmlBrRegex = /^<br\s*\/?>/i

  while (remaining.length > 0) {
    // 1. Saltos de línea HTML
    let match = remaining.match(htmlBrRegex)
    if (match) {
      nodes.push({ type: 'br' })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // 2. Código inline con backticks `code`
    match = remaining.match(codeRegex)
    if (match) {
      nodes.push({ type: 'inlineCode', value: match[1] })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // Código HTML <code>...</code>
    match = remaining.match(htmlCodeRegex)
    if (match) {
      nodes.push({ type: 'inlineCode', value: decodeHtmlEntities(match[1]) })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // 3. Enlaces Markdown [label](url)
    match = remaining.match(linkMarkdownRegex)
    if (match) {
      nodes.push({
        type: 'link',
        label: match[1],
        href: match[2]
      })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // Enlaces HTML <a href="...">...</a>
    match = remaining.match(htmlAnchorRegex)
    if (match) {
      nodes.push({
        type: 'link',
        href: match[1],
        label: decodeHtmlEntities(match[2].replace(/<[^>]*>/g, ''))
      })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // 4. Negrita **texto** o __texto__
    match = remaining.match(boldAsteriskRegex) || remaining.match(boldUnderscoreRegex)
    if (match) {
      nodes.push({
        type: 'bold',
        children: parseMarkdownInline(match[1])
      })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // Negrita HTML <b> o <strong>
    match = remaining.match(htmlBoldRegex)
    if (match) {
      nodes.push({
        type: 'bold',
        children: parseMarkdownInline(match[1])
      })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // 5. Cursiva *texto* o _texto_
    match = remaining.match(italicAsteriskRegex) || remaining.match(italicUnderscoreRegex)
    if (match) {
      nodes.push({
        type: 'italic',
        children: parseMarkdownInline(match[1])
      })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // Cursiva HTML <i> o <em>
    match = remaining.match(htmlItalicRegex)
    if (match) {
      nodes.push({
        type: 'italic',
        children: parseMarkdownInline(match[1])
      })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // 6. Tachado ~~texto~~
    match = remaining.match(strikeRegex)
    if (match) {
      nodes.push({
        type: 'strike',
        children: parseMarkdownInline(match[1])
      })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // Tachado HTML <s>, <del>, <strike>
    match = remaining.match(htmlStrikeRegex)
    if (match) {
      nodes.push({
        type: 'strike',
        children: parseMarkdownInline(match[1])
      })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // 7. Subrayado HTML <u>texto</u>
    match = remaining.match(htmlUnderlineRegex)
    if (match) {
      nodes.push({
        type: 'underline',
        children: parseMarkdownInline(match[1])
      })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // 8. Auto-enlace https://... o mailto:...
    match = remaining.match(autoUrlRegex)
    if (match) {
      nodes.push({
        type: 'link',
        href: match[1],
        label: match[1],
        isAuto: true
      })
      remaining = remaining.slice(match[0].length)
      continue
    }

    // 9. Si el carácter actual no inicia ningún token especial, acumular texto plano
    // Avanzar hasta el siguiente carácter especial o final
    const nextSpecialIndex = remaining.search(/[`*~_\[<]|https?:\/\/|mailto:/)
    if (nextSpecialIndex === -1) {
      nodes.push({ type: 'text', value: decodeHtmlEntities(remaining) })
      break
    } else if (nextSpecialIndex === 0) {
      // El carácter especial no formó un token válido (ej. un asterisco suelto)
      nodes.push({ type: 'text', value: decodeHtmlEntities(remaining[0]) })
      remaining = remaining.slice(1)
    } else {
      nodes.push({
        type: 'text',
        value: decodeHtmlEntities(remaining.slice(0, nextSpecialIndex))
      })
      remaining = remaining.slice(nextSpecialIndex)
    }
  }

  return nodes
}

// -------------------------------------------------------------
// Parser de Bloques de Markdown
// -------------------------------------------------------------

function isTableSeparatorLine(line: string): boolean {
  const trimmed = line.trim()
  if (!trimmed.includes('|')) return false
  const parts = trimmed
    .split('|')
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
  if (parts.length === 0) return false
  return parts.every((p) => /^:?-+:?$/.test(p))
}

function splitTableCells(line: string): string[] {
  let trimmed = line.trim()
  if (trimmed.startsWith('|')) trimmed = trimmed.slice(1)
  if (trimmed.endsWith('|')) trimmed = trimmed.slice(0, -1)
  return trimmed.split('|').map((c) => c.trim())
}

export function parseMarkdownToAst(content: string): MarkdownBlockNode[] {
  if (!content) return []

  // Normalizar saltos de línea y compatibilidad con bloques <pre><code> HTML antiguos
  let normalized = content
    .replace(/\r\n/g, '\n')
    .replace(
      /<pre[^>]*>\s*<code(?:\s+class=["'][^"']*language-([a-zA-Z0-9_-]+)[^"']*["'])?[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
      (_m, lang, inner) => {
        const clean = decodeHtmlEntities(inner.replace(/<br\s*\/?>/gi, '\n'))
        return `\n\`\`\`${lang || ''}\n${clean}\n\`\`\`\n`
      }
    )
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_m, inner) => {
      const clean = decodeHtmlEntities(inner.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?code[^>]*>/gi, ''))
      return `\n\`\`\`\n${clean}\n\`\`\`\n`
    })

  const lines = normalized.split('\n')
  const blocks: MarkdownBlockNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // 1. Bloque de código cercado ```lang ... ```
    const codeFenceMatch = line.match(/^```\s*([a-zA-Z0-9_-]*)/)
    if (codeFenceMatch) {
      const language = codeFenceMatch[1] || undefined
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      if (i < lines.length && lines[i].startsWith('```')) {
        i++ // consumir la línea de cierre ```
      }
      blocks.push({
        type: 'code',
        language,
        code: codeLines.join('\n')
      })
      continue
    }

    // 2. Línea horizontal (---, ***, ___)
    if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      blocks.push({ type: 'hr' })
      i++
      continue
    }

    // 3. Encabezados # a ######
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length as 1 | 2 | 3 | 4 | 5 | 6
      blocks.push({
        type: 'heading',
        level,
        children: parseMarkdownInline(headingMatch[2].trim())
      })
      i++
      continue
    }

    // 4. Citas (Blockquote) > línea
    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      blocks.push({
        type: 'quote',
        lines: quoteLines
      })
      continue
    }

    // 5. Tablas Markdown (| Header 1 | Header 2 |)
    if (
      line.trim().startsWith('|') &&
      i + 1 < lines.length &&
      isTableSeparatorLine(lines[i + 1])
    ) {
      const headerCells = splitTableCells(line)
      const headers = headerCells.map((cell) => parseMarkdownInline(cell))
      i += 2 // saltar cabecera y separador

      const rows: MarkdownInlineNode[][][] = []
      while (i < lines.length && lines[i].trim().includes('|')) {
        const rowCells = splitTableCells(lines[i])
        rows.push(rowCells.map((cell) => parseMarkdownInline(cell)))
        i++
      }

      blocks.push({
        type: 'table',
        headers,
        rows
      })
      continue
    }

    // 6. Listas no ordenadas (- item, * item, + item)
    const unorderedMatch = line.match(/^(\s*)([-*+])\s+(.+)$/)
    if (unorderedMatch) {
      const items: MarkdownInlineNode[][] = []
      while (i < lines.length) {
        const itemMatch = lines[i].match(/^(\s*)([-*+])\s+(.+)$/)
        if (!itemMatch) break
        items.push(parseMarkdownInline(itemMatch[3]))
        i++
      }
      blocks.push({
        type: 'list',
        ordered: false,
        items
      })
      continue
    }

    // 7. Listas ordenadas (1. item, 2. item)
    const orderedMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/)
    if (orderedMatch) {
      const startNum = parseInt(orderedMatch[2], 10)
      const items: MarkdownInlineNode[][] = []
      while (i < lines.length) {
        const itemMatch = lines[i].match(/^(\s*)(\d+)\.\s+(.+)$/)
        if (!itemMatch) break
        items.push(parseMarkdownInline(itemMatch[3]))
        i++
      }
      blocks.push({
        type: 'list',
        ordered: true,
        start: startNum,
        items
      })
      continue
    }

    // 8. Párrafo común / líneas de texto
    const paragraphLines: string[] = []
    while (
      i < lines.length &&
      !lines[i].startsWith('```') &&
      !lines[i].match(/^(#{1,6})\s+/) &&
      !/^(?:-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim()) &&
      !/^>\s?/.test(lines[i]) &&
      !(lines[i].trim().startsWith('|') && i + 1 < lines.length && isTableSeparatorLine(lines[i + 1])) &&
      !lines[i].match(/^(\s*)(?:[-*+]|\d+\.)\s+/)
    ) {
      paragraphLines.push(lines[i])
      i++
      // Si la línea actual es vacía, termina el bloque de párrafo
      if (paragraphLines[paragraphLines.length - 1].trim() === '') {
        break
      }
    }

    const paragraphText = paragraphLines.join('\n').replace(/^\n+|\n+$/g, '')
    if (paragraphText) {
      // Reemplazar saltos de línea con nodos de salto o preservarlos
      const inlineChildren: MarkdownInlineNode[] = []
      const parts = paragraphText.split('\n')
      parts.forEach((part, partIdx) => {
        if (partIdx > 0) {
          inlineChildren.push({ type: 'br' })
        }
        if (part) {
          inlineChildren.push(...parseMarkdownInline(part))
        }
      })
      blocks.push({
        type: 'paragraph',
        children: inlineChildren
      })
    }
  }

  return blocks
}

// -------------------------------------------------------------
// Renderizado de Nodos del AST
// -------------------------------------------------------------

function renderInlineNodes(
  nodes: MarkdownInlineNode[],
  isOwnMessage: boolean,
  keyPrefix = 'inline'
): React.ReactNode[] {
  return nodes.map((node, idx) => {
    const key = `${keyPrefix}-${idx}`

    switch (node.type) {
      case 'text':
        return <React.Fragment key={key}>{node.value}</React.Fragment>

      case 'br':
        return <br key={key} />

      case 'bold':
        return (
          <strong key={key} className='font-bold'>
            {renderInlineNodes(node.children, isOwnMessage, key)}
          </strong>
        )

      case 'italic':
        return (
          <em key={key} className='italic'>
            {renderInlineNodes(node.children, isOwnMessage, key)}
          </em>
        )

      case 'underline':
        return (
          <u key={key} className='underline underline-offset-2'>
            {renderInlineNodes(node.children, isOwnMessage, key)}
          </u>
        )

      case 'strike':
        return (
          <del key={key} className='line-through opacity-85'>
            {renderInlineNodes(node.children, isOwnMessage, key)}
          </del>
        )

      case 'inlineCode':
        return (
          <code
            key={key}
            className={cn(
              'inline-block rounded-md px-1.5 py-0.5 font-mono text-[11.5px]',
              isOwnMessage
                ? 'bg-blue-700/80 text-blue-100 border border-blue-400/40'
                : 'bg-slate-900 dark:bg-slate-950 text-emerald-300 dark:text-emerald-400 border border-slate-700/50'
            )}
          >
            {node.value}
          </code>
        )

      case 'link': {
        const safeHref = sanitizeUrl(node.href)
        if (!safeHref) {
          return <span key={key}>{node.label}</span>
        }

        return (
          <a
            key={key}
            href={safeHref}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'inline-flex items-center gap-0.5 font-semibold underline underline-offset-2 transition-opacity hover:opacity-85 break-all',
              isOwnMessage
                ? 'text-white decoration-blue-200'
                : 'text-blue-600 dark:text-blue-400 decoration-blue-400/60'
            )}
          >
            <span>{node.label}</span>
            <ExternalLink className='size-3 shrink-0 inline' />
          </a>
        )
      }

      default:
        return null
    }
  })
}

function renderBlockNodes(
  blocks: MarkdownBlockNode[],
  isOwnMessage: boolean
): React.ReactNode[] {
  return blocks.map((block, idx) => {
    const key = `block-${idx}`

    switch (block.type) {
      case 'code':
        return (
          <CodeBlock
            key={key}
            language={block.language}
            code={block.code}
            isOwnMessage={isOwnMessage}
          />
        )

      case 'heading': {
        const sizeClasses: Record<number, string> = {
          1: 'text-sm sm:text-base font-bold mt-2 mb-1',
          2: 'text-xs sm:text-sm font-bold mt-1.5 mb-1',
          3: 'text-xs font-bold mt-1 mb-0.5',
          4: 'text-xs font-semibold mt-1 mb-0.5',
          5: 'text-xs font-semibold mt-0.5 mb-0.5',
          6: 'text-xs font-medium mt-0.5 mb-0.5'
        }
        return (
          <div key={key} className={sizeClasses[block.level]}>
            {renderInlineNodes(block.children, isOwnMessage, key)}
          </div>
        )
      }

      case 'quote':
        return (
          <blockquote
            key={key}
            className={cn(
              'my-1.5 border-l-2 pl-3 italic',
              isOwnMessage
                ? 'border-blue-200 text-blue-50'
                : 'border-violet-400 dark:border-violet-500 text-neutral-600 dark:text-neutral-300'
            )}
          >
            {block.lines.map((qLine, qIdx) => (
              <div key={`${key}-line-${qIdx}`}>
                {renderInlineNodes(parseMarkdownInline(qLine), isOwnMessage, `${key}-${qIdx}`)}
              </div>
            ))}
          </blockquote>
        )

      case 'list': {
        const ListTag = block.ordered ? 'ol' : 'ul'
        const listClass = block.ordered
          ? 'my-1.5 list-decimal pl-5 space-y-1 marker:font-semibold'
          : 'my-1.5 list-disc pl-5 space-y-1'

        return (
          <ListTag key={key} start={block.start} className={listClass}>
            {block.items.map((item, itemIdx) => (
              <li key={`${key}-item-${itemIdx}`} className='leading-relaxed'>
                {renderInlineNodes(item, isOwnMessage, `${key}-${itemIdx}`)}
              </li>
            ))}
          </ListTag>
        )
      }

      case 'table':
        return (
          <div
            key={key}
            className={cn(
              'my-2 overflow-x-auto rounded-xl border',
              isOwnMessage
                ? 'border-blue-400/40 bg-blue-700/40'
                : 'border-neutral-200 dark:border-neutral-700/80 bg-white/80 dark:bg-neutral-900/60'
            )}
          >
            <table className='w-full border-collapse text-left text-xs'>
              {block.headers.length > 0 && (
                <thead
                  className={cn(
                    'border-b font-semibold',
                    isOwnMessage
                      ? 'border-blue-400/40 bg-blue-800/50 text-white'
                      : 'border-neutral-200 dark:border-neutral-700/80 bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-100'
                  )}
                >
                  <tr>
                    {block.headers.map((hdr, hIdx) => (
                      <th key={`${key}-th-${hIdx}`} className='px-2.5 py-1.5 font-semibold whitespace-nowrap'>
                        {renderInlineNodes(hdr, isOwnMessage, `${key}-th-${hIdx}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className='divide-y divide-neutral-200/60 dark:divide-neutral-800/60'>
                {block.rows.map((row, rIdx) => (
                  <tr
                    key={`${key}-tr-${rIdx}`}
                    className={cn(
                      'border-b last:border-b-0',
                      isOwnMessage
                        ? 'border-blue-400/30 hover:bg-blue-700/30'
                        : 'border-neutral-200/60 dark:border-neutral-800/60 hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40'
                    )}
                  >
                    {row.map((cell, cIdx) => (
                      <td key={`${key}-td-${rIdx}-${cIdx}`} className='px-2.5 py-1.5 align-top'>
                        {renderInlineNodes(cell, isOwnMessage, `${key}-td-${rIdx}-${cIdx}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      case 'hr':
        return (
          <hr
            key={key}
            className={cn(
              'my-2 border-t',
              isOwnMessage
                ? 'border-blue-400/40'
                : 'border-neutral-200 dark:border-neutral-700'
            )}
          />
        )

      case 'paragraph':
      default:
        return (
          <div key={key} className='whitespace-pre-wrap break-words leading-relaxed'>
            {renderInlineNodes(block.children, isOwnMessage, key)}
          </div>
        )
    }
  })
}

// -------------------------------------------------------------
// Componente Principal
// -------------------------------------------------------------

export function MessageRichText({
  content,
  isOwnMessage = false,
  className
}: MessageRichTextProps) {
  const blocks = parseMarkdownToAst(content)

  return (
    <div className={cn('space-y-1 whitespace-pre-wrap break-words leading-relaxed', className)}>
      {renderBlockNodes(blocks, isOwnMessage)}
    </div>
  )
}

export default MessageRichText
