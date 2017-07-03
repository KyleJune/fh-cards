import * as assert from "assert";
import { Card } from "./card";
import { RANK_NAMES, RANKS, SUIT_NAMES, SUITS } from "./constants";

describe("Card", () => {
  describe("constructor", () => {
    it("should accept all valid numbered ranks and suits", () => {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          const card = new Card(rank, suit);

          assert.equal(card.rank, rank);
          assert.equal(card.suit, rank === 13 ? -1 : suit);
        }
      }
    });

    it("should accept all valid string ranks and suits", () => {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          const card = new Card(RANKS[rank], SUITS[suit]);

          assert.equal(card.rank, rank);
          assert.equal(card.suit, rank === 13 ? -1 : suit);
        }
      }
    });

    it("should accept all object's with valid number ranks and suits", () => {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          const card = new Card({
            rank,
            suit,
          });

          assert.equal(card.rank, rank);
          assert.equal(card.suit, rank === 13 ? -1 : suit);
        }
      }
    });

    it("should accept all object's with valid string ranks and suits", () => {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          const card = new Card({
            rank: RANKS[rank],
            suit: SUITS[suit],
          });

          assert.equal(card.rank, rank);
          assert.equal(card.suit, rank === 13 ? -1 : suit);
        }
      }
    });

    it("should accept all valid string representations", () => {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          const card = new Card(RANKS[rank] + SUITS[suit]);

          assert.equal(card.rank, rank);
          assert.equal(card.suit, rank === 13 ? -1 : suit);
        }
      }
    });

    it("should not accept invalid inputs", () => {
      let card;

      assert.throws(() => {
        card = new Card(1, 14);
      });
      assert.throws(() => {
        card = new Card(-1, 1);
      });
      assert.throws(() => {
        card = new Card({
          rank: 14,
          suit: -1,
        });
      });
      assert.throws(() => {
        card = new Card("bc");
      });
    });
  });

  describe(".toFullName", () => {
    it("should return valid full names for all cards", () => {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          const card = new Card(rank, suit);

          if (rank === 13) {
            assert.equal(card.toFullName(), RANK_NAMES[13]);
          } else {
            assert.equal(card.toFullName(), `${RANK_NAMES[rank]} of ${SUIT_NAMES[suit]}`);
          }
        }
      }
    });
  });

  describe(".toString", () => {
    it("should return valid string representations for all cards", () => {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          const card = new Card(rank, suit);

          if (rank === 13) {
            assert.equal(card.toString(), RANKS[13]);
          } else {
            assert.equal(card.toString(), RANKS[rank] + SUITS[suit]);
          }
        }
      }
    });
  });

  describe("#compare", () => {
    it("should return -1 if a is less than b", () => {
      for (let aRank = 0; aRank < 13; aRank++) {
        const a: Card = new Card(aRank, 1);

        for (let bRank = aRank + 1; bRank <= 13; bRank++) {
          const b1: Card = new Card(bRank, 0);
          const b2: Card = new Card(bRank, 2);

          assert.equal(Card.compare(a, b1), -1);
          assert.equal(Card.compare(a, b2), -1);
        }
      }

      for (let rank = 0; rank < 13; rank++) {
        for (let aSuit = 0; aSuit < 3; aSuit++) {
          const a: Card = new Card(rank, aSuit);

          for (let bSuit = aSuit + 1; bSuit <= 3; bSuit++) {
            const b: Card = new Card(rank, bSuit);

            assert.equal(Card.compare(a, b), -1);
          }
        }
      }
    });

    it("should return 1 if a is greater than b", () => {
      for (let aRank = 1; aRank <= 13; aRank++) {
        const a: Card = new Card(aRank, 1);

        for (let bRank = 0; bRank < aRank; bRank++) {
          const b1: Card = new Card(bRank, 0);
          const b2: Card = new Card(bRank, 2);

          assert.equal(Card.compare(a, b1), 1);
          assert.equal(Card.compare(a, b2), 1);
        }
      }

      for (let rank = 0; rank < 13; rank++) {
        for (let aSuit = 1; aSuit <= 3; aSuit++) {
          const a: Card = new Card(rank, aSuit);

          for (let bSuit = 0; bSuit < aSuit; bSuit++) {
            const b: Card = new Card(rank, bSuit);

            assert.equal(Card.compare(a, b), 1);
          }
        }
      }
    });

    it("should return 0 if a is equal to b", () => {
      for (let rank = 0; rank <= 13; rank++) {
        for (let suit = 0; suit <= 3; suit++) {
          const a: Card = new Card(rank, suit);
          const b: Card = new Card(rank, suit);

          assert.equal(Card.compare(a, b), 0);
        }
      }
    });
  });

  describe("#compareRank", () => {
    it("should return -1 if a.rank is less than b.rank", () => {
      for (let aRank = 0; aRank < 13; aRank++) {
        const a: Card = new Card(aRank, 1);

        for (let bRank = aRank + 1; bRank <= 13; bRank++) {
          const b1: Card = new Card(bRank, 0);
          const b2: Card = new Card(bRank, 2);

          assert.equal(Card.compareRank(a, b1), -1);
          assert.equal(Card.compareRank(a, b2), -1);
        }
      }
    });

    it("should return 1 if a.rank is greater than b.rank", () => {
      for (let aRank = 1; aRank <= 13; aRank++) {
        const a: Card = new Card(aRank, 1);

        for (let bRank = 0; bRank < aRank; bRank++) {
          const b1: Card = new Card(bRank, 0);
          const b2: Card = new Card(bRank, 2);

          assert.equal(Card.compareRank(a, b1), 1);
          assert.equal(Card.compareRank(a, b2), 1);
        }
      }
    });

    it("should return 0 if a.rank is equal to b.rank", () => {
      for (let rank = 0; rank <= 13; rank++) {
        const a: Card = new Card(rank, 1);
        const b1: Card = new Card(rank, 0);
        const b2: Card = new Card(rank, 2);

        assert.equal(Card.compareRank(a, b1), 0);
        assert.equal(Card.compareRank(a, b2), 0);
      }
    });
  });

  describe("#compareSuit", () => {
    it("should return -1 if a.suit is less than b.suit", () => {
      for (let aSuit = 0; aSuit < 3; aSuit++) {
        const a: Card = new Card(1, aSuit);

        for (let bSuit = aSuit + 1; bSuit <= 3; bSuit++) {
          const b1: Card = new Card(0, bSuit);
          const b2: Card = new Card(2, bSuit);

          assert.equal(Card.compareSuit(a, b1), -1);
          assert.equal(Card.compareSuit(a, b2), -1);
        }
      }
    });

    it("should return 1 if a.suit is greater than b.suit", () => {
      for (let aSuit = 1; aSuit <= 3; aSuit++) {
        const a: Card = new Card(1, aSuit);

        for (let bSuit = 0; bSuit < aSuit; bSuit++) {
          const b1: Card = new Card(0, bSuit);
          const b2: Card = new Card(2, bSuit);

          assert.equal(Card.compareSuit(a, b1), 1);
          assert.equal(Card.compareSuit(a, b2), 1);
        }
      }
    });

    it("should return 0 if a.suit is equal to b.suit", () => {
      for (let suit = 0; suit <= 3; suit++) {
        const a: Card = new Card(1, suit);
        const b1: Card = new Card(0, suit);
        const b2: Card = new Card(2, suit);

        assert.equal(Card.compareSuit(a, b1), 0);
        assert.equal(Card.compareSuit(a, b2), 0);
      }
    });

  });
});
