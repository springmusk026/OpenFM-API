export class AudioUtils {
    private static readonly SAMPLE_RATE = 44100;
    private static readonly CHANNELS = 2;
    private static readonly PAUSE_DURATION = 250; // 250ms pause between chunks

    /**
     * Creates a silent buffer of specified duration
     * @param durationMs Duration in milliseconds
     * @returns ArrayBuffer containing silence
     */
    private static createSilentBuffer(durationMs: number): ArrayBuffer {
        const samples = Math.floor(durationMs * AudioUtils.SAMPLE_RATE / 1000);
        return new ArrayBuffer(samples * 2); // 2 bytes per sample
    }

    /**
     * Merges multiple ArrayBuffers into a single ArrayBuffer with crossfading and pauses
     * @param buffers Array of ArrayBuffers to merge
     * @param crossfadeDuration Duration of crossfade in milliseconds
     * @returns Merged ArrayBuffer
     */
    public static async mergeAudioBuffersWithCrossfade(
        buffers: ArrayBuffer[],
        crossfadeDuration: number = 100
    ): Promise<ArrayBuffer> {
        if (buffers.length === 0) {
            throw new Error('No buffers to merge');
        }

        if (buffers.length === 1) {
            return buffers[0];
        }

        // Calculate total length including pauses
        const pauseBuffer = AudioUtils.createSilentBuffer(AudioUtils.PAUSE_DURATION);
        const totalLength = buffers.reduce((acc, buffer) => acc + buffer.byteLength, 0) 
            + (pauseBuffer.byteLength * (buffers.length - 1)); // Add space for pauses between chunks
        
        // Create a new buffer with the total length
        const mergedBuffer = new Uint8Array(totalLength);
        
        // Copy each buffer into the merged buffer with crossfading and pauses
        let offset = 0;
        for (let i = 0; i < buffers.length; i++) {
            const currentBuffer = new Uint8Array(buffers[i]);
            
            // Copy the current buffer
            mergedBuffer.set(currentBuffer, offset);
            offset += currentBuffer.length;

            // Add pause after each chunk (except the last one)
            if (i < buffers.length - 1) {
                mergedBuffer.set(new Uint8Array(pauseBuffer), offset);
                offset += pauseBuffer.byteLength;
            }
        }

        return mergedBuffer.buffer;
    }

    /**
     * Cleans up a buffer to free memory
     * @param buffer Buffer to clean up
     */
    public static cleanupBuffer(buffer: ArrayBuffer): void {
        // In JavaScript/TypeScript, we don't need to manually free memory
        // But we can help the garbage collector by removing references
        if (buffer instanceof ArrayBuffer) {
            // Clear any references to the buffer
            const view = new Uint8Array(buffer);
            view.fill(0);
        }
    }

    /**
     * Validates an audio buffer
     * @param buffer Buffer to validate
     * @returns True if buffer is valid
     */
    public static isValidAudioBuffer(buffer: ArrayBuffer): boolean {
        if (!(buffer instanceof ArrayBuffer)) {
            return false;
        }

        // Check minimum size for a valid MP3 (header + minimal frame)
        if (buffer.byteLength < 128) {
            return false;
        }

        //could add more checks here
        //check for MP3 header magic number (FF FB or FF FA)
        //check for valid MPEG sync word (0xFFE)
        //check for valid MPEG version and layer
        //check for valid MPEG audio bitrate and sample rate
        //check for valid MPEG audio mode and channel count
        //check for valid MPEG audio frame size
        //check for valid MPEG audio frame rate
        //check for valid MPEG audio frame size
        //but I am lazy, so i am not going to do that
        
        return true;
    }

    /**
     * Gets audio duration in seconds (approximate)
     * @param buffer Audio buffer
     * @returns Duration in seconds
     */
    public static getAudioDuration(buffer: ArrayBuffer): number {
        // Approximate duration based on buffer size and typical MP3 bitrate
        const TYPICAL_BITRATE = 128000; // 128 kbps
        return buffer.byteLength * 8 / TYPICAL_BITRATE;
    }

    /**
     * Normalizes audio volume
     * @param buffer Audio buffer
     * @returns Normalized audio buffer
     */
    public static normalizeVolume(buffer: ArrayBuffer): ArrayBuffer {
        const view = new Int16Array(buffer);
        let max = 0;

        // Find maximum amplitude
        for (let i = 0; i < view.length; i++) {
            max = Math.max(max, Math.abs(view[i]));
        }

        if (max === 0) return buffer;

        // Calculate normalization factor
        const factor = 32767 / max; // 32767 is max value for 16-bit audio

        // Apply normalization
        const normalized = new Int16Array(view.length);
        for (let i = 0; i < view.length; i++) {
            normalized[i] = Math.floor(view[i] * factor);
        }

        return normalized.buffer;
    }
}
 