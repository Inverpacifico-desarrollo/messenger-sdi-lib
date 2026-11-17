'use client'

import React from 'react'
import { Mic, MicOff, PhoneOff, Send, ShieldCheck } from 'lucide-react'
// import { Camera, Loader2, Monitor } from 'lucide-react'
import { cn } from '../../ui'

export interface VoiceCallControlsProps {
  isMuted: boolean
  hasPermission: boolean | null
  userRms: number
  textInput: string
  isCapturingScreen?: boolean
  onTextInputChange: (val: string) => void
  onSendTextPrompt: (e: React.FormEvent) => void
  onCaptureScreen?: () => void
  onPhotoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onToggleMute: () => void
  onHeroMicClick: () => void
  onRequestMicrophone: () => void
  onHangup: () => void
}

export function VoiceCallControls({
  isMuted,
  hasPermission,
  userRms,
  textInput,
  onTextInputChange,
  onSendTextPrompt,
  onToggleMute,
  onHeroMicClick,
  onRequestMicrophone,
  onHangup
}: VoiceCallControlsProps) {
  // const fileInputRef = useRef<HTMLInputElement>(null)
  const isBlocked = hasPermission === false

  return (
    <div className='mt-3 flex flex-col bg-white shrink-0'>
      {/* Barra de Entrada Multimodal (Texto) */}
      <form
        onSubmit={onSendTextPrompt}
        className='mx-5 mb-2 flex items-center gap-1.5 rounded-2xl border border-neutral-200 bg-white px-2.5 py-2 shadow-2xs focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-500/15 transition-all'
      >
        {/*
        <button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          title='Subir foto de la terminal o error'
          aria-label='Subir foto'
          className='flex size-8 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-violet-600 transition-colors shrink-0 cursor-pointer'
        >
          <Camera className='size-4' />
        </button>

        <button
          type='button'
          onClick={onCaptureScreen}
          disabled={isCapturingScreen}
          title='Compartir captura de pantalla (Snap-to-Diagnose)'
          aria-label='Compartir captura de pantalla'
          className='flex size-8 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-violet-600 transition-colors shrink-0 cursor-pointer disabled:opacity-50'
        >
          {isCapturingScreen ? (
            <Loader2 className='size-4 animate-spin text-violet-600' />
          ) : (
            <Monitor className='size-4' />
          )}
        </button>

        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={onPhotoUpload}
        />
        */}

        <input
          type='text'
          value={textInput}
          onChange={(e) => onTextInputChange(e.target.value)}
          placeholder='Escribe tu mensaje o deja que el asistente te escuche...'
          className='flex-1 bg-transparent text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none min-w-0 px-1'
        />

        <button
          type='submit'
          disabled={!textInput.trim()}
          title='Enviar mensaje de texto al asistente'
          className='flex size-8 items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700 disabled:bg-violet-300 disabled:cursor-not-allowed transition-all shadow-xs shrink-0 cursor-pointer active:scale-95'
        >
          <Send className='size-3.5' />
        </button>
      </form>

      {/* Botonera Telefónica Central */}
      <div className='px-5 pt-2 pb-2 bg-white flex items-center justify-center gap-4 sm:gap-5'>
        {/* Botón Silenciar / Solicitar permiso */}
        <button
          type='button'
          onClick={isBlocked ? onRequestMicrophone : onToggleMute}
          className={cn(
            'flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold transition-all shadow-2xs cursor-pointer shrink-0',
            isBlocked
              ? 'text-amber-700 border-amber-300 bg-amber-50/70 hover:bg-amber-100/70'
              : isMuted
              ? 'text-amber-600 border-amber-300 bg-amber-50/60'
              : 'text-neutral-700 hover:bg-neutral-50'
          )}
        >
          <MicOff
            className={cn(
              'size-4',
              isBlocked ? 'text-amber-600' : isMuted ? 'text-amber-500' : 'text-violet-600'
            )}
          />
          <span>{isBlocked ? 'Sin permiso' : isMuted ? 'Silenciado' : 'Silenciar'}</span>
        </button>

        {/* Centro: Botón Micrófono Hero con Aura Reactiva */}
        <div className='relative flex items-center justify-center shrink-0'>
          <div
            className={cn(
              'p-2 rounded-full transition-all duration-150',
              isBlocked
                ? 'bg-amber-100/70 ring-8 ring-amber-500/20'
                : isMuted
                ? 'bg-amber-100/60 ring-8 ring-amber-500/15'
                : userRms > 0.08
                ? 'bg-violet-100 ring-10 ring-violet-500/30'
                : 'bg-violet-100/60 ring-8 ring-violet-500/15'
            )}
          >
            <button
              type='button'
              onClick={onHeroMicClick}
              title={
                isBlocked
                  ? 'Permiso de micrófono no otorgado. Haz clic para solicitar permiso'
                  : isMuted
                  ? 'Activar micrófono'
                  : 'Micrófono activo'
              }
              className={cn(
                'flex size-14 items-center justify-center rounded-full text-white transition-all shadow-xl active:scale-95 cursor-pointer',
                isBlocked
                  ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/35 ring-4 ring-amber-600/20'
                  : isMuted
                  ? 'bg-amber-500 shadow-amber-500/30 ring-4 ring-amber-500/20'
                  : 'bg-violet-600 hover:bg-violet-700 shadow-violet-600/35 ring-4 ring-violet-600/20'
              )}
            >
              {isBlocked || isMuted ? <MicOff className='size-6' /> : <Mic className='size-6' />}
            </button>
          </div>
        </div>

        {/* Botón Finalizar / Colgar */}
        <button
          type='button'
          onClick={onHangup}
          className='flex items-center gap-1.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-100 px-4 py-2 text-xs font-semibold text-red-600 shadow-2xs cursor-pointer active:scale-95 transition-all shrink-0'
        >
          <PhoneOff className='size-4' />
          <span>Finalizar</span>
        </button>
      </div>

      {/* Pie de Seguridad */}
      <div className='pb-3.5 pt-0.5 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 font-medium'>
        <ShieldCheck className='size-3.5 text-neutral-400' />
        <span>Conversación segura y encriptada</span>
      </div>
    </div>
  )
}
