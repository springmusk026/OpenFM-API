# 🎯 OpenFM API | Unlimited Text-to-Speech Explorer

A TypeScript project that explores OpenAI.fm's text-to-speech capabilities through API reverse engineering. Turn any length of text into natural-sounding speech with parallel processing and smart chunking.

> **🎓 Educational Notice**: This is a learning project created to understand API interactions and audio processing. Not intended for production use. Please respect API terms of service.

## ⚡ Features

* **Unlimited Text Length**: Handles any text size through smart chunking
* **3x Faster Processing**: Parallel chunk processing (3 simultaneous chunks)
* **Clean Audio**: 250ms pauses between chunks for natural transitions
* **Multiple Voices**: 7 different voice options
* **Speaking Styles**: Various vibes from professional to storytelling

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/springmusk026/OpenFM-API

# Install dependencies
npm install

# Run the example
npm start
```

## 🎙️ Available Voices
- shimmer
- echo
- fable
- onyx
- nova
- breeze
- ember

## 🎭 Speaking Styles
- professional
- empathetic
- storytelling
- newscast
- motivational
- customer_service
- meditation

## 🛠️ Technical Details

### Text Processing
```typescript
// Simple and efficient chunking at sentence boundaries
public chunkText(text: string): string[] {
    // Find last period before 1000 char limit
    const segment = text.slice(0, this.maxChunkSize);
    const lastPeriod = Math.max(
        segment.lastIndexOf('. '),
        segment.lastIndexOf('! '),
        segment.lastIndexOf('? ')
    );
}
```

### Audio Processing
```typescript
// Clean chunk transitions with 250ms pauses
public static async mergeAudioBuffers(
    buffers: ArrayBuffer[]
): Promise<ArrayBuffer> {
    // Add 250ms silence between chunks
    const pauseBuffer = createSilentBuffer(250);
    // Merge with pauses
}
```

### Parallel Processing
```typescript
// Process 3 chunks simultaneously
public async generateAudio(text: string): Promise<ArrayBuffer> {
    const chunks = this.textChunker.chunkText(text);
    const batchSize = 3;
    for (let i = 0; i < chunks.length; i += batchSize) {
        const batch = chunks.slice(i, i + batchSize);
        await Promise.all(batch.map(chunk => this.processChunk(chunk)));
    }
}
```

## 📁 Project Structure
```
src/
├── services/
│   ├── OpenFMService.ts     # API interaction & parallel processing
│   └── TextChunkerService.ts # Smart text chunking
├── utils/
│   └── AudioUtils.ts        # Audio merging & processing
├── types/
│   └── index.ts            # TypeScript definitions
└── index.ts                # Example usage
```

## 🔧 Recent Optimizations

1. **Simplified Text Chunking**
   - Just finds last sentence boundary before limit
   - No complex preprocessing
   - Fast and reliable

2. **Better Audio Transitions**
   - 250ms silence between chunks
   - No more crossfading complexity
   - Cleaner speech output

3. **Parallel Processing**
   - 3 chunks processed simultaneously
   - Maintains correct order
   - Significant speed improvement

## 🤝 Contributing

This is an educational project - improvements welcome! Areas to enhance:
- [ ] Better error handling
- [ ] More voice options
- [ ] Improved audio processing
- [ ] Web interface
- [ ] Documentation

## 📚 Learning Focus
- API reverse engineering techniques
- Audio processing in TypeScript
- Parallel processing patterns
- Clean code practices

## ⚖️ License
MIT License - Free to use for educational purposes.

## ⚠️ Disclaimer
This is a learning project for understanding API interactions and audio processing. Not intended for production use. 