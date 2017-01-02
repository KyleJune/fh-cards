import { RANKS, SUITS, RANK_NAMES, SUIT_NAMES } from "./constants";

/**
 * A card from a standard 52-card deck.  
 */
export class Card {
  /**
   * The index of the rank in [RANKS].
   */
  rank: number;

  /**
   * The index of the suit in [SUITS].
   */
  suit: number;

  /**
   * @param rank The rank or index of the rank in [RANKS].
   * @param suit The suit or index of the suit in [SUITS].
   * @param card An object.  
   * - `rank`: The rank or index of the rank in [RANKS].
   * - `suit`: Optional. The suit or index of the suit in [SUITS].
   * @param value The string representation of a card.
   */
  constructor(rank: number | string, suit?: number | string);
  constructor(card: {rank: number | string, suit?: number | string});
  constructor(value: string);
  constructor(x: any, y?: number | string) {
    let rank: number | string;
    let suit: number | string;

    if (typeof x === "object") {
      rank = x.rank;
      suit = x.suit;
    } else if (typeof x === "string" && typeof y === "undefined") {
      if ((x.length === 1 && x.toUpperCase() !== SUITS[13]) || x.length !== 2)
        throw new Error("Invalid card");

      rank = x.charAt(0);
      suit = x.charAt(1);
    } else {
      rank = x;
      suit = y;
    }

    if (typeof rank === "string")
      rank = RANKS.indexOf(rank.toUpperCase());

    if (typeof rank !== "number" || rank < 0 || rank >= RANKS.length)
      throw new Error("Invalid rank");

    if (rank === 13) {
      // Ignore suit for joker
      suit = -1;
    } else {
      if (typeof suit === "string")
        suit = SUITS.indexOf(suit.toLowerCase());

      if (suit < 0 || suit >= SUITS.length)
        throw new Error("Invalid suit");
    }

    this.rank = rank;
    this.suit = suit;
  }

  /**
   * Get the full name of the card.  
   * Examples provided below.
   *
   * ```ts
   * (new Card(12, 0)).toFullName(); // "Ace of Clubs"
   * (new Card(0, 1)).toFullName(); // "Two of Diamonds"
   * (new Card(7, 2)).toFullName(); // "Nine of Hearts"
   * (new Card(8, 0)).toFullName(); // "Ten of Spades"
   * ```
   *
   * @return The full name of the card.
   */
  toFullName(): string {
    if (this.rank === 13)
      return RANK_NAMES[13];

    return `${RANK_NAMES[this.rank]} of ${SUIT_NAMES[this.suit]}`;
  }

  /**
   * Get the string representation of the card.  
   * Examples provided below.
   *
   * ```ts
   * (new Card(12, 0)).toString(); // "Ac"
   * (new Card(0, 1)).toString(); // "2d"
   * (new Card(7, 2)).toString(); // "9h"
   * (new Card(8, 0)).toString(); // "Ts"
   * ```
   *
   * @return The string representation of the card.
   */
  toString(): string {
    if (this.rank === 13)
      return RANKS[13];

    return RANKS[this.rank] + SUITS[this.suit];
  }

  /**
   * This compares cards by their [rank] and then [suit].
   *
   * @param a The first [Card].
   * @param b The second [Card].
   * @return If 0, they are equal.  
   * If < 0, then `a` is less than `b`.  
   * If > 0, then `a` is greater than `b`.
   */
  static compare(a: Card, b: Card): number {
    let result: number = Card.compareRank(a, b);

    if (result === 0)
      result = Card.compareSuit(a, b);

    return result;
  }

  /**
   * This compares cards by their [rank].
   *
   * @param a The first [Card].
   * @param b The second [Card].
   * @return If 0, their ranks are equal.  
   * If < 0, then `a.rank` is less than `b.rank`.  
   * If > 0, then `a.rank` is greater than `b.rank`.
   */
  static compareRank(a: Card, b: Card): number {
    if (a.rank < b.rank)
      return -1;
    if (a.rank > b.rank)
      return 1;

    return 0;
  }

  /**
   * This compares cards by their [suit].
   *
   * @param a The first [Card].
   * @param b The second [Card].
   * @return If 0, their suits are equal.  
   * If < 0, then `a.suit` is less than `b.suit`.  
   * If > 0, then `a.suit` is greater than `b.suit`.
   */
  static compareSuit(a: Card, b: Card): number {
    if (a.suit < b.suit)
      return -1;
    if (a.suit > b.suit)
      return 1;

    return 0;
  }
}
