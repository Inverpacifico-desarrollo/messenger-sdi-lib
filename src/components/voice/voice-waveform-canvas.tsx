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
  /** Estado del permiso del micrófono: false apaga completamente la onda */
  hasPermission?: boolean | null
}

export function VoiceWaveformCanvas({
  state,
  isMuted = false,
  className = '',
  height = 72,
  analyserNode = null,
  hasPermission = null
}: VoiceWaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const phaseRef = useRef(0)
  const freqBufferRef = useRef<Uint8Array | null>(null)
  const smoothedBarsRef = useRef<Float32Array | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Ajustar resolución retina / high-DPI
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

    const render = () => {
      ctx.clearRect(0, 0, width, canvasHeight)

      const smoothedBars = smoothedBarsRef.current!

      // 1. Estado Muteado o Sin Permiso de Micrófono: Barra plana inactiva en gris (sin animación)
      if (state === 'muted' || isMuted || hasPermission === false) {
        const inactiveColor = 'rgba(209, 213, 219, 0.65)'

        for (let i = 0; i < numBars; i++) {
          smoothedBars[i] = 2.5
          const x = startX + i * (barWidth + gap)
          const barHeight = 2.5
          const y = centerY - barHeight / 2

          ctx.fillStyle = inactiveColor
          ctx.beginPath()
          if (typeof (ctx as any).roundRect === 'function') {
            ;(ctx as any).roundRect(x, y, barWidth, barHeight, barWidth / 2)
          } else {
            ctx.rect(x, y, barWidth, barHeight)
          }
          ctx.fill()
        }
      }
      // 2. Estado Asistente Hablando: onda rítmica del asistente
      else if (state === 'speaking') {
        phaseRef.current += 0.09
        const mainColor = 'rgba(16, 185, 129, 0.95)'
        const targetAmplitude = 20

        for (let i = 0; i < numBars; i++) {
          const x = startX + i * (barWidth + gap)
          const norm = (i / (numBars - 1)) * 2 - 1
          const envelope = Math.max(0.18, 1 - Math.pow(norm, 2))

          const osc =
            Math.sin(i * 0.42 + phaseRef.current) * 0.45 +
            Math.cos(i * 0.28 - phaseRef.current * 0.65) * 0.35 +
            0.5
          const barHeight = Math.max(3, targetAmplitude * envelope * Math.abs(osc) * 1.6)
          const y = centerY - barHeight / 2

          ctx.fillStyle = mainColor
          ctx.beginPath()
          if (typeof (ctx as any).roundRect === 'function') {
            ;(ctx as any).roundRect(x, y, barWidth, barHeight, barWidth / 2)
          } else {
            ctx.rect(x, y, barWidth, barHeight)
          }
          ctx.fill()
        }
      }
      // 3. Estado Escuchando al Usuario: La onda SOLO responde a la voz real del micrófono
      else if ((state === 'listening' || state === 'connected') && analyserNode) {
        if (!freqBufferRef.current || freqBufferRef.current.length !== analyserNode.frequencyBinCount) {
          freqBufferRef.current = new Uint8Array(analyserNode.frequencyBinCount)
        }
        const freqBuffer = freqBufferRef.current
        analyserNode.getByteFrequencyData(freqBuffer as any)

        // Calcular volumen del micrófono
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

          // Mapear el bin de frecuencias del habla
          const distFromCenter = Math.abs(norm)
          const binIndex = Math.min(
            freqBuffer.length - 1,
            Math.floor((1 - distFromCenter * 0.75) * (freqBuffer.length * 0.6))
          )
          const rawFreq = freqBuffer[binIndex] / 255

          let targetHeight: number
          if (isSpeaking) {
            // Solo se expande y mueve con la voz real del micrófono
            targetHeight = Math.max(2.5, (rawFreq * 26 + avgLevel * 10) * envelope * 1.6)
          } else {
            // Si el usuario no está hablando por el micrófono: línea plana en reposo (sin simulación falsa)
            targetHeight = 2.5
          }

          // Suavizado lerp para transición orgánica al hablar
          smoothedBars[i] += (targetHeight - smoothedBars[i]) * 0.35
          const barHeight = Math.max(2.5, Math.min(canvasHeight - 4, smoothedBars[i]))
          const y = centerY - barHeight / 2

          ctx.fillStyle = mainColor
          ctx.beginPath()
          if (typeof (ctx as any).roundRect === 'function') {
            ;(ctx as any).roundRect(x, y, barWidth, barHeight, barWidth / 2)
          } else {
            ctx.rect(x, y, barWidth, barHeight)
          }
          ctx.fill()
        }
      }
      // 4. Si no hay micrófono o está en conexión inicial
      else {
        const inactiveColor = state === 'connecting' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(209, 213, 219, 0.65)'

        for (let i = 0; i < numBars; i++) {
          smoothedBars[i] = 2.5
          const x = startX + i * (barWidth + gap)
          const barHeight = 2.5
          const y = centerY - barHeight / 2

          ctx.fillStyle = inactiveColor
          ctx.beginPath()
          if (typeof (ctx as any).roundRect === 'function') {
            ;(ctx as any).roundRect(x, y, barWidth, barHeight, barWidth / 2)
          } else {
            ctx.rect(x, y, barWidth, barHeight)
          }
          ctx.fill()
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
