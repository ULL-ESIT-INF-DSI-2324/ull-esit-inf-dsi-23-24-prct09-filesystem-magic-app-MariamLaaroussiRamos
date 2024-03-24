// cardCollection.ts
import chalk from 'chalk';
import { Card } from './card.js';
import { FileManager } from './fileManager.js';


export class CardCollection {
  private collection: Card[];

  constructor(private fileManager: FileManager) {
    this.collection = fileManager.load();
  }

  public addCard(card: Card): void {
    const existingCard = this.getCardById(card.id);
    if (existingCard) {
      console.log(chalk.red('Error: A card with the same ID already exists.'));
    } else {
      this.collection.push(card);
      this.fileManager.save(this.collection);
      console.log(chalk.green('Card added successfully!'));
    }
  }

  public modifyCard(modifiedCard: Card): void {
    const index = this.collection.findIndex(card => card.id === modifiedCard.id);
    if (index !== -1) {
      this.collection[index] = modifiedCard;
      this.fileManager.save(this.collection);
      console.log(chalk.green('Card modified successfully!'));
    } else {
      console.log(chalk.red('Error: Card with specified ID not found.'));
    }
  }

  public removeCard(cardId: number): void {
    const index = this.collection.findIndex(card => card.id === cardId);
    if (index !== -1) {
      this.collection.splice(index, 1);
      this.fileManager.save(this.collection);
      console.log(chalk.green('Card removed successfully!'));
    } else {
      console.log(chalk.red('Error: Card with specified ID not found.'));
    }
  }

  public listCards(): void {
    for (const card of this.collection) {
      console.log(`Card ID: ${card.id}, Name: ${card.name}`);
      // Add more fields as needed
    }
  }

  public showCard(cardId: number): void {
    const card = this.getCardById(cardId);
    if (card) {
      console.log(chalk.green('Card Details:'));
      console.log('ID:', card.id);
      console.log('Name:', card.name);
      // Show other card details
    } else {
      console.log(chalk.red('Error: Card with specified ID not found.'));
    }
  }

  private getCardById(cardId: number): Card | undefined {
    return this.collection.find(card => card.id === cardId);
  }
}
