// Importar las librerías necesarias para el test
import { expect } from 'chai';
import { Card } from '../src/Cartas/card.js';
import { CardCollection } from '../src/Cartas/cardCollection.js';
import { FileManager } from '../src/Cartas/fileManager.js';

// Describe el conjunto de pruebas para la clase CardCollection
describe('CardCollection', () => {
  // Define las variables necesarias para las pruebas
  let cardCollection: CardCollection;

  // Antes de cada prueba, inicializa la colección y el file manager
  beforeEach(() => {
    const fileManager = new FileManager('test_user'); // Nombre de usuario de prueba
    cardCollection = new CardCollection(fileManager);
  });

  // Prueba para agregar una carta a la colección
  it('should add a card to the collection', () => {
    const newCard: Card = new Card(
      1,
      'Test Card',
      2,
      'Azul',
      'Criatura',
      'Comun',
      'Reglas de prueba',
      20
    );
    cardCollection.addCard(newCard);
    const addedCard = cardCollection.getCardById(1);
    expect(addedCard).to.deep.equal(newCard);
  });

  // Prueba para modificar una carta en la colección
  it('should update a card in the collection', () => {
    const initialCard: Card = new Card(
      2,
      'Initial Card',
      3,
      'Rojo',
      'Conjuro',
      'Infrecuente',
      'Reglas iniciales',
      30
    );
    cardCollection.addCard(initialCard);

    const updatedCard: Card = new Card(
      2,
      'Updated Card',
      4,
      'Verde',
      'Encantamiento',
      'Rara',
      'Nuevas reglas',
      40
    );
    cardCollection.updateCard(updatedCard);

    const modifiedCard = cardCollection.getCardById(2);
    expect(modifiedCard).to.deep.equal(updatedCard);
  });

  // Prueba para eliminar una carta de la colección
  it('should remove a card from the collection', () => {
    const cardToRemove: Card = new Card(
      3,
      'Card to Remove',
      4,
      'Negro',
      'Instantaneo',
      'Mítica',
      'Reglas para eliminar',
      50
    );
    cardCollection.addCard(cardToRemove);

    cardCollection.removeCard(3); // Eliminar la carta agregada

    const removedCard = cardCollection.getCardById(3);
    expect(removedCard).to.be.undefined; // La carta no debe existir en la colección
  });
});
