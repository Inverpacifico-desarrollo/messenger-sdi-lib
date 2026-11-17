/**
 * Código fuente del AudioWorkletProcessor embebido para evitar dependencias de archivos estáticos
 * en `/public/worklets/` dentro de aplicaciones consumidoras de la librería.
 * Captura audio del micrófono y realiza downsampling a 16,000 Hz Mono Int16 en bloques de 100 ms (3,200 bytes).
 */
const PCM_WORKLET_PROCESSOR_SOURCE = `
class PcmCaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.targetSampleRate = 16000;
    this.bufferSize = 1600; // 100 ms @ 16 kHz = 3,200 bytes
    this.pcmBuffer = new Int16Array(this.bufferSize);
    this.bufferIndex = 0;
  }

  process(inputs) {
    const input = inputs[0];
    if (!input || input.length === 0) return true;

    const channelData = input[0];
    if (!channelData || channelData.length === 0) return true;

    const inputSampleRate = sampleRate;
    const ratio = inputSampleRate / this.targetSampleRate;

    let inIdx = 0;
    while (inIdx < channelData.length) {
      const sample = channelData[Math.floor(inIdx)];
      const clamped = Math.max(-1.0, Math.min(1.0, sample));
      const int16Sample = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;

      this.pcmBuffer[this.bufferIndex++] = int16Sample;

      if (this.bufferIndex >= this.bufferSize) {
        let sumSquares = 0;
        for (let i = 0; i < this.bufferSize; i++) {
          sumSquares += this.pcmBuffer[i] * this.pcmBuffer[i];
        }
        const rms = Math.sqrt(sumSquares / this.bufferSize);

        const transfer = new Int16Array(this.pcmBuffer);
        this.port.postMessage(
          {
            type: "pcm_chunk",
            buffer: transfer.buffer,
            rms: rms
          },
          [transfer.buffer]
        );

        this.bufferIndex = 0;
      }

      inIdx += ratio;
    }

    return true;
  }
}

registerProcessor("pcm-capture-processor", PcmCaptureProcessor);
`

/**
 * Genera una Blob URL en memoria para cargar el AudioWorkletProcessor sin depender de rutas públicas.
 */
export function createPcmWorkletModuleUrl(): string {
  const blob = new Blob([PCM_WORKLET_PROCESSOR_SOURCE], {
    type: 'application/javascript; charset=utf-8'
  })
  return URL.createObjectURL(blob)
}
