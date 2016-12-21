import { Card } from './card';

/**
 * A deck of cards.
 */
export class Deck {
  cards: Card[];
  index: number;

  constructor() {
    this.cards = [];
    this.index = 0;
  }

  /**
   * Draws a card from the top of the deck.
   *
   * @return The card that was drawn.
   */
  draw(): Card {
    if (this.index >= this.cards.length)
      throw new Error('Not enough cards');

    return this.cards[this.index++];
  }

  /**
   * Draws cards from the top of the deck.
   *
   * @param count The number of cards to draw.
   * @return An array containing the cards drawn.
   */
  draws(count: number = 1): Card[] {
    if (this.index + count > this.cards.length)
      throw new Error('Not enough cards');

    this.index += count;
    return this.cards.slice(this.index - count, this.index);
  }

  /**
   * Restarts the deck drawing in its current order.
   */
  restart(): void {
    this.index = 0;
  }

  /**
   * Shuffles the cards with the Fisher-Yates shuffle algorithm.
   */
  shuffle(): void {
    this.restart();
    
    for (let i = 51; i > 0; i--) {
      let temp: Card = this.cards[i];
      let randomIndex: number = Math.floor(Math.random() * (i + 1));

      this.cards[i] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
  }

  /**
   * Sorts the cards in the deck.
   */
  sort(): void {
    this.restart();
    this.cards.sort(Card.compare);
  }
}
