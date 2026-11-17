'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BookOpen, Bot, CheckCircle2, ChevronsDown, Sparkles } from 'lucide-react'
import type { VoiceMatchedArticle, VoiceTranscriptItem } from '../../types/voice.types'

export interface VoiceTranscriptListProps {
  transcripts: VoiceTranscriptItem[]
  matchedArticle: VoiceMatchedArticle | null
  noticeBanner: string | null
}

export function VoiceTranscriptList({
  transcripts,
  matchedArticle,
  noticeBanner
}: VoiceTranscriptListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isNearBottomRef = useRef(true)
  const prevCountRef = useRef(0)

  const [isNearBottom, setIsNearBottom] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({
      top: el.scrollHeight,
      behavior
    })
    isNearBottomRef.current = true
    setIsNearBottom(true)
    setUnreadCount(0)
  }, [])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    const nearBottom = distanceFromBottom < 40
    isNearBottomRef.current = nearBottom
    setIsNearBottom(nearBottom)
    if (nearBottom) {
      setUnreadCount(0)
    }
  }, [])

  useEffect(() => {
    const prevCount = prevCountRef.current
    const currentCount = transcripts.length
    prevCountRef.current = currentCount

    if (currentCount === 0) {
      setUnreadCount(0)
      isNearBottomRef.current = true
      setIsNearBottom(true)
      return
    }

    if (isNearBottomRef.current) {
      const el = scrollRef.current
      if (el) {
        el.scrollTop = el.scrollHeight
      }
    } else if (currentCount > prevCount) {
      setUnreadCount((prev) => prev + (currentCount - prevCount))
    } else {
      // Si el bot está haciendo streaming en el último mensaje mientras el usuario lee arriba
      const last = transcripts[currentCount - 1]
      if (last && !last.isFinal) {
        setUnreadCount((prev) => (prev === 0 ? 1 : prev))
      }
    }
  }, [transcripts, matchedArticle, noticeBanner])

  return (
    <div className='flex flex-col flex-1 min-h-0'>
      {/* Avisos Contextuales: Artículo Wiki o Confirmación Multimodal */}
      {(matchedArticle || noticeBanner) && (
        <div className='mx-5 mt-2.5 space-y-1.5 shrink-0'>
          {matchedArticle && (
            <div className='flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50/70 px-3 py-2 text-xs text-violet-900'>
              <BookOpen className='size-3.5 text-violet-600 shrink-0' />
              <span className='truncate'>
                <strong className='font-semibold'>Guía aplicada:</strong> {matchedArticle.title}
              </span>
            </div>
          )}

          {noticeBanner && (
            <div className='flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-xs text-emerald-800 animate-in fade-in duration-200'>
              <CheckCircle2 className='size-3.5 text-emerald-600 shrink-0' />
              <span className='truncate font-medium'>{noticeBanner}</span>
            </div>
          )}
        </div>
      )}

      {/* Divisor de Fecha "Hoy" */}
      {transcripts.length > 0 && (
        <div className='relative mx-5 my-3 flex items-center justify-center shrink-0'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-neutral-100' />
          </div>
          <span className='relative bg-white px-3 text-[11px] font-medium text-neutral-400'>
            Hoy
          </span>
        </div>
      )}

      {/* Contenedor relativo para albergar el scroll y el botón flotante de bajar / nuevo mensaje */}
      <div className='relative flex-1 min-h-[160px] max-h-[250px] flex flex-col'>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className='flex-1 overflow-y-auto px-5 pb-3 space-y-3 font-sans scroll-smooth'
        >
          {transcripts.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full min-h-[150px] text-center py-4 text-neutral-400'>
              <p className='text-xs font-medium text-neutral-500'>
                Habla normalmente al micrófono...
              </p>
              <p className='text-[11px] text-neutral-400 mt-1 max-w-xs'>
                &ldquo;Hola, la impresora POS tiene luz roja y no imprime el recibo&rdquo;
              </p>
            </div>
          ) : (
            transcripts.map((item) => {
              const isBot = item.sender === 'assistant'
              return (
                <div
                  key={item.id}
                  className={
                    isBot
                      ? 'flex items-start gap-3 animate-in fade-in slide-in-from-bottom-1 duration-200'
                      : 'flex items-start justify-end gap-2.5 animate-in fade-in slide-in-from-bottom-1 duration-200'
                  }
                >
                  {isBot && (
                    <div className='relative shrink-0 mt-0.5'>
                      <div className='flex size-8 items-center justify-center rounded-full bg-violet-600 text-white shadow-2xs'>
                        <Bot className='size-4' />
                      </div>
                    </div>
                  )}

                  <div
                    className={
                      isBot
                        ? 'flex flex-col gap-1 max-w-[85%] rounded-2xl border border-violet-200/80 bg-violet-50/40 px-4 py-3 text-[13px] leading-relaxed text-neutral-800 shadow-2xs'
                        : 'flex flex-col gap-1 max-w-[80%] rounded-2xl bg-violet-600 px-4 py-2.5 text-[13px] leading-relaxed text-white shadow-xs'
                    }
                  >
                    {isBot && (
                      <div className='flex items-center gap-1.5 mb-0.5'>
                        <span className='text-xs font-bold text-violet-700'>Asistente SDi</span>
                        <span className='inline-flex items-center gap-0.5 rounded-full bg-violet-100 px-1.5 py-0.2 text-[9px] font-bold text-violet-700 border border-violet-200/60'>
                          <Sparkles className='size-2.5 text-violet-600' />
                          <span>IA</span>
                        </span>
                        <span className='text-[11px] text-neutral-400 font-medium ml-1'>
                          {item.timestamp}
                        </span>
                      </div>
                    )}
                    <p className='whitespace-pre-wrap'>
                      {item.text}
                      {isBot && !item.isFinal && (
                        <span
                          className='inline-block w-1.5 h-3.5 ml-1 bg-violet-500 animate-pulse align-middle rounded-xs'
                          aria-hidden='true'
                        />
                      )}
                    </p>
                    {!isBot && (
                      <span className='text-[10px] text-white/75 text-right mt-0.5'>
                        {item.timestamp}
                      </span>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Botón Flotante: Bajar / Indicador de Mensajes Nuevos */}
        {!isNearBottom && transcripts.length > 0 && (
          <div className='pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200'>
            {unreadCount > 0 ? (
              <button
                type='button'
                onClick={() => scrollToBottom('smooth')}
                aria-label={`${unreadCount} mensaje${unreadCount > 1 ? 's' : ''} nuevo${unreadCount > 1 ? 's' : ''}, ir al final`}
                className='pointer-events-auto flex items-center gap-1.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white px-3.5 py-1.5 text-[11px] font-semibold shadow-lg ring-2 ring-white transition-all active:scale-95 cursor-pointer'
              >
                <span className='size-1.5 rounded-full bg-emerald-300 animate-ping' />
                <span>
                  {unreadCount === 1
                    ? 'Nuevo mensaje'
                    : `${unreadCount > 99 ? '99+' : unreadCount} mensajes nuevos`}
                </span>
                <ChevronsDown className='size-3.5 animate-bounce' />
              </button>
            ) : (
              <button
                type='button'
                onClick={() => scrollToBottom('smooth')}
                title='Ir a los mensajes recientes'
                aria-label='Ir a los mensajes recientes'
                className='pointer-events-auto flex items-center gap-1 rounded-full bg-white/95 hover:bg-neutral-50 text-violet-600 border border-violet-200/80 px-3 py-1.5 text-[11px] font-semibold shadow-md backdrop-blur-xs transition-all active:scale-95 cursor-pointer'
              >
                <ChevronsDown className='size-3.5' />
                <span>Bajar</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
