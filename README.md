# OpenFM API Reverse Engineering Project

This is an educational project that demonstrates how to reverse engineer and interact with the OpenAI.fm text-to-speech API. This project is created purely for learning purposes and to understand API interactions, audio processing, and TypeScript development.

> **Educational Notice**: This is a learning project created to understand API interactions and audio processing. It's not intended for production use or to cause any harm. The project is open source and welcomes improvements and optimizations.

## Features

- **Smart Text Chunking**: Splits long text at sentence boundaries (up to 1000 chars per chunk)
- **Parallel Processing**: Processes 3 chunks simultaneously for better performance
- **Audio Merging**: Combines audio chunks with clean transitions (250ms pause between chunks)
- **Multiple Voices**: Supports various voice options from the API
- **Speaking Styles**: Different vibes/styles for speech generation

## Technical Implementation

### Text Processing (`TextChunkerService`)
```typescript
// Simple and efficient text chunking at sentence boundaries
public chunkText(text: string): string[] {
    if (text.length <= this.maxChunkSize) {
        return [text];
    }
    // Find last period before limit and split
    ...
}
```

### Audio Processing (`AudioUtils`)
```typescript
// Merges audio chunks with clean transitions
public static async mergeAudioBuffersWithCrossfade(
    buffers: ArrayBuffer[],
    crossfadeDuration: number = 100
): Promise<ArrayBuffer> {
    // Add 250ms pause between chunks for clean transitions
    ...
}
```

### API Integration (`OpenFMService`)
```typescript
// Process multiple chunks in parallel
public async generateAudio(options: AudioGenerationOptions): Promise<ArrayBuffer> {
    const chunks = this.textChunker.chunkText(input);
    // Process 3 chunks at a time
    for (let i = 0; i < chunks.length; i += this.maxParallelCalls) {
        const batch = chunks.slice(i, Math.min(i + this.maxParallelCalls, chunks.length));
        await Promise.all(batch.map(...));
    }
}
```

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/openfm-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the example:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── services/
│   ├── OpenFMService.ts     # Main API interaction
│   └── TextChunkerService.ts # Text processing
├── utils/
│   └── AudioUtils.ts        # Audio processing utilities
├── types/
│   └── index.ts            # TypeScript type definitions
└── index.ts               # Example usage
```

## Available Voices
- shimmer
- echo
- fable
- onyx
- nova
- breeze
- ember

## Speaking Styles
- professional
- empathetic
- storytelling
- newscast
- motivational
- customer_service
- meditation

## Recent Optimizations

1. **Simplified Text Chunking**
   - Removed complex preprocessing
   - Now splits at last sentence boundary before limit
   - Much simpler and more reliable

2. **Improved Audio Merging**
   - Added 250ms pause between chunks
   - Removed complex crossfading
   - Better handling of chunk transitions

3. **Parallel Processing**
   - Process 3 chunks simultaneously
   - Maintains chunk order
   - Significant performance improvement

## Contributing

This is an educational project and improvements are welcome! Some areas that could use enhancement:

- [ ] Better error handling for API failures
- [ ] More voice and style options
- [ ] Improved audio processing algorithms
- [ ] Better text preprocessing
- [ ] Web interface for testing

## Educational Purpose

This project is created to learn about:
- API reverse engineering
- Audio processing in JavaScript/TypeScript
- Parallel processing techniques
- Clean code practices
- TypeScript type systems

## License

MIT License - Feel free to use this code for learning and educational purposes.

## Disclaimer

This is a learning project created to understand API interactions and audio processing. It's not intended for production use. Please respect API terms of service in your projects. 