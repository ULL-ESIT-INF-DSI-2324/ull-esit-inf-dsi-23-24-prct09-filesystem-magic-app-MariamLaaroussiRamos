// index.ts
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { Card, CardType, CardColor, CardRarity } from './card.js';
import { FileManager } from './fileManager.js';
import { CardCollection } from './cardCollection.js';

const USERNAME = 'username'; // Cambiar por el nombre de usuario real

const fileManager = new FileManager(USERNAME);
const cardCollection = new CardCollection(fileManager);

yargs(hideBin(process.argv))
  .command('add', 'Adds a card to the collection', {
    id: { description: 'Card ID', type: 'number', demandOption: true },
    name: { description: 'Card Name', type: 'string', demandOption: true },
    manaCost: { description: 'Mana Cost', type: 'number', demandOption: true },
    color: { description: 'Card Color', type: 'string', choices: Object.values(CardColor), demandOption: true },
    type: { description: 'Card Type', type: 'string', choices: Object.values(CardType), demandOption: true },
    rarity: { description: 'Card Rarity', type: 'string', choices: Object.values(CardRarity), demandOption: true },
    rulesText: { description: 'Rules Text', type: 'string', demandOption: true },
    marketValue: { description: 'Market Value', type: 'number', demandOption: true },
    power: { description: 'Card Power', type: 'number' },
    toughness: { description: 'Card Toughness', type: 'number' },
    loyalty: { description: 'Card Loyalty', type: 'number' },
  }, (argv) => {
    const newCard = new Card(
      argv.id,
      argv.name,
      argv.manaCost,
      argv.color,
      argv.type,
      argv.rarity,
      argv.rulesText,
      argv.marketValue,
      argv.power,
      argv.toughness,
      argv.loyalty
    );
    cardCollection.addCard(newCard);
  })
  .command('modify', 'Modifies a card in the collection', {
    id: { description: 'Card ID', type: 'number', demandOption: true },
    name: { description: 'Card Name', type: 'string' },
    manaCost: { description: 'Mana Cost', type: 'number' },
    color: { description: 'Card Color', type: 'string', choices: Object.values(CardColor) },
    type: { description: 'Card Type', type: 'string', choices: Object.values(CardType) },
    rarity: { description: 'Card Rarity', type: 'string', choices: Object.values(CardRarity) },
    rulesText: { description: 'Rules Text', type: 'string' },
    marketValue: { description: 'Market Value', type: 'number' },
    power: { description: 'Card Power', type: 'number' },
    toughness: { description: 'Card Toughness', type: 'number' },
    loyalty: { description: 'Card Loyalty', type: 'number' },
  }, (argv) => {
    const modifiedCard = new Card(
      argv.id,
      argv.name,
      argv.manaCost,
      argv.color,
      argv.type,
      argv.rarity,
      argv.rulesText,
      argv.marketValue,
      argv.power,
      argv.toughness,
      argv.loyalty
    );
    cardCollection.modifyCard(modifiedCard);
  })
  .command('remove', 'Removes a card from the collection', {
    id: { description: 'Card ID', type: 'number', demandOption: true },
  }, (argv) => {
    cardCollection.removeCard(argv.id);
  })
  .command('list', 'Lists all cards in the collection', {}, () => {
    cardCollection.listCards();
  })
  .command('show', 'Shows details of a specific card in the collection', {
    id: { description: 'Card ID', type: 'number', demandOption: true },
  }, (argv) => {
    cardCollection.showCard(argv.id);
  })
  .help()
  .argv;
