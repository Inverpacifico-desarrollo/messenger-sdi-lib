'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Dialog,
  DialogContent,
  Button,
  cn
} from '../../ui'
import {
  Bot,
  Ear,
  Mic,
  MicOff,
  PhoneOff,
  Send,
  Paperclip,
  Clock,
  Ticket,
  Sparkles,
  ShieldCheck,
  Minimize2,
  Maximize2,
  Loader2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react'
import type {
  VoiceCallState,
  VoiceCallContextBadges,
  VoiceTranscriptItem
} from '../../types/voice.types'
import { MockVoiceCallDriver } from '../../services/voice.service'
import { VoiceWaveformCanvas } from './voice-waveform-canvas'
import { useVoiceMicrophone } from '../../hooks/use-voice-microphone'

export interface VoiceCallDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: string
  conversationId: string | number
  userId: string | number
  senderMessengerId: string | number
  onCallEnded?: () => void
}

export function VoiceCallDialog({
  open,
  onOpenChange,
  sessionId,
  conversationId,
  userId,
  senderMessengerId,
  onCallEnded
}: VoiceCallDialogProps) {
  const [callState, setCallState] = useState<VoiceCallState>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [durationSeconds, setDurationSeconds] = useState(0)
  const [contextBadges, setContextBadges] = useState<VoiceCallContextBadges | null>(null)
  const [transcripts, setTranscripts] = useState<VoiceTranscriptItem[]>([])
  const [simulatedSpeechInput, setSimulatedSpeechInput] = useState('')

  const driverRef = useRef<MockVoiceCallDriver | null>(null)
  const transcriptScrollRef = useRef<HTMLDivElement>(null)

  // Cronómetro de llamada activa
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    const isCallActive =
      callState === 'connected' ||
      callState === 'speaking' ||
      callState === 'listening' ||
      callState === 'muted'

    if (isCallActive) {
      timer = setInterval(() => {
        setDurationSeconds((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [callState])

  // Inicializar o finalizar el driver cuando cambia el estado `open`
  useEffect(() => {
    if (open) {
      setIsMinimized(false)
      setDurationSeconds(0)
      setIsMuted(false)
      setTranscripts([])
      setCallState('connecting')

      const driver = new MockVoiceCallDriver({
        onStateChange: (newState) => {
          setCallState(newState)
          if (newState === 'ended') {
            onCallEnded?.()
          }
        },
        onContextReady: (badges) => {
          setContextBadges(badges)
        },
        onTranscript: (item) => {
          setTranscripts((prev) => {
            const index = prev.findIndex((t) => t.id === item.id)
            if (index >= 0) {
              const updated = [...prev]
              updated[index] = item
              return updated
            }
            return [...prev, item]
          })
        }
      })

      driverRef.current = driver
      driver.connect({
        sessionId,
        conversationId,
        userId,
        senderMessengerId
      })
    } else {
      driverRef.current?.hangup()
      driverRef.current = null
      setCallState('idle')
      setIsMinimized(false)
    }

    return () => {
      driverRef.current?.hangup()
      driverRef.current = null
    }
  }, [open, sessionId, conversationId, userId, senderMessengerId, onCallEnded])

  // Autoscroll del panel de transcripción al recibir nuevas frases
  useEffect(() => {
    if (transcriptScrollRef.current) {
      transcriptScrollRef.current.scrollTop = transcriptScrollRef.current.scrollHeight
    }
  }, [transcripts])

  const formattedDuration = useMemo(() => {
    const mins = Math.floor(durationSeconds / 60)
    const secs = durationSeconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }, [durationSeconds])

  const handleToggleMute = () => {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    driverRef.current?.setMuted(nextMuted)
  }

  const handleHangup = () => {
    driverRef.current?.hangup()
    setCallState('ended')
    setIsMinimized(false)
  }

  const handleDismissEndedCall = () => {
    onOpenChange(false)
    onCallEnded?.()
  }

  // Auto-cierre suave tras 4.5 segundos mostrando la pantalla de finalización amigable
  useEffect(() => {
    if (callState === 'ended') {
      const timer = setTimeout(() => {
        handleDismissEndedCall()
      }, 4500)
      return () => clearTimeout(timer)
    }
  }, [callState])

  const handleSendSimulatedSpeech = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = simulatedSpeechInput.trim()
    if (!trimmed) return
    driverRef.current?.simulateUserSpeech(trimmed)
    setSimulatedSpeechInput('')
  }

  const handleDialogCloseAttempt = (nextOpen: boolean) => {
    if (!nextOpen) {
      if (callState === 'ended') {
        handleDismissEndedCall()
        return
      }
      setIsMinimized(true)
      return
    }
    onOpenChange(nextOpen)
  }

  const isEnded = callState === 'ended'
  const isConnecting =
    callState === 'connecting' ||
    callState === 'requesting_permission' ||
    callState === 'idle'

  // Captura del micrófono real del usuario vía Web Audio API
  const isMicEnabled = open && !isConnecting && !isEnded
  const {
    analyserNode,
    audioLevel,
    hasPermission,
    error: micError,
    start: requestMicrophone
  } = useVoiceMicrophone({
    enabled: isMicEnabled,
    isMuted,
    fftSize: 64,
    levelUpdateInterval: 50
  })

  // Cálculo reactivo de los 8 segmentos del medidor VU
  const activeVUSegments = useMemo(() => {
    if (isMuted || isConnecting || isEnded || hasPermission === false) return 0
    if (audioLevel < 0.02) return 1 // 1 segmento verde indicativo de micrófono activo
    return Math.min(8, Math.max(1, Math.round(audioLevel * 10) + 1))
  }, [isMuted, isConnecting, isEnded, hasPermission, audioLevel])

  const handleHeroMicClick = () => {
    if (hasPermission === false) {
      requestMicrophone()
      return
    }
    handleToggleMute()
  }

  if (!open) return null

  return (
    <>
      {/* 1. Modal Principal: Diseño fiel a la maqueta */}
      <Dialog open={open && !isMinimized} onOpenChange={handleDialogCloseAttempt}>
        <DialogContent
          showClose={false}
          className='sm:max-w-xl w-full p-0 flex flex-col overflow-hidden bg-white text-neutral-900 border border-neutral-200 shadow-2xl rounded-3xl'
        >
          {/* Cabecera Principal */}
          <div className='flex items-center justify-between p-5 pb-3 border-b border-neutral-100 bg-white'>
            <div className='flex items-center gap-3'>
              {/* Avatar Bot Circular Violeta */}


              {/* Título y Subtítulo */}
              <div className='flex flex-col'>
                <div className='flex items-center gap-2 flex-wrap'>
                  <h2 className='text-base font-bold text-neutral-900 leading-tight'>
                    Asistente de Voz SDi
                  </h2>
                  {isEnded ? (
                    <span className='inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200'>
                      FINALIZADA
                    </span>
                  ) : isConnecting ? (
                    <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-200/80'>
                      <Loader2 className='size-2.5 animate-spin' />
                      <span>CONECTANDO...</span>
                    </span>
                  ) : (
                    <span className='inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/80'>
                      EN VIVO
                    </span>
                  )}

                </div>
                <p className='text-xs text-neutral-400 mt-0.5'>
                  {isEnded
                    ? 'Resumen de atención completada'
                    : isConnecting
                      ? 'Estableciendo canal telefónico interactivo...'
                      : 'Canal telefónico full-duplex de baja latencia'}
                </p>
              </div>
            </div>

            {/* Acciones de Cabecera: Cronómetro y Botón Minimizar */}
            {!isConnecting && (
              <div className='flex items-center gap-2'>
                {/* Cronómetro en Cápsula */}
                <div className='flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-neutral-50/80 px-3 py-1.5 text-xs font-mono font-semibold text-neutral-700 shadow-2xs'>
                  <Clock className='size-3.5 text-neutral-500' />
                  <span>{formattedDuration}</span>
                </div>

                {/* Botón Minimizar Claro y Visible (Solo en llamada activa) */}
                {!isEnded && (
                  <button
                    type='button'
                    onClick={() => setIsMinimized(true)}
                    title='Minimizar llamada'
                    aria-label='Minimizar llamada'
                    className='flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 hover:border-neutral-300 shadow-2xs transition-all cursor-pointer'
                  >
                    <Minimize2 className='size-3.5 text-neutral-500' />
                    <span className='hidden sm:inline text-[11px] font-medium'>Minimizar</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Tarjeta de Audio y Visualizador (Solo visible cuando la llamada esté iniciada y activa) */}
          {!isConnecting && !isEnded && (
            <div className='mx-5 mt-3 rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs flex items-center justify-between gap-3'>
              {/* Lado Izquierdo: Icono Oreja en Círculos Concéntricos + Texto */}
              <div
                className={cn(
                  'flex items-center gap-3 shrink-0',
                  hasPermission === false && 'cursor-pointer'
                )}
                onClick={hasPermission === false ? () => requestMicrophone() : undefined}
                title={hasPermission === false ? 'Haz clic para permitir acceso al micrófono' : undefined}
              >

                <div className='flex flex-col'>
                  <span
                    className={cn(
                      'text-sm font-bold',
                      hasPermission === false ? 'text-amber-800' : 'text-emerald-600'
                    )}
                  >
                    {hasPermission === false
                      ? 'Micrófono bloqueado'
                      : isMuted
                        ? 'Micrófono en silencio'
                        : callState === 'speaking'
                          ? 'Asistente hablando...'
                          : audioLevel > 0.08
                            ? 'Escuchando tu voz...'
                            : 'Te escucho...'}
                  </span>
                  <span className='text-xs text-neutral-400'>
                    {hasPermission === false
                      ? 'Permiso requerido'
                      : isMuted
                        ? 'Pulsa para reactivar'
                        : callState === 'speaking'
                          ? 'Instrucciones paso a paso'
                          : audioLevel > 0.08
                            ? 'Voz detectada en vivo'
                            : 'Habla con naturalidad'}
                  </span>
                </div>
              </div>

              {/* Centro: Visualizador de Barras de Ecualizador en Canvas (solo responde al micrófono) */}
              <div className='flex-1 max-w-[200px] sm:max-w-[260px] h-10 flex items-center justify-center'>
                <VoiceWaveformCanvas
                  state={callState}
                  isMuted={isMuted}
                  height={36}
                  analyserNode={analyserNode}
                  hasPermission={hasPermission}
                />
              </div>

              {/* Lado Derecho: Micrófono Activo + Medidor VU Reactivo */}
              <div className='flex flex-col items-end gap-1 shrink-0'>
                {hasPermission === false ? (
                  <button
                    type='button'
                    onClick={() => requestMicrophone()}
                    title='Permiso de micrófono no otorgado. Haz clic para permitir'
                    className='flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all cursor-pointer'
                  >
                    <MicOff className='size-3 text-amber-600' />
                    <span>Sin permiso</span>
                  </button>
                ) : (
                  <div className='flex items-center gap-1 text-[11px] font-semibold text-emerald-600'>
                    <Mic className='size-3' />
                    <span>{isMuted ? 'Micrófono silenciado' : 'Micrófono activo'}</span>
                  </div>
                )}
                <div className='flex items-center gap-0.5'>
                  {[...Array(8)].map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'w-1.5 h-2.5 rounded-xs transition-colors duration-75',
                        hasPermission !== false && !isMuted && i < activeVUSegments
                          ? 'bg-emerald-500'
                          : 'bg-neutral-200'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Divisor de Fecha "Hoy" (Solo visible cuando hay transcripciones activas y no ha finalizado) */}
          {!isConnecting && !isEnded && transcripts.length > 0 && (
            <div className='relative mx-5 my-3 flex items-center justify-center'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-neutral-100' />
              </div>
              <span className='relative bg-white px-3 text-[11px] font-medium text-neutral-400'>
                Hoy
              </span>
            </div>
          )}

          {/* Área Central: Finalizada vs Conectando vs Transcripciones en Vivo */}
          {isEnded ? (
            <div className='flex flex-1 flex-col items-center justify-center text-center p-8 min-h-[350px] animate-in fade-in zoom-in-95 duration-200'>
              <div className='relative mb-4'>
                <div className='flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-md'>
                  <CheckCircle2 className='size-8 text-emerald-600' />
                </div>
                <span className='absolute inset-0 rounded-full bg-emerald-500/15 animate-ping' />
              </div>

              <h3 className='text-lg font-bold text-neutral-900'>
                Llamada finalizada
              </h3>
              <p className='text-xs text-neutral-500 mt-1 max-w-xs leading-relaxed'>
                Gracias por comunicarte. La atención con el Asistente Virtual SDi ha concluido con éxito.
              </p>

              {/* Resumen de Métricas de la Llamada */}
              <div className='mt-5 flex items-center justify-center gap-2 flex-wrap max-w-sm'>
                <div className='flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-1.5 text-xs text-neutral-700 shadow-2xs font-medium'>
                  <Clock className='size-3.5 text-neutral-500' />
                  <span>Duración: <strong className='font-mono text-neutral-900'>{formattedDuration}</strong></span>
                </div>

                <div className='flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-1.5 text-xs text-neutral-700 shadow-2xs font-medium'>
                  <Bot className='size-3.5 text-violet-600' />
                  <span><strong className='text-neutral-900'>{transcripts.length}</strong> intervenciones</span>
                </div>

                {contextBadges?.ticketNumber && (
                  <div className='flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-1.5 text-xs text-amber-700 shadow-2xs font-medium'>
                    <Ticket className='size-3.5 text-amber-600' />
                    <span>Ticket <strong className='text-amber-800'>#{contextBadges.ticketNumber}</strong></span>
                  </div>
                )}
              </div>

              <p className='text-[11px] text-neutral-400 mt-3'>
                El registro de la llamada se encuentra disponible en tu conversación.
              </p>

              {/* Botón Aceptar y Cerrar */}
              <div className='mt-5'>
                <Button
                  type='button'
                  variant='primary'
                  onClick={handleDismissEndedCall}
                  className='h-10 px-6 text-xs sm:text-sm font-semibold rounded-xl shadow-xs cursor-pointer'
                >
                  Aceptar y cerrar
                </Button>
              </div>
            </div>
          ) : isConnecting ? (
            <div className='flex flex-1 flex-col items-center justify-center text-center p-8 min-h-[300px]'>
              <div className='relative mb-5'>
                <div className='flex size-16 items-center justify-center rounded-full bg-violet-600 text-white shadow-xl shadow-violet-600/30'>
                  <Bot className='size-8' />
                </div>
                <span className='absolute inset-0 rounded-full bg-violet-500/20 animate-ping' />
              </div>
              <div className='flex items-center gap-2 text-sm font-bold text-neutral-800'>
                <Loader2 className='size-4 animate-spin text-violet-600' />
                <span>Conectando con el Asistente Virtual...</span>
              </div>
              <p className='text-xs text-neutral-400 mt-1 max-w-xs leading-relaxed'>
                Estableciendo canal telefónico interactivo full-duplex. El asistente te atenderá en unos segundos.
              </p>
            </div>
          ) : (
            <div
              ref={transcriptScrollRef}
              className='flex-1 min-h-[170px] max-h-[260px] overflow-y-auto px-5 space-y-3 font-sans'
            >
              {transcripts.length === 0 ? (
                <div className='flex h-full flex-col items-center justify-center text-center p-6 text-neutral-400'>
                  <div className='flex size-11 items-center justify-center rounded-full bg-violet-600 text-white shadow-xs mb-2.5'>
                    <Bot className='size-6' />
                  </div>
                  <p className='text-xs font-semibold text-neutral-700'>
                    Iniciando conversación...
                  </p>
                  <p className='text-[11px] text-neutral-400 mt-0.5 max-w-xs leading-relaxed'>
                    El asistente te dará las instrucciones verbales de bienvenida.
                  </p>
                </div>
              ) : (
                transcripts.map((item) => {
                  const isAssistant = item.sender === 'assistant'
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        'flex items-start gap-3 max-w-[92%]',
                        isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'
                      )}
                    >
                      {isAssistant && (
                        <div className='flex size-9 items-center justify-center rounded-full bg-violet-600 text-white shadow-xs shrink-0 mt-0.5'>
                          <Bot className='size-5' />
                        </div>
                      )}

                      <div className={cn('flex flex-col gap-1', !isAssistant && 'items-end')}>
                        <div className='flex items-center gap-1.5'>
                          <span className='text-xs font-bold text-violet-700'>
                            {isAssistant ? 'Asistente SDi' : 'Tú'}
                          </span>
                          {isAssistant && (
                            <span className='inline-flex items-center gap-0.5 rounded-full bg-violet-100 px-1.5 py-0.2 text-[9.5px] font-semibold text-violet-700 border border-violet-200/60 shadow-2xs'>
                              <Sparkles className='size-2.5 text-violet-600' />
                              <span>IA</span>
                            </span>
                          )}
                          <span className='text-[10px] text-neutral-400 ml-1'>{item.timestamp}</span>
                        </div>

                        <div
                          className={cn(
                            'rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs',
                            isAssistant
                              ? 'rounded-tl-xs bg-white text-neutral-800 border border-violet-100'
                              : 'rounded-tr-xs bg-blue-600 text-white'
                          )}
                        >
                          <p>
                            {item.text}
                            {isAssistant && !item.isFinal && (
                              <span className='inline-block w-1.5 h-3.5 ml-1 bg-violet-500 rounded-xs animate-pulse align-middle' />
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {/* Campo de Entrada de Mensaje (Solo visible cuando la llamada esté iniciada y activa) */}
          {!isConnecting && !isEnded && (
            <div className='mx-5 mt-2'>
              <form
                onSubmit={handleSendSimulatedSpeech}
                className='flex items-center gap-2.5 rounded-2xl border border-neutral-200/90 bg-white px-3.5 py-2 shadow-2xs'
              >
                <button
                  type='button'
                  className='text-neutral-400 hover:text-neutral-600 transition-colors p-1 cursor-pointer'
                  title='Adjuntar archivo'
                >
                  <Paperclip className='size-4' />
                </button>
                <input
                  type='text'
                  value={simulatedSpeechInput}
                  onChange={(e) => setSimulatedSpeechInput(e.target.value)}
                  placeholder='Escribe tu mensaje o deja que el asistente te escuche...'
                  className='flex-1 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 bg-transparent outline-none'
                />
                <button
                  type='submit'
                  disabled={!simulatedSpeechInput.trim()}
                  className='flex size-8.5 items-center justify-center rounded-full bg-violet-600 hover:bg-violet-700 text-white transition-all shadow-xs disabled:opacity-40 cursor-pointer shrink-0'
                >
                  <Send className='size-4' />
                </button>
              </form>
            </div>
          )}

          {/* Barra de Controles Telefónicos Inferior: Solo visible mientras no haya finalizado */}
          {!isEnded && (
            isConnecting ? (
              <div className='px-5 pt-3 pb-3 bg-white flex items-center justify-center'>
                <button
                  type='button'
                  onClick={handleHangup}
                  className='flex items-center gap-1.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-100 px-5 py-2 text-xs font-semibold text-red-600 shadow-2xs cursor-pointer active:scale-95 transition-all'
                >
                  <PhoneOff className='size-3.5' />
                  <span>Cancelar llamada</span>
                </button>
              </div>
            ) : (
              <div className='px-5 pt-3 pb-2 bg-white flex items-center justify-center gap-4 sm:gap-5'>
                {/* Botón Silenciar */}
                <button
                  type='button'
                  onClick={hasPermission === false ? () => requestMicrophone() : handleToggleMute}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold transition-all shadow-2xs cursor-pointer shrink-0',
                    hasPermission === false
                      ? 'text-amber-700 border-amber-300 bg-amber-50/70 hover:bg-amber-100/70'
                      : isMuted
                        ? 'text-amber-600 border-amber-300 bg-amber-50/60'
                        : 'text-neutral-700 hover:bg-neutral-50'
                  )}
                >
                  {hasPermission === false ? (
                    <MicOff className='size-4 text-amber-600' />
                  ) : isMuted ? (
                    <MicOff className='size-4 text-amber-500' />
                  ) : (
                    <MicOff className='size-4 text-violet-600' />
                  )}
                  <span>{hasPermission === false ? 'Sin permiso' : isMuted ? 'Silenciado' : 'Silenciar'}</span>
                </button>

                {/* Centro: Gran Botón Micrófono Hero con Aura reactiva */}
                <div className='relative flex items-center justify-center shrink-0'>
                  <div
                    className={cn(
                      'p-2 rounded-full transition-all duration-150',
                      hasPermission === false
                        ? 'bg-amber-100/70 ring-8 ring-amber-500/20'
                        : isMuted
                          ? 'bg-amber-100/60 ring-8 ring-amber-500/15'
                          : audioLevel > 0.08
                            ? 'bg-violet-100 ring-10 ring-violet-500/30'
                            : 'bg-violet-100/60 ring-8 ring-violet-500/15'
                    )}
                  >
                    <button
                      type='button'
                      onClick={handleHeroMicClick}
                      title={
                        hasPermission === false
                          ? 'Permiso de micrófono no otorgado. Haz clic para solicitar permiso'
                          : isMuted
                            ? 'Activar micrófono'
                            : 'Micrófono activo'
                      }
                      className={cn(
                        'flex size-14 items-center justify-center rounded-full text-white transition-all shadow-xl active:scale-95 cursor-pointer',
                        hasPermission === false
                          ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/35 ring-4 ring-amber-600/20'
                          : isMuted
                            ? 'bg-amber-500 shadow-amber-500/30 ring-4 ring-amber-500/20'
                            : 'bg-violet-600 hover:bg-violet-700 shadow-violet-600/35 ring-4 ring-violet-600/20'
                      )}
                    >
                      {hasPermission === false ? (
                        <MicOff className='size-6' />
                      ) : isMuted ? (
                        <MicOff className='size-6' />
                      ) : (
                        <Mic className='size-6' />
                      )}
                    </button>
                  </div>
                </div>

                {/* Botón Finalizar / Colgar */}
                <button
                  type='button'
                  onClick={handleHangup}
                  className='flex items-center gap-1.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-100 px-4 py-2 text-xs font-semibold text-red-600 shadow-2xs cursor-pointer active:scale-95 transition-all shrink-0'
                >
                  <PhoneOff className='size-3.5' />
                  <span>Finalizar</span>
                </button>
              </div>
            )
          )}

          {/* Aviso de Seguridad al Pie */}
          <div className='my-2.5 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 font-medium'>
            <ShieldCheck className='size-3.5 text-neutral-400' />
            <span>Conversación segura y encriptada</span>
          </div>
        </DialogContent>
      </Dialog>

      {/* 2. Modal Minimizado: Isla Flotante Superior (Solución 1 para evitar colisiones con el Floating Chat) */}
      {open && isMinimized && typeof window !== 'undefined' && createPortal(
        <div className='sdi-messenger-root fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-2 pl-3 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-2xl animate-in slide-in-from-top-4 duration-200 max-w-[95vw]'>
          {/* Avatar del Asistente */}
          <div className='relative shrink-0'>
            <div className='flex size-8.5 items-center justify-center rounded-full bg-violet-600 text-white shadow-xs'>
              <Bot className='size-4.5' />
            </div>
            <span
              className={cn(
                'absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-white animate-pulse',
                callState === 'speaking'
                  ? 'bg-violet-500'
                  : callState === 'listening'
                    ? 'bg-emerald-500'
                    : callState === 'muted'
                      ? 'bg-amber-500'
                      : 'bg-neutral-400'
              )}
            />
          </div>

          {/* Información del Estado y Cronómetro */}
          <div className='flex flex-col min-w-0 pr-1'>
            <div className='flex items-center gap-1.5'>
              <span className='text-xs font-bold text-neutral-900'>Asistente de Voz SDi</span>
              <span className='text-[10px] font-mono text-neutral-600 font-semibold bg-neutral-100 px-1.5 py-0.2 rounded-md'>
                {formattedDuration}
              </span>
            </div>
            <span
              className={cn(
                'text-[11px] font-medium truncate max-w-44 sm:max-w-64',
                hasPermission === false ? 'text-amber-700 font-semibold' : 'text-emerald-600'
              )}
            >
              {hasPermission === false
                ? 'Micrófono sin permiso'
                : callState === 'speaking'
                  ? 'Asistente hablando...'
                  : callState === 'listening'
                    ? 'Te escucho...'
                    : callState === 'muted'
                      ? 'Micrófono en silencio'
                      : 'En llamada activa'}
            </span>
          </div>

          {/* Controles Rápidos: Mute, Maximizar, Colgar */}
          <div className='flex items-center gap-1.5 pl-2 border-l border-neutral-200'>
            <button
              type='button'
              onClick={handleToggleMute}
              title={isMuted ? 'Activar micrófono' : 'Silenciar micrófono'}
              className={cn(
                'size-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs',
                isMuted
                  ? 'bg-amber-500 text-white'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              )}
            >
              {isMuted ? <MicOff className='size-3.5' /> : <Mic className='size-3.5' />}
            </button>

            <button
              type='button'
              onClick={() => setIsMinimized(false)}
              title='Maximizar llamada'
              className='size-8 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all cursor-pointer shadow-2xs'
            >
              <Maximize2 className='size-3.5' />
            </button>

            <button
              type='button'
              onClick={handleHangup}
              title='Finalizar llamada'
              className='size-8 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white shadow-xs cursor-pointer active:scale-95 transition-all'
            >
              <PhoneOff className='size-3.5' />
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
