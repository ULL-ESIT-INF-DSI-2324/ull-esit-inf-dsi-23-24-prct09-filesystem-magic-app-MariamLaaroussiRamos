// card.test.ts
import "mocha";
import { expect } from "chai";
import { CardCollection} from "../src/Cartas/cardCollection";
import { FileManager } from "../src/Cartas/fileManager"
import { Card } from "../src/Cartas/card";



describe("CardCollection tests", () => {
  let fileManager: FileManager;
  let cardCollection: CardCollection;

  beforeEach(() => {
    fileManager = new FileManager("test_user");
    cardCollection = new CardCollection(fileManager);
  });

  it("should add a new card", () => {
    const card = new Card(
      1,
      "Test Card",
      3,
      "Azul",
      "Criatura",
      "Común",
      "Test rules",
      10
    );
    cardCollection.addCard(card);
    const addedCard = cardCollection.getCardById(card.id);
    expect(addedCard).to.deep.equal(card);
  });

  it("should update an existing card", () => {
    const card = new Card(
      1,
      "Updated Card",
      3,
      "Negro",
      "Encantamiento",
      "Rara",
      "Updated rules",
      15
    );
    cardCollection.updateCard(card);
    const updatedCard = cardCollection.getCardById(card.id);
    expect(updatedCard).to.deep.equal(card);
  });

  it("should remove an existing card", () => {
    const cardIdToRemove = 1;
    cardCollection.removeCard(cardIdToRemove);
    const removedCard = cardCollection.getCardById(cardIdToRemove);
    expect(removedCard).to.be.undefined;
  });

  it("should list all cards", () => {
    // Simulamos la salida de console.log usando un array y un mock de console.log
    const consoleLogArray: string[] = [];
    const mockedConsoleLog = (output: string) => {
      consoleLogArray.push(output);
    };
    // Sobreescribimos console.log temporalmente con nuestro mock
    const originalConsoleLog = console.log;
    console.log = mockedConsoleLog;

    // Llamamos al método para listar cartas
    cardCollection.listCards();

    // Restauramos console.log al original
    console.log = originalConsoleLog;

    // Verificamos que las cartas se listaron correctamente
    expect(consoleLogArray).to.deep.include.members([
      "Card ID: 1, Name: Updated Card", 
    ]);
  });

  it("should show details of a specific card", () => {
    const cardIdToShow = 1;
    // Simulamos la salida de console.log usando un mock de console.log
    let consoleOutput: string = "";
    const mockedConsoleLog = (output: string) => {
      consoleOutput += output + "\n"; // Agregamos un salto de línea para mantener el formato
    };
    // Sobreescribimos console.log temporalmente con nuestro mock
    const originalConsoleLog = console.log;
    console.log = mockedConsoleLog;

    // Llamamos al método para mostrar detalles de una carta específica
    cardCollection.showCard(cardIdToShow);

    // Restauramos console.log al original
    console.log = originalConsoleLog;

    // Verificamos que los detalles de la carta se mostraron correctamente
    expect(consoleOutput).to.include("Card ID: 1");
    expect(consoleOutput).to.include("Name: Updated Card");
    expect(consoleOutput).to.include("Cost: 3");
    expect(consoleOutput).to.include("Color: Negro");
    expect(consoleOutput).to.include("Type: Encantamiento");
    expect(consoleOutput).to.include("Rarity: Rara");
    expect(consoleOutput).to.include("Rules Text: Updated rules");
    expect(consoleOutput).to.include("Market Value: 15");

  });
});