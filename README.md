[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/T5K9tzcv)
# Práctica 9: Aplicación para coleccionistas de Cartas Magic #
## Introducción #
En esta práctica, se aborda la implementación de una aplicación destinada a gestionar la información de una colección de cartas del juego Magic, pertenecientes a un usuario específico. La aplicación se desarrollará en TypeScript y se centrará en operaciones básicas como añadir, modificar, eliminar, listar y leer información asociada a las cartas de Magic. La información de cada carta se almacenará en formato JSON en el sistema de archivos de la máquina donde se ejecute la aplicación. Es importante destacar que la interacción con la aplicación se realizará exclusivamente a través de la línea de comandos, sin disponer de un menú interactivo para las operaciones.

## Objetivo ##
Implementar una aplicación en TypeScript para gestionar una colección de cartas del juego Magic de un usuario específico. La aplicación permitirá añadir, modificar, eliminar, listar y mostrar detalles de las cartas a través de la línea de comandos, almacenando la información de cada carta en formato JSON en el sistema de archivos local.

## card.ts ##
Se trata de la estructura básica del programa.
Enumeraciones:
CardType: Enumera los posibles tipos de carta, como Tierra, Criatura, Encantamiento, etc.
CardColor: Enumera los posibles colores de una carta, como Blanco, Azul, Negro, etc.
CardRarity: Enumera las posibles rarezas de una carta, como Común, Infrecuente, Rara, etc.
```
export enum CardType {
  Tierra = "Tierra",
  Criatura = "Criatura",
  Encantamiento = "Encantamiento",
  Conjuro = "Conjuro",
  Instantaneo = "Instantaneo",
  Artefacto = "Artefacto",
  Planeswalker = "Planeswalker"
}

/**
 * Enumeración que define los posibles colores de una carta.
 */
export enum CardColor {
  Blanco = "Blanco",
  Azul = "Azul",
  Negro = "Negro",
  Rojo = "Rojo",
  Verde = "Verde",
  Incoloro = "Incoloro",
  Multicolor = "Multicolor"
}

/**
 * Enumeración que define las posibles rarezas de una carta.
 */
export enum CardRarity {
  Comun = "Común",
  Infrecuente = "Infrecuente",
  Rara = "Rara",
  Mitica = "Mítica"
}
```
Clase Card:

Representa una carta del juego con propiedades como id, name, cost, color, cardType, rarity, rulesText, power, toughness, loyalty, y marketValue.
constructor: Método para crear una nueva instancia de la carta, inicializando sus propiedades con los valores proporcionados.
```
export class Card {
  id: number;
  name: string;
  cost: number;
  color: string;
  cardType: string;
  rarity: string;
  rulesText: string;
  power?: number;
  toughness?: number;
  loyalty?: number;
  marketValue: number;

  constructor(
    id: number,
    name: string,
    cost: number,
    color: string,
    cardType: string,
    rarity: string,
    rulesText: string,
    marketValue: number,
    power?: number,
    toughness?: number,
    loyalty?: number
  ) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.color = color;
    this.cardType = cardType;
    this.rarity = rarity;
    this.rulesText = rulesText;
    this.marketValue = marketValue;
    this.power = power;
    this.toughness = toughness;
    this.loyalty = loyalty;
  }
```
Propiedades de la clase Card:

id: Identificador único de la carta.
name: Nombre de la carta.
cost: Costo de la carta.
color: Color de la carta (de la enumeración CardColor).
cardType: Tipo de carta (de la enumeración CardType).
rarity: Rareza de la carta (de la enumeración CardRarity).
rulesText: Texto de las reglas de la carta.
power: Poder de la carta (solo para criaturas).
toughness: Resistencia de la carta (solo para criaturas).
loyalty: Lealtad de la carta (solo para planeswalkers).
marketValue: Valor de mercado de la carta.

## cardCollection.ts ##
Importaciones:
chalk: Esta biblioteca permite dar color al texto en la consola. Se utiliza para resaltar mensajes importantes en la salida de la aplicación.
Card y FileManager: Se importan las clases Card y FileManager desde sus respectivos archivos para ser utilizadas en esta clase.
fs: Este módulo es parte del sistema de archivos de Node.js y se utiliza para realizar operaciones relacionadas con archivos, como eliminar archivos físicos.
Clase CardCollection:
Propiedad privada collection: Es un array que almacena instancias de la clase Card. Representa la colección de cartas gestionada por esta clase.
Constructor:

Recibe una instancia de FileManager para manejar la carga y guardado de la colección desde y hacia el sistema de archivos.
Al inicializar la clase, carga la colección desde el archivo utilizando el método load de FileManager.
Métodos públicos:

addCard: Agrega una nueva carta a la colección verificando primero si ya existe una carta con el mismo ID.
updateCard: Modifica una carta existente en la colección basándose en su ID.
removeCard: Elimina una carta de la colección por su ID, también elimina físicamente el archivo asociado a esa carta.
listCards: Muestra en consola los ID y nombres de todas las cartas en la colección.
showCard: Muestra los detalles de una carta específica según su ID.
getCardById: Obtiene una carta de la colección por su ID.

```
import chalk from 'chalk';
import { Card } from './card.js';
import { FileManager } from './fileManager.js';
import * as fs from 'fs';

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

  public updateCard(updatedCard: Card): void {
    const index = this.collection.findIndex(card => card.id === updatedCard.id);
    if (index !== -1) {
      this.collection[index] = updatedCard;
      this.fileManager.save(this.collection);
      console.log(chalk.green('Card modified successfully!'));
    } else {
      console.log(chalk.red('Error: Card with specified ID not found.'));
    }
  }

  public removeCard(cardId: number): void {
    console.log('Removing card with ID:', cardId);
    const index = this.collection.findIndex(card => card.id === cardId);
    console.log('Card index:', index);
    if (index !== -1) {
      const cardToRemove = this.collection[index];
      const filePath = this.fileManager.getFilePath(cardToRemove.id);
      fs.unlinkSync(filePath);
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
    }
  }

  public showCard(cardId: number): void {
    const card = this.getCardById(cardId);
    if (card) {
      console.log(chalk.green('Card Details:'));
      console.log('ID:', card.id);
      console.log('Name:', card.name);
      console.log('Cost:', card.cost);
      console.log('Color:', card.color);
      console.log('Type:', card.cardType);
      console.log('Rarity:', card.rarity);
      console.log('Rules Text:', card.rulesText);
      console.log('Market Value:', card.marketValue);
    } else {
      console.log(chalk.red('Error: Card with specified ID not found.'));
    }
  }

  public getCardById(cardId: number): Card | undefined {
    return this.collection.find(card => card.id === cardId);
  }
}
```

## fileManager.ts ##
Este se encarga de gestionar la interacción con el sistema de archivos para las cartas de usuario en una aplicación de colección de cartas. 
En primer lugar:
Se importa el módulo fs de Node.js para trabajar con el sistema de archivos.
Se importa la clase Card desde el archivo card.js para manipular objetos de tipo carta.
```
import * as fs from 'fs'; // Módulo File System de Node.js para trabajar con archivos
import { Card } from './card.js'; // Importamos la clase Card del archivo card.js
```
Clase FileManager:
```
export class FileManager {
  private userDir: string; // Directorio del usuario

  constructor(private username: string) {
    this.userDir = `./src/users/${this.username}`;
    this.createUserDirIfNotExists();
  }

  private createUserDirIfNotExists(): void {
    if (!fs.existsSync(this.userDir)) {
      fs.mkdirSync(this.userDir, { recursive: true });
    }
  }

  public getFilePath(cardId: number): string {
    return `${this.userDir}/card${cardId}.json`;
  }

  public save(collection: Card[]): void {
    for (const card of collection) {
      const filePath = this.getFilePath(card.id);
      fs.writeFileSync(filePath, JSON.stringify(card, null, 2));
    }
  }

  public load(): Card[] {
    const files = fs.readdirSync(this.userDir);
    const collection: Card[] = [];
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = `${this.userDir}/${file}`;
        try {
          const data = fs.readFileSync(filePath, 'utf-8');
          const card = JSON.parse(data) as Card;
          collection.push(card);
        } catch (error) {
          console.error(`Error loading card from ${filePath}: ${error.message}`);
        }
      }
    }
    return collection;
  }
}
```
Constructor:

Recibe el nombre de usuario para identificar la carpeta de almacenamiento de las cartas.
Crea el directorio del usuario si no existe mediante createUserDirIfNotExists.
Método createUserDirIfNotExists:

Comprueba si el directorio del usuario existe.
Si no existe, lo crea de forma recursiva usando fs.mkdirSync.
Método getFilePath:

Genera la ruta de archivo para una carta específica basada en su ID.
Método save:

Guarda la colección de cartas en archivos JSON en el sistema de archivos.
Itera sobre cada carta en la colección, obtiene su ruta de archivo y escribe el archivo JSON.
Método load:

Carga las cartas almacenadas en archivos JSON desde el sistema de archivos.
Lee los archivos en el directorio del usuario y los convierte en objetos Card.
Maneja errores al cargar cartas y los muestra en la consola.

## index.ts ##
Configuración del yargs:
```
yargs(hideBin(process.argv))
```
Configuro yargs para trabajar con los argumentos pasados desde la línea de comandos.

Comandos y Argumentos:
Se definen varios comandos (add, update, remove, list, show) junto con sus argumentos correspondientes utilizando el método .command() de yargs.
```
  .command('add', 'Adds a card to the collection', {
    id: { 
      description: 'Card ID', 
      type: 'number', 
      demandOption: true 
    },
    name: { 
      description: 'Card Name', 
      type: 'string', 
      demandOption: true 
    },
    cost: { 
      description: 'Cost', 
      type: 'number', 
      demandOption: true 
    },
    color: { 
      description: 'Card Color', 
      type: 'string', 
      choices: Object.values(CardColor), 
      demandOption: true 
    },
    type: { 
      description: 'Card Type', 
      type: 'string', 
      choices: Object.values(CardType), 
      demandOption: true 
    },
    rarity: { 
      description: 'Card Rarity', 
      type: 'string', 
      choices: Object.values(CardRarity), 
      demandOption: true 
    },
    rulesText: { 
      description: 'Rules Text', 
      type: 'string', 
      demandOption: true 
    },
    marketValue: { 
      description: 'Market Value', 
      type: 'number', 
      demandOption: true 
    },
    power: { 
      description: 'Card Power', 
      type: 'number' 
    },
    toughness: { 
      description: 'Card Toughness', 
      type: 'number' 
    },
    loyalty: { 
      description: 'Card Loyalty', 
      type: 'number' 
    },
  }, (argv) => {
    const USERNAME: string = argv.user as string; // Obtener el nombre de usuario como string
    const fileManager = new FileManager(USERNAME);
    const cardCollection = new CardCollection(fileManager);
    const newCard = new Card(
      argv.id,
      argv.name,
      argv.cost,
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
  // Comando 'update' para modificar una carta en la colección
  .command('update', 'Modifies a card in the collection', {
    id: { 
      description: 'Card ID', 
      type: 'number', 
      demandOption: true 
    },
    name: { 
      description: 'Card Name', 
      type: 'string', 
      demandOption: true 
    },
    cost: { 
      description: 'Cost', 
      type: 'number', 
      demandOption: true 
    },
    color: { 
      description: 'Card Color', 
      type: 'string', 
      choices: Object.values(CardColor), 
      demandOption: true 
    },
    type: { 
      description: 'Card Type', 
      type: 'string', 
      choices: Object.values(CardType), 
      demandOption: true 
    },
    rarity: { 
      description: 'Card Rarity', 
      type: 'string', 
      choices: Object.values(CardRarity), 
      demandOption: true 
    },
    rulesText: { 
      description: 'Rules Text', 
      type: 'string', 
      demandOption: true 
    },
    marketValue: { 
      description: 'Market Value', 
      type: 'number', 
      demandOption: true 
    },
    power: { 
      description: 'Card Power', 
      type: 'number' 
    },
    toughness: { 
      description: 'Card Toughness', 
      type: 'number' 
    },
    loyalty: { 
      description: 'Card Loyalty', 
      type: 'number' 
    },
  }, (argv) => {
    const USERNAME: string = argv.user as string; // Obtener el nombre de usuario como string
    const fileManager = new FileManager(USERNAME);
    const cardCollection = new CardCollection(fileManager);
    const modifiedCard = new Card(
      argv.id,
      argv.name,
      argv.cost,
      argv.color,
      argv.type,
      argv.rarity,
      argv.rulesText,
      argv.marketValue,
      argv.power,
      argv.toughness,
      argv.loyalty
    );
    cardCollection.updateCard(modifiedCard);
  })
  // Comando 'remove' para eliminar una carta de la colección
  .command('remove', 'Removes a card from the collection', {
    user: { 
      description: 'User name', 
      type: 'string', 
      demandOption: true 
    },
    id: { description: 'Card ID', 
    type: 'number', 
    demandOption: true 
  },
  }, (argv) => {
    const USERNAME = argv.user; // Obtener el nombre de usuario
    const fileManager = new FileManager(USERNAME);
    const cardCollection = new CardCollection(fileManager);
    cardCollection.removeCard(argv.id); // Revisar si argv.id contiene el ID correcto
  })  
  // Comando 'list' para listar todas las cartas en la colección
  .command('list', 'Lists all cards in the collection', {}, (argv) => {
    const USERNAME: string = argv.user as string; // Obtener el nombre de usuario como string
    const fileManager = new FileManager(USERNAME);
    const cardCollection = new CardCollection(fileManager);
    cardCollection.listCards();
  })
  // Comando 'show' para mostrar detalles de una carta específica en la colección
  .command('show', 'Shows details of a specific card in the collection', {
    id: { description: 'Card ID', type: 'number', demandOption: true },
  }, (argv) => {
    const USERNAME: string = argv.user as string; // Obtener el nombre de usuario como string

    const fileManager = new FileManager(USERNAME);
    const cardCollection = new CardCollection(fileManager);
    cardCollection.showCard(argv.id);
  })
```
Cada comando tiene asociada una función de callback que se ejecuta cuando se invoca ese comando desde la línea de comandos.
Ejemplos de Comandos:
Comando add: Agrega una nueva carta a la colección.
Comando update: Modifica una carta existente en la colección.
Comando remove: Elimina una carta de la colección por su ID.
Comando list: Lista todas las cartas en la colección.
Comando show: Muestra detalles de una carta específica en la colección.

Uso de las Clases FileManager y CardCollection:
Se instancia FileManager con el nombre de usuario proporcionado en los argumentos.
```
    const fileManager = new FileManager(USERNAME);

```
Se instancia CardCollection pasando la instancia de FileManager como argumento para gestionar las cartas.
```
    const cardCollection = new CardCollection(fileManager);
    cardCollection.showCard(argv.id);
```
## Conclusión ##
Finalmente, el programa implementa una aplicación de gestión de cartas Magic que permite al usuario realizar operaciones básicas como agregar, modificar, eliminar, listar y mostrar detalles de cartas. Está diseñado para interactuar a través de la línea de comandos utilizando la librería yargs para definir comandos y argumentos. La estructura del programa incluye clases como Card, CardCollection y FileManager para representar cartas, gestionar la colección de cartas y manejar la interacción con el sistema de archivos, respectivamente. El uso de módulos, enums y funciones de callback en yargs facilita la organización del código y la implementación de funcionalidades clave para la gestión eficiente de cartas Magic en la aplicación.


## Bibliografía ##
> npm: yargs. (n.d.). Npm. https://www.npmjs.com/package/yargs

> npm: chalk. (n.d.). Npm. https://www.npmjs.com/package/chalk

> File system | Node.js v21.7.1 Documentation. (n.d.). https://nodejs.org/docs/latest/api/fs.html
