import * as assert from "assert";
import { RANKS, SUITS, RANK_NAMES, SUIT_NAMES } from "./constants";
import { Card } from "./card";

describe("Card", function () {
  let card: Card;

  describe("constructor", function () {
    it("should accept all valid numbered ranks and suits", function () {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          card = new Card(rank, suit);

          assert.equal(card.rank, rank);
          assert.equal(card.suit, rank === 13 ? -1 : suit);
        }
      }
    });

    it("should accept all valid string ranks and suits", function () {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          card = new Card(RANKS[rank], SUITS[suit]);

          assert.equal(card.rank, rank);
          assert.equal(card.suit, rank === 13 ? -1 : suit);
        }
      }
    });

    it("should accept all object's with valid number ranks and suits", function () {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          card = new Card({
            rank: rank,
            suit: suit
          });

          assert.equal(card.rank, rank);
          assert.equal(card.suit, rank === 13 ? -1 : suit);
        }
      }
    });

    it("should accept all object's with valid string ranks and suits", function () {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          card = new Card({
            rank: RANKS[rank],
            suit: SUITS[suit]
          });

          assert.equal(card.rank, rank);
          assert.equal(card.suit, rank === 13 ? -1 : suit);
        }
      }
    });

    it("should accept all valid string representations", function () {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          card = new Card(RANKS[rank] + SUITS[suit]);

          assert.equal(card.rank, rank);
          assert.equal(card.suit, rank === 13 ? -1 : suit);
        }
      }
    });

    it("should not accept invalid inputs", function () {
      assert.throws(function () {
        new Card(1, 14);
      });
      assert.throws(function () {
        new Card(-1, 1);
      });
      assert.throws(function () {
        new Card({
          rank: 14,
          suit: -1
        });
      });
      assert.throws(function () {
        new Card("bc");
      });
    });
  });

  describe(".toFullName", function () {
    it("should return valid full names for all cards", function () {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          card = new Card(rank, suit);

          if (rank === 13)
            assert.equal(card.toFullName(), RANK_NAMES[13]);
          else
            assert.equal(card.toFullName(), `${RANK_NAMES[rank]} of ${SUIT_NAMES[suit]}`);
        }
      }
    });
  });

 describe(".toString", function () {
    it("should return valid string representations for all cards", function () {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          card = new Card(rank, suit);

          if (rank === 13)
            assert.equal(card.toString(), RANKS[13]);
          else
            assert.equal(card.toString(), RANKS[rank] + SUITS[suit]);
        }
      }
    });
  });

  describe("#compare", function () {
    it("should return -1 if a is less than b", function () {
      for (let aRank = 0; aRank < 13; aRank++) {
        let a: Card = new Card(aRank, 1);

        for (let bRank = aRank + 1; bRank <= 13; bRank++) {
          let b1: Card = new Card(bRank, 0);
          let b2: Card = new Card(bRank, 2);

          assert.equal(Card.compare(a, b1), -1);
          assert.equal(Card.compare(a, b2), -1);
        }
      }

      for (let rank = 0; rank < 13; rank++) {
        for (let aSuit = 0; aSuit < 3; aSuit++) {
          let a: Card = new Card(rank, aSuit);

          for (let bSuit = aSuit + 1; bSuit <= 3; bSuit++) {
            let b: Card = new Card(rank, bSuit);

            assert.equal(Card.compare(a, b), -1);
          }
        }
      }
    });

    it("should return 1 if a is greater than b", function () {
      for (let aRank = 1; aRank <= 13; aRank++) {
        let a: Card = new Card(aRank, 1);

        for (let bRank = 0; bRank < aRank; bRank++) {
          let b1: Card = new Card(bRank, 0);
          let b2: Card = new Card(bRank, 2);

          assert.equal(Card.compare(a, b1), 1);
          assert.equal(Card.compare(a, b2), 1);
        }
      }

      for (let rank = 0; rank < 13; rank++) {
        for (let aSuit = 1; aSuit <= 3; aSuit++) {
          let a: Card = new Card(rank, aSuit);

          for (let bSuit = 0; bSuit < aSuit; bSuit++) {
            let b: Card = new Card(rank, bSuit);

            assert.equal(Card.compare(a, b), 1);
          }
        }
      }
    });

    it("should return 0 if a is equal to b", function () {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          let a: Card = new Card(rank, suit);
          let b: Card = new Card(rank, suit);

          assert.equal(Card.compare(a, b), 0);
        }
      }
    });
  });

  describe("#compareRank", function () {
    it("should return -1 if a.rank is less than b.rank", function () {
      for (let aRank = 0; aRank < 13; aRank++) {
        let a: Card = new Card(aRank, 1);

        for (let bRank = aRank + 1; bRank <= 13; bRank++) {
          let b1: Card = new Card(bRank, 0);
          let b2: Card = new Card(bRank, 2);

          assert.equal(Card.compareRank(a, b1), -1);
          assert.equal(Card.compareRank(a, b2), -1);
        }
      }
    });

    it("should return 1 if a.rank is greater than b.rank", function () {
      for (let aRank = 1; aRank <= 13; aRank++) {
        let a: Card = new Card(aRank, 1);

        for (let bRank = 0; bRank < aRank; bRank++) {
          let b1: Card = new Card(bRank, 0);
          let b2: Card = new Card(bRank, 2);

          assert.equal(Card.compareRank(a, b1), 1);
          assert.equal(Card.compareRank(a, b2), 1);
        }
      }
    });

    it("should return 0 if a.rank is equal to b.rank", function () {
      for (let rank = 0; rank <= 13; rank++) {
        let a: Card = new Card(rank, 1);
        let b1: Card = new Card(rank, 0);
        let b2: Card = new Card(rank, 2);

        assert.equal(Card.compareRank(a, b1), 0);
        assert.equal(Card.compareRank(a, b2), 0);
      }
    });
  });

  describe("#compareSuit", function () {
    it("should return -1 if a.suit is less than b.suit", function () {
      for (let aSuit = 0; aSuit < 3; aSuit++) {
        let a: Card = new Card(1, aSuit);

        for (let bSuit = aSuit + 1; bSuit <= 3; bSuit++) {
          let b1: Card = new Card(0, bSuit);
          let b2: Card = new Card(2, bSuit);

          assert.equal(Card.compareSuit(a, b1), -1);
          assert.equal(Card.compareSuit(a, b2), -1);
        }
      }
    });

    it("should return 1 if a.suit is greater than b.suit", function () {
      for (let aSuit = 1; aSuit <= 3; aSuit++) {
        let a: Card = new Card(1, aSuit);

        for (let bSuit = 0; bSuit < aSuit; bSuit++) {
          let b1: Card = new Card(0, bSuit);
          let b2: Card = new Card(2, bSuit);

          assert.equal(Card.compareSuit(a, b1), 1);
          assert.equal(Card.compareSuit(a, b2), 1);
        }
      }
    });

    it("should return 0 if a.suit is equal to b.suit", function () {
      for (let suit = 0; suit <= 3; suit++) {
        let a: Card = new Card(1, suit);
        let b1: Card = new Card(0, suit);
        let b2: Card = new Card(2, suit);

        assert.equal(Card.compareSuit(a, b1), 0);
        assert.equal(Card.compareSuit(a, b2), 0);
      }
    });

  });
});
