
export class TextChunkerService {
    
    private readonly maxChunkSize = 1000; // Characters per chunk

    /**
     * Chunks text into smaller pieces at sentence boundaries
     */
    public chunkText(text: string): string[] {
        // If text is small enough, return as single chunk
        if (text.length <= this.maxChunkSize) {
            return [text];
        }

        const chunks: string[] = [];
        let remaining = text;

        while (remaining.length > 0) {
            if (remaining.length <= this.maxChunkSize) {
                chunks.push(remaining);
                break;
            }

            // Find last period before limit
            const segment = remaining.slice(0, this.maxChunkSize);
            const lastPeriod = Math.max(
                segment.lastIndexOf('. '),
                segment.lastIndexOf('! '),
                segment.lastIndexOf('? ')
            );

            // If no period found, just cut at last space before limit
            const cutPoint = lastPeriod > 0 ? lastPeriod + 2 : segment.lastIndexOf(' ');
            
            if (cutPoint <= 0) {
                // No good break point found, just cut at limit
                chunks.push(remaining.slice(0, this.maxChunkSize));
                remaining = remaining.slice(this.maxChunkSize);
            } else {
                chunks.push(remaining.slice(0, cutPoint));
                remaining = remaining.slice(cutPoint);
            }
        }

        return chunks;
    }

    /**
     * Validates if text needs chunking
     */
    public needsChunking(text: string): boolean {
        return text.length > this.maxChunkSize;
    }
} 