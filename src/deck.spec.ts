import * as assert from "assert";
import { Card } from "./card";
import { Deck } from "./deck";

describe("Deck", () => {
  let deck: Deck;
  let card: Card;

  describe("constructor", () => {
    it("should create an empty deck", () => {
      deck = new Deck();
      assert.equal(deck.cards.length, 0);
    });
  });

  describe(".add", () => {
    it("should add a card to the bottom of the deck", () => {
      card = new Card(0, 0);
      deck.add(card);
      assert.equal(deck.cards[0], card);

      card = new Card(1, 0);
      deck.add(card);
      assert.equal(deck.cards[1], card);
    });

    it("should add an array of cards to the bottom of the deck", () => {
      const cards: Card[] = [];
      cards.push(new Card(2, 0));
      cards.push(new Card(3, 0));
      deck.add(cards);
      assert.equal(deck.cards[2], cards[0]);
      assert.equal(deck.cards[3], cards[1]);
    });
  });

  describe(".draw", () => {
    it("should draw a card from the top of the deck", () => {
      for (let i = 0; i < 4; i++) {
        card = deck.draw();
        assert.equal(card, deck.cards[i]);
      }
    });

    it("should throw error if there are no cards left to draw", () => {
      assert.throws(() => {
        deck.draw();
      });
    });
  });

  describe(".draws", () => {
    let cards: Card[];

    it("should draw 1 card by default", () => {
      deck.index = 0;

      cards = deck.draws();
      assert.equal(cards.length, 1);
      assert.equal(cards[0], deck.cards[0]);
    });

    it("should be able to draw more than 1 cards", () => {
      cards = deck.draws(2);
      assert.equal(cards.length, 2);
      assert.equal(cards[0], deck.cards[1]);
      assert.equal(cards[1], deck.cards[2]);
    });

    it("should throw error if there are not enough cards to draw", () => {
      assert.throws(() => {
        deck.draws(2);
      });
    });
  });

  describe(".restart", () => {
    it("should restart the deck in the same order", () => {
      deck.restart();
      const cards: Card[] = deck.draws(4);
      deck.restart();
      assert.equal(deck.index, 0);
      for (let i = 0; i < 4; i++) {
        card = deck.draw();
        assert.equal(card, cards[i]);
      }
    });
  });

  describe(".shuffle", () => {
    let cards: Card[];
    it("should shuffle the cards in the deck", () => {
      deck.restart();
      cards = deck.draws(4);
      deck.restart();

      // shuffle 10 times or until the deck is in a different order
      let isDifferent: boolean = false;
      for (let i = 0; i < 10; i++) {
        deck.shuffle();
        for (let j = 0; j < 4; j++) {
          card = deck.draw();
          if (card !== cards[j]) {
            isDifferent = true;
            break;
          }
        }

        if (isDifferent) {
          break;
        }
      }

      assert.equal(isDifferent, true);
    });

    it("should not remove cards or duplicate cards", () => {
      deck.restart();

      assert.equal(deck.cards.length, cards.length);
      const hasCards: boolean[] = [false, false, false, false];
      for (let i = 0; i < 4; i++) {
        card = deck.draw();
        hasCards[cards.indexOf(card)] = true;
      }

      let hasAllCards: boolean = true;
      for (let i = 0; i < 4; i++) {
        if (!hasCards[i]) {
          hasAllCards = false;
          break;
        }
      }

      assert.equal(hasAllCards, true);
    });
  });

  describe(".sort", () => {
    it("should sort use default compare function if none provided", () => {
      deck.sort();

      for (let i = 0; i < 4; i++) {
        card = deck.draw();
        assert.equal(card.rank, i);
        assert.equal(card.suit, 0);
      }
    });

    it("should sort using a provided compare function", () => {
      deck.sort(function reverseCards(a: Card, b: Card) {
        return -1 * Card.compare(a, b);
      });

      for (let i = 3; i > -1; i--) {
        card = deck.draw();
        assert.equal(card.rank, i);
        assert.equal(card.suit, 0);
      }
    });
  });
});
