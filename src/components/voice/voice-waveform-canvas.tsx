'use client'

import React, { useEffect, useRef } from 'react'
import type { VoiceCallState } from '../../types/voice.types'

export interface VoiceWaveformCanvasProps {
  state: VoiceCallState
  isMuted?: boolean
  className?: string
  height?: number | string
  /** Nodo Analyser de la API Web Audio para hacer reaccionar la onda al micrófono en vivo */
  analyserNode?: AnalyserNode | null
  /** Nivel RMS de salida del asistente (0.0 a 1.0) para sincronizar la onda con la voz del bot */
  botRms?: number
  /** Estado del permiso del micrófono: false apaga completamente la onda */
  hasPermission?: boolean | null
}

export function VoiceWaveformCanvas({
  state,
  isMuted = false,
  className = '',
  height = 72,
  analyserNode = null,
  botRms = 0,
  hasPermission = null
}: VoiceWaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const phaseRef = useRef(0)
  const freqBufferRef = useRef<Uint8Array | null>(null)
  const smoothedBarsRef = useRef<Float32Array | null>(null)
  const botRmsRef = useRef(botRms)

  useEffect(() => {
    botRmsRef.current = botRms
  }, [botRms])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const width = rect.width
    const canvasHeight = rect.height
    const centerY = canvasHeight / 2

    const numBars = 38
    const barWidth = 2.5
    const gap = 3
    const totalWidth = numBars * barWidth + (numBars - 1) * gap
    const startX = Math.max(0, (width - totalWidth) / 2)

    if (!smoothedBarsRef.current || smoothedBarsRef.current.length !== numBars) {
      smoothedBarsRef.current = new Float32Array(numBars)
      smoothedBarsRef.current.fill(2.5)
    }

    const drawBar = (x: number, y: number, barHeight: number, color: string) => {
      ctx.fillStyle = color
      ctx.beginPath()
      if (typeof (ctx as any).roundRect === 'function') {
        ;(ctx as any).roundRect(x, y, barWidth, barHeight, barWidth / 2)
      } else {
        ctx.rect(x, y, barWidth, barHeight)
      }
      ctx.fill()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, canvasHeight)
      const smoothedBars = smoothedBarsRef.current!

      // 1. Muteado o Sin Permiso de Micrófono: línea plana inactiva gris
      if (state === 'muted' || isMuted || hasPermission === false) {
        const inactiveColor = 'rgba(209, 213, 219, 0.65)'
        for (let i = 0; i < numBars; i++) {
          smoothedBars[i] = 2.5
          const x = startX + i * (barWidth + gap)
          drawBar(x, centerY - 1.25, 2.5, inactiveColor)
        }
      }
      // 2. Asistente Hablando: sincronizado con el RMS real de salida PCM 24kHz
      else if (state === 'speaking') {
        const currentBotRms = botRmsRef.current
        phaseRef.current += 0.08 + currentBotRms * 0.1
        const activeAmp = Math.max(4, currentBotRms * 26)
        const mainColor =
          currentBotRms > 0.03 ? 'rgba(16, 185, 129, 0.95)' : 'rgba(16, 185, 129, 0.55)'

        for (let i = 0; i < numBars; i++) {
          const x = startX + i * (barWidth + gap)
          const norm = (i / (numBars - 1)) * 2 - 1
          const envelope = Math.max(0.18, 1 - Math.pow(norm, 2))
          const osc =
            Math.sin(i * 0.42 + phaseRef.current) * 0.45 +
            Math.cos(i * 0.28 - phaseRef.current * 0.65) * 0.35 +
            0.4
          const targetHeight = Math.max(2.5, activeAmp * envelope * Math.abs(osc) * 1.4)
          smoothedBars[i] += (targetHeight - smoothedBars[i]) * 0.35
          const barHeight = Math.max(2.5, Math.min(canvasHeight - 4, smoothedBars[i]))
          drawBar(x, centerY - barHeight / 2, barHeight, mainColor)
        }
      }
      // 3. Escuchando al Usuario: SOLO responde al micrófono real
      else if ((state === 'listening' || state === 'connected') && analyserNode) {
        if (!freqBufferRef.current || freqBufferRef.current.length !== analyserNode.frequencyBinCount) {
          freqBufferRef.current = new Uint8Array(analyserNode.frequencyBinCount)
        }
        const freqBuffer = freqBufferRef.current
        analyserNode.getByteFrequencyData(freqBuffer as any)

        let sum = 0
        for (let b = 0; b < freqBuffer.length; b++) {
          sum += freqBuffer[b]
        }
        const avgLevel = sum / (freqBuffer.length * 255)
        const isSpeaking = avgLevel > 0.025
        const mainColor = isSpeaking ? 'rgba(16, 185, 129, 0.95)' : 'rgba(16, 185, 129, 0.45)'

        for (let i = 0; i < numBars; i++) {
          const x = startX + i * (barWidth + gap)
          const norm = (i / (numBars - 1)) * 2 - 1
          const envelope = Math.max(0.18, 1 - Math.pow(norm, 2))
          const distFromCenter = Math.abs(norm)
          const binIndex = Math.min(
            freqBuffer.length - 1,
            Math.floor((1 - distFromCenter * 0.75) * (freqBuffer.length * 0.6))
          )
          const rawFreq = freqBuffer[binIndex] / 255

          const targetHeight = isSpeaking
            ? Math.max(2.5, (rawFreq * 26 + avgLevel * 10) * envelope * 1.6)
            : 2.5

          smoothedBars[i] += (targetHeight - smoothedBars[i]) * 0.35
          const barHeight = Math.max(2.5, Math.min(canvasHeight - 4, smoothedBars[i]))
          drawBar(x, centerY - barHeight / 2, barHeight, mainColor)
        }
      }
      // 4. Pensando / Conectando / Sin micrófono activo: línea plana en reposo
      else {
        const calmColor =
          state === 'connecting' || state === 'thinking' || state === 'reconnecting'
            ? 'rgba(16, 185, 129, 0.4)'
            : 'rgba(209, 213, 219, 0.65)'

        for (let i = 0; i < numBars; i++) {
          smoothedBars[i] = 2.5
          const x = startX + i * (barWidth + gap)
          drawBar(x, centerY - 1.25, 2.5, calmColor)
        }
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [state, isMuted, analyserNode, hasPermission])

  const heightStyle = typeof height === 'number' ? `${height}px` : height

  return (
    <canvas
      ref={canvasRef}
      className={`w-full block pointer-events-none ${className}`}
      style={{ width: '100%', height: heightStyle }}
    />
  )
}
