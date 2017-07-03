import { Card } from "../card";
import { Deck } from "../deck";

let standardCards: Card[];
let jokerCard: Card;

/**
 * A standard 52-card deck.
 */
export class StandardDeck extends Deck {
  /**
   * @param jokers The number of joker cards to add to the deck.
   */
  constructor(jokers: number = 0) {
    super();

    this.add(StandardDeck.cards);

    for (let i = 0; i < jokers; i++) {
      this.add(jokerCard);
    }
  }

  /**
   * The cards that are used in this type of deck.
   */
  static get cards(): Card[] {
    if (typeof standardCards === "undefined") {
      standardCards = [];

      for (let rank = 0; rank < 13; rank++) {
        for (let suit = 0; suit < 4; suit++) {
          standardCards.push(new Card(rank, suit));
        }
      }

      jokerCard = new Card(13);
    }

    return standardCards;
  }
}
