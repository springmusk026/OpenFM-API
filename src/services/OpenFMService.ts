import { AudioGenerationOptions, Voice } from '../types';
import { AVAILABLE_VOICES, VIBES } from '../constants';
import { TextChunkerService } from './TextChunkerService';
import { AudioUtils } from '../utils/AudioUtils';
import fetch from 'node-fetch';

export class OpenFMService {
    private readonly apiUrl: string = 'https://www.openai.fm/api/generate';
    private readonly boundary: string = '----WebKitFormBoundaryp9bogf8BgkuyyrZd';
    private readonly textChunker: TextChunkerService;
    private readonly maxParallelCalls = 3;

    constructor() {
        this.textChunker = new TextChunkerService();
    }

    private validateVoice(voice: Voice): void {
        if (!AVAILABLE_VOICES.includes(voice)) {
            throw new Error(`Invalid voice. Available voices: ${AVAILABLE_VOICES.join(', ')}`);
        }
    }

    private createFormData(options: AudioGenerationOptions): string {
        const { input, prompt = '', voice = 'shimmer', vibe = 'null' } = options;
        
        return [
            `${this.boundary}\r\nContent-Disposition: form-data; name="input"\r\n\r\n${input}`,
            `${this.boundary}\r\nContent-Disposition: form-data; name="prompt"\r\n\r\n${
                vibe !== 'null' && VIBES[vibe] ? VIBES[vibe] : prompt
            }`,
            `${this.boundary}\r\nContent-Disposition: form-data; name="voice"\r\n\r\n${voice}`,
            `${this.boundary}\r\nContent-Disposition: form-data; name="vibe"\r\n\r\n${vibe}`,
            `${this.boundary}--`
        ].join('\r\n');
    }

    private async makeApiCall(options: AudioGenerationOptions): Promise<ArrayBuffer> {
        const formData = this.createFormData(options);

        const response = await fetch(this.apiUrl, {
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.5",
                "content-type": `multipart/form-data; boundary=${this.boundary.slice(2)}`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            body: formData,
            method: "POST"
        });

        if (!response.ok) {
            throw new Error(`Failed to generate audio: ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        if (!AudioUtils.isValidAudioBuffer(buffer)) {
            throw new Error('Invalid audio buffer received');
        }

        return buffer;
    }

    public async generateAudio(options: AudioGenerationOptions): Promise<ArrayBuffer> {
        const { input, voice = 'shimmer' } = options;
        this.validateVoice(voice);

        // For short text, just make a single API call
        if (input.length <= 1000) {
            return await this.makeApiCall(options);
        }

        // Split text into chunks
        const chunks = this.textChunker.chunkText(input);
        const audioBuffers: ArrayBuffer[] = new Array(chunks.length);

        // Process chunks in parallel, 3 at a time
        for (let i = 0; i < chunks.length; i += this.maxParallelCalls) {
            const batch = chunks.slice(i, Math.min(i + this.maxParallelCalls, chunks.length));
            const batchPromises = batch.map((chunk, index) => 
                this.makeApiCall({ ...options, input: chunk })
                    .then(buffer => {
                        audioBuffers[i + index] = buffer; // Preserve order
                    })
            );

            await Promise.all(batchPromises);
        }

        // Merge audio buffers with pauses between chunks
        return await AudioUtils.mergeAudioBuffersWithCrossfade(audioBuffers, 100);
    }

    public getAvailableVoices(): readonly Voice[] {
        return AVAILABLE_VOICES;
    }

    public getAvailableVibes(): Record<string, string> {
        return { ...VIBES };
    }
} 