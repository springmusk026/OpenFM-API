import { OpenFMService } from './services/OpenFMService';
import { FileUtils } from './utils/FileUtils';
import path from 'path';

async function main() {
    try {
        const openFM = new OpenFMService();
        
        // Example usage with a longer text
        const text = `
            Welcome to OpenFM! This is a demonstration of our text-to-speech service. 
            When you provide a long piece of text, our system automatically breaks it 
            into smaller chunks at sentence boundaries.

            The system processes each chunk separately and then combines them into a 
            single, coherent audio file with smooth transitions between chunks.

            This ensures that the audio remains clear and natural, even when the text is long.
            Whenever you need to generate audio for a long text, you can use this service.
            It's perfect for creating podcasts, e-books, and other long-form content.
            And it's all done in the background, so you can focus on creating your content.
            This is a test of the system.

            Apple is a company that makes computers and other electronics.
            They are headquartered in Cupertino, California.
            They are known for their innovative products like the iPhone and iPad.
            They are also known for their customer service.
            They are a great company that makes great products.

            Google is a company that makes search engines and other internet services.
            They are headquartered in Mountain View, California.
            They are known for their innovative products like the Google Search and Google Maps.
            They are also known for their customer service.
            They are a great company that makes great products.

            Microsoft is a company that makes software and other electronics.
            They are headquartered in Redmond, Washington.
            They are known for their innovative products like the Windows operating system and the Xbox gaming console.
            They are also known for their customer service.
            They are a great company that makes great products.
            
            
        `.replace(/\s+/g, ' ').trim();

        console.log('Generating audio... ', text);
        
        const audioBuffer = await openFM.generateAudio({
            input: text,
            voice: 'shimmer',
            vibe: 'professional'
        });

        // Save the audio file
        const outputPath = path.join(process.cwd(), 'output', 'generated.mp3');
        await FileUtils.saveAudioBuffer(audioBuffer, outputPath);
        
        console.log(`\nAudio file saved to: ${outputPath}`);
        
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main(); 