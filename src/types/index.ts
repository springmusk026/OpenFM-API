export type Voice = 'shimmer' | 'echo' | 'fable' | 'onyx' | 'nova' | 'breeze' | 'ember';

export type Vibe = 'professional' | 'empathetic' | 'storytelling' | 'newscast' | 
                  'motivational' | 'customer_service' | 'meditation' | 'null';

export interface AudioGenerationOptions {
    input: string;
    prompt?: string;
    voice?: Voice;
    vibe?: Vibe;
}

export interface ChunkConfig {
    MAX: number;
    TARGET: number;
    MIN: number;
}

export interface BreakPoint {
    type: string;
    pattern: RegExp;
    priority: number;
}

export interface VibeConfig {
    [key: string]: string;
}

export interface OpenFMConfig {
    maxConcurrentRequests: number;
    retryAttempts: number;
    retryDelay: number;
    crossfadeDuration: number;
    cacheEnabled: boolean;
    maxCacheSize: number;
    debugMode: boolean;
}

export interface ProgressEvent {
    type: 'chunk_start' | 'chunk_complete' | 'merge_start' | 'merge_complete';
    chunk?: number;
    totalChunks?: number;
    progress: number;
    timestamp: number;
}

export interface PerformanceMetrics {
    chunkingTime: number;
    apiCallTimes: number[];
    mergingTime: number;
    totalTime: number;
    averageChunkProcessingTime: number;
    totalChunks: number;
}

export interface TextValidationResult {
    isValid: boolean;
    sanitizedText: string;
    warnings: string[];
} 