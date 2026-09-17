'use client'

import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Button, Textarea } from '../ui'
import { Send, Paperclip, X, SendHorizontal, Lock } from 'lucide-react'

interface ConversationComposerProps {
  inputText: string
  setInputText: (text: string) => void
  onSendMessage: () => void
  onSelectFile: (file: File) => void
  pendingFile: File | null
  onRemoveFile: () => void
  isSending: boolean
  isUploading: boolean
  conversationName: string
  isClosed?: boolean
}

export function ConversationComposer({
  inputText,
  setInputText,
  onSendMessage,
  onSelectFile,
  pendingFile,
  onRemoveFile,
  isSending,
  isUploading,
  conversationName,
  isClosed = false
}: ConversationComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const maxTextareaHeight = 120

  const pendingPreviewUrl = useMemo(
    () =>
      pendingFile && pendingFile.type.startsWith('image/')
        ? URL.createObjectURL(pendingFile)
        : undefined,
    [pendingFile]
  )

  useEffect(() => {
    return () => {
      if (pendingPreviewUrl) URL.revokeObjectURL(pendingPreviewUrl)
    }
  }, [pendingPreviewUrl])

  useLayoutEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    const nextHeight = Math.min(textarea.scrollHeight, maxTextareaHeight)
    textarea.style.height = `${nextHeight}px`
    textarea.style.overflowY = textarea.scrollHeight > maxTextareaHeight ? 'auto' : 'hidden'
  }, [inputText])

  if (isClosed) {
    return (
      <div className='shrink-0 px-3 pb-3 pt-1 text-center sm:px-4 sm:pb-4'>
        <div className='flex items-center justify-center gap-2 rounded-xl border border-neutral-200/80 bg-white/85 dark:border-neutral-800/80 dark:bg-neutral-900/85 backdrop-blur-md px-4 py-2 text-xs font-medium text-neutral-500 shadow-xs dark:text-neutral-400'>
          <Lock className='size-3.5 text-neutral-400 dark:text-neutral-500 shrink-0' />
          <span>Esta conversación ha sido finalizada y no admite nuevos mensajes.</span>
        </div>
      </div>
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSendMessage()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onSelectFile(file)
    event.target.value = ''
  }

  return (
    <div className='shrink-0 px-3 pb-3 pt-1 sm:px-4 sm:pb-4'>
      {/* Campo de Texto y Botones Flotantes */}
      <div className='relative'>
        {pendingFile && (
          <div className='mb-2 flex items-center gap-2 rounded-xl border border-neutral-200/80 bg-white/95 backdrop-blur-md p-2 shadow-xs dark:border-neutral-700/80 dark:bg-neutral-800/95'>
            {pendingFile.type.startsWith('image/') ? (
              <img
                src={pendingPreviewUrl || ''}
                alt='Archivo seleccionado'
                className='size-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700'
              />
            ) : (
              <div className='flex size-12 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'>
                <Paperclip className='size-5' />
              </div>
            )}
            <span className='min-w-0 flex-1 truncate text-xs text-neutral-600 dark:text-neutral-300 font-medium'>
              {pendingFile.name || 'Archivo listo para enviar'}
            </span>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={onRemoveFile}
              className='size-7 shrink-0 p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              aria-label='Quitar archivo'
            >
              <X className='size-3.5' />
            </Button>
          </div>
        )}
        <div className='flex items-center gap-1.5 rounded-2xl border border-neutral-200/80 bg-white/95 backdrop-blur-md px-2.5 py-1.5 shadow-sm transition-all focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:shadow-md dark:border-neutral-700/80 dark:bg-neutral-800/95'>
          <label
            className='flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200'
            title='Adjuntar archivo'
          >
            <Paperclip className='size-4' />
            <input
              type='file'
              className='sr-only'
              onChange={handleFileChange}
              disabled={isSending || isUploading}
            />
          </label>

          <Textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Responder a ${conversationName}...`}
            rows={1}
            className='!min-h-0 !border-transparent max-h-30 flex-1 resize-none overflow-y-hidden rounded-xl bg-transparent px-2 py-1 text-xs leading-5 shadow-none !outline-none focus:!border-transparent focus:!outline-none focus-visible:!border-transparent focus-visible:!ring-0 focus-visible:!outline-none sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400'
          />

          <Button
            size='icon'
            variant='primary'
            onClick={onSendMessage}
            disabled={(!inputText.trim() && !pendingFile) || isSending || isUploading}
            className='size-8 shrink-0 rounded-full p-0'
            aria-label='Enviar mensaje'
            title='Enviar mensaje'
          >
            <SendHorizontal className='size-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
