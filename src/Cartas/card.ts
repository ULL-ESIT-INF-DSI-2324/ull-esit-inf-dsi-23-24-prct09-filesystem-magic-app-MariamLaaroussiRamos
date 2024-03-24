// card.ts

// Enumeración que define los posibles tipos de carta.
export enum CardType {
  Tierra = "Tierra",
  Criatura = "Criatura",
  Encantamiento = "Encantamiento",
  Conjuro = "Conjuro",
  Instantaneo = "Instantaneo",
  Artefacto = "Artefacto",
  Planeswalker = "Planeswalker"
}

// Enumeración que define los posibles colores de una carta.
export enum CardColor {
  Blanco = "Blanco",
  Azul = "Azul",
  Negro = "Negro",
  Rojo = "Rojo",
  Verde = "Verde",
  Incoloro = "Incoloro",
  Multicolor = "Multicolor"
}

// Enumeración que define las posibles rarezas de una carta.
export enum CardRarity {
  Comun = "Común",
  Infrecuente = "Infrecuente",
  Rara = "Rara",
  Mitica = "Mítica"
}

// Define la clase Card para representar una carta
export class Card {
  id: number;
  name: string;
  manaCost: number;
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
    manaCost: number,
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
    this.manaCost = manaCost;
    this.color = color;
    this.cardType = cardType;
    this.rarity = rarity;
    this.rulesText = rulesText;
    this.marketValue = marketValue;
    this.power = power;
    this.toughness = toughness;
    this.loyalty = loyalty;
  }
}

