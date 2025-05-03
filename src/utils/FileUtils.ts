import fs from 'fs';
import path from 'path';

export class FileUtils {
    /**
     * Saves audio buffer to a file
     * @param buffer Audio buffer to save
     * @param filePath Path to save the file to
     * @returns Promise that resolves when the file is saved
     */
    public static async saveAudioBuffer(buffer: ArrayBuffer, filePath: string): Promise<void> {
        const directory = path.dirname(filePath);
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, Buffer.from(buffer), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Ensures a directory exists
     * @param dirPath Path to the directory
     */
    public static ensureDirectoryExists(dirPath: string): void {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
} 