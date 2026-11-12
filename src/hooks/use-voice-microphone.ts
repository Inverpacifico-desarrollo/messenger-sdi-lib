'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export interface UseVoiceMicrophoneOptions {
  /** Activa o desactiva la captura del micrófono */
  enabled?: boolean
  /** Silencia el stream sin apagar el hardware */
  isMuted?: boolean
  /** Tamaño FFT para el AnalyserNode (default: 64 para 32 bins de frecuencia) */
  fftSize?: number
  /** Intervalo en ms para actualizar el estado React del nivel de volumen (default: 50ms) */
  levelUpdateInterval?: number
}

export interface UseVoiceMicrophoneReturn {
  /** AnalyserNode Web Audio nativo para renderizado directo a 60 FPS en Canvas */
  analyserNode: AnalyserNode | null
  /** Nivel de volumen normalizado y suavizado (0.0 a 1.0) */
  audioLevel: number
  /** Indica si el micrófono está capturando audio activamente */
  isRecording: boolean
  /** Estado del permiso del micrófono: null (sin solicitar), true (otorgado), false (denegado) */
  hasPermission: boolean | null
  /** Mensaje de error en caso de fallo de hardware o denegación de permisos */
  error: string | null
  /** Inicia manualmente la captura del micrófono */
  start: () => Promise<void>
  /** Detiene y libera completamente el hardware del micrófono */
  stop: () => void
}

/**
 * Hook para capturar el micrófono real del usuario mediante la API Web Audio nativa.
 * Proporciona un AnalyserNode para renderizado reactivo a 60 FPS en Canvas
 * y un `audioLevel` normalizado para medidores VU y componentes React.
 */
export function useVoiceMicrophone({
  enabled = true,
  isMuted = false,
  fftSize = 64,
  levelUpdateInterval = 50
}: UseVoiceMicrophoneOptions = {}): UseVoiceMicrophoneReturn {
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null)
  const [audioLevel, setAudioLevel] = useState<number>(0)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  const streamRef = useRef<MediaStream | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const smoothedLevelRef = useRef<number>(0)

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect()
      } catch {
        // Ignorar si ya estaba desconectado
      }
      sourceRef.current = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop()
        } catch {
          // Ignorar
        }
      })
      streamRef.current = null
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close().catch(() => {})
      } catch {
        // Ignorar
      }
      audioContextRef.current = null
    }

    analyserRef.current = null
    setAnalyserNode(null)
    setIsRecording(false)
    setAudioLevel(0)
    smoothedLevelRef.current = 0
  }, [])

  const start = useCallback(async () => {
    if (typeof window === 'undefined') return

    // Si ya está activo, no reiniciar innecesariamente
    if (streamRef.current && streamRef.current.active && analyserRef.current) {
      return
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setError('La API de micrófono no está disponible en este navegador o entorno')
      setHasPermission(false)
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      streamRef.current = stream

      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const audioContext = new AudioContextClass()
      audioContextRef.current = audioContext

      if (audioContext.state === 'suspended') {
        await audioContext.resume()
      }

      const source = audioContext.createMediaStreamSource(stream)
      sourceRef.current = source

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = fftSize
      analyser.smoothingTimeConstant = 0.65
      analyserRef.current = analyser

      source.connect(analyser)
      // NOTA: NO conectar analyser a audioContext.destination para evitar feedback en altavoces

      // Aplicar estado inicial de muteo en pistas de audio
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted
      })

      setAnalyserNode(analyser)
      setIsRecording(true)
      setHasPermission(true)
      setError(null)

      // Loop de muestreo de volumen para el estado React (medidor VU / indicadores)
      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      intervalRef.current = setInterval(() => {
        if (!analyserRef.current || isMuted) {
          smoothedLevelRef.current = 0
          setAudioLevel(0)
          return
        }

        analyserRef.current.getByteFrequencyData(dataArray as any)

        // Calcular volumen promedio normalizado
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i]
        }
        const avg = sum / (dataArray.length || 1)
        const rawNormalized = Math.min(1, Math.max(0, avg / 128))

        // Suavizado exponencial para transiciones fluidas
        smoothedLevelRef.current = smoothedLevelRef.current * 0.7 + rawNormalized * 0.3
        setAudioLevel(Number(smoothedLevelRef.current.toFixed(3)))
      }, levelUpdateInterval)
    } catch (err: unknown) {
      const isDenied =
        (err as { name?: string })?.name === 'NotAllowedError' ||
        (err as { name?: string })?.name === 'PermissionDeniedError'
      const message = isDenied
        ? 'El acceso al micrófono fue denegado en el navegador. Por favor habilita los permisos para continuar.'
        : err instanceof Error
        ? err.message
        : 'Error al acceder al micrófono'

      setError(message)
      setHasPermission(false)
      stop()
    }
  }, [fftSize, isMuted, levelUpdateInterval, stop])

  // Consultar estado de permisos nativo del navegador si está soportado
  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.permissions?.query) return

    try {
      navigator.permissions
        .query({ name: 'microphone' as PermissionName })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'denied') {
            setHasPermission(false)
            setError('El acceso al micrófono fue denegado en el navegador')
          } else if (permissionStatus.state === 'granted') {
            setHasPermission(true)
          }

          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'denied') {
              setHasPermission(false)
              setError('El acceso al micrófono fue denegado en el navegador')
            } else if (permissionStatus.state === 'granted') {
              setHasPermission(true)
              setError(null)
            }
          }
        })
        .catch(() => {
          // Ignorar navegadores que no soportan query específica de microphone
        })
    } catch {
      // Ignorar
    }
  }, [])

  // Gestionar mute en las pistas en tiempo real
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted
      })
    }
    if (isMuted) {
      smoothedLevelRef.current = 0
      setAudioLevel(0)
    }
  }, [isMuted])

  // Iniciar o detener automáticamente según la propiedad `enabled`
  useEffect(() => {
    if (enabled) {
      start()
    } else {
      stop()
    }

    return () => {
      stop()
    }
  }, [enabled, start, stop])

  return {
    analyserNode,
    audioLevel,
    isRecording,
    hasPermission,
    error,
    start,
    stop
  }
}
