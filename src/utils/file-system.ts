import fs from 'fs';
import { logger } from '../config';

class FileSystem {
  public deleteFilesWithPatternSync = (directory: string, pattern: string) => {
    return new Promise((resolve, reject) => {
      try {
        const files = fs.readdirSync(directory);
  
        // Filter files based on the pattern
        const matchingFiles = files.filter(file => file.includes(pattern));
  
        // Delete each matching file
        const deletedFiles = Promise.all(matchingFiles.map(file => {
          const filePath = `${directory}/${file}`;
          return fs.promises.unlink(filePath).then(() => {
            logger.info(`Deleted file: ${filePath}`);
          });
        }))

        deletedFiles
          .then(() => { resolve(matchingFiles.length)})
          .catch((error) => { throw error });
      } catch (error) {
        logger.error('Error while deleting files:', error);
        reject(error);
      }
    });
  };
}

export const fileSystem = new FileSystem();