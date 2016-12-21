import { Deck } from '../deck';
import { Card } from '../card';

let standardCards: Card[];
let jokerCard: Card;

/**
 * A standard 52-card deck.
 */
export class StandardDeck extends Deck {
  constructor(jokers: number = 0) {
    super();

    this.cards = StandardDeck.cards.slice();

    for (let i = 0; i < jokers; i++) {
      this.cards.push(jokerCard);
    }
  }

  /**
   * Reuse cards in duplicate decks.
   */
  static get cards(): Card[] {
    if (typeof standardCards === 'undefined') {
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
