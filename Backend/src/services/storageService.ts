import path from 'path';
import fs from 'fs';

export interface SavedFileInfo {
  fileName: string;
  fileUrl: string;
  filePath: string;
  size: number;
}

export class StorageService {
  private uploadsDir: string;

  constructor() {
    this.uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  public getUploadsDirectory(): string {
    return this.uploadsDir;
  }

  public getPublicUrl(fileName: string): string {
    return `/uploads/${fileName}`;
  }

  public deleteFile(fileName: string): boolean {
    const fullPath = path.join(this.uploadsDir, fileName);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return true;
    }
    return false;
  }
}

export const storageService = new StorageService();
export default storageService;
