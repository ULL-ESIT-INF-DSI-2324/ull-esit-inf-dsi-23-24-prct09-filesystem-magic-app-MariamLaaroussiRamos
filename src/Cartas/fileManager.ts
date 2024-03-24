// fileManager.ts
import fs from 'fs';
import path from 'path';
import { Card } from './card.js';

export class FileManager {
  private userDir: string;

  constructor(private username: string) {
    this.userDir = `./src/users/${username}`;
  }

  public getUserDir(): string {
    return this.userDir;
  }

  public getFilePath(cardId: number): string {
    return path.join(this.userDir, `card${cardId}.json`);
  }

  public save(collection: Card[]): void {
    if (!fs.existsSync(this.userDir)) {
      fs.mkdirSync(this.userDir, { recursive: true });
    }
    for (const card of collection) {
      fs.writeFileSync(this.getFilePath(card.id), JSON.stringify(card, null, 2));
    }
  }

  public load(): Card[] {
    const collection: Card[] = [];
    if (fs.existsSync(this.userDir)) {
      const files = fs.readdirSync(this.userDir);
      for (const file of files) {
        const data = fs.readFileSync(path.join(this.userDir, file), 'utf-8');
        const card = JSON.parse(data) as Card;
        collection.push(card);
      }
    }
    return collection;
  }
}
