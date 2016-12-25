import * as assert from 'assert';
import { StandardDeck } from './standard';
import { Card } from '../card';

describe('StandardDeck', function () {
  let deck: StandardDeck;
  let card: Card;

  describe('constructor', function () {
    it('should create a deck with all 52 standard cards', function () {
      deck = new StandardDeck();
      assert.equal(deck.cards.length, 52);

      let i = 0;
      for (let rank = 0; rank < 13; rank++) {
        for (let suit = 0; suit < 4; suit++) {
          card = deck.cards[i++];

          assert.equal(card.rank, rank);
          assert.equal(card.suit, suit);
        }
      }
    });

    it('should be able to create a standard deck with joker cards', function () {
      deck = new StandardDeck(2);
      assert.equal(deck.cards.length, 54);
      assert.equal(deck.cards[52].rank, 13);
      assert.equal(deck.cards[53].rank, 13);
    });
  });
});
