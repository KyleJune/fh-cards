export const RANKS: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A', 'W'];
export const SUITS: string[] = ['c', 'd', 'h', 's'];

/**
 * A card from a standard 52-card deck. Includes joker/wild cards.
 */
export class Card {
  public rank: number;
  public suit: number;

  constructor(rank: number | string, suit?: number | string);
  constructor(card: {rank: number | string, suit?: number | string});
  constructor(card: string);
  constructor(x: any, y?: number | string) {
    let rank: number | string;
    let suit: number | string;

    if (typeof x === "object") {
      rank = x.rank;
      suit = x.suit;
    } else if (typeof x === 'string' && typeof y === 'undefined') {
      if ((x.length === 1 && x.toUpperCase() !== 'W') || x.length !== 2)
        throw new Error('Invalid card');

      rank = x.charAt(0);
      suit = x.charAt(1);
    } else {
      rank = x;
      suit = y;
    }

    if (typeof rank === 'string')
      rank = RANKS.indexOf(rank.toUpperCase());

    if (typeof rank !== 'number' || rank < 0 || rank >= RANKS.length)
      throw new Error('Invalid rank');

    if (rank === 13) {
      // Ignore suit for wildcard/joker
      suit = -1;
    } else {
      if (typeof suit === 'string')
        suit = SUITS.indexOf(suit.toLowerCase());

      if (suit < 0 || suit >= SUITS.length)
        throw new Error('Invalid suit');
    }

    this.rank = rank;
    this.suit = suit;
  }

  /**
   * Converts cards into a string representation. Examples provided below.
   *
   * ```javascript
   * (new Card(12, 0)).toString(); // 'Ac'
   * (new Card(0, 1)).toString(); // '2d'
   * (new Card(7, 2)).toString(); // '9h'
   * (new Card(8, 0)).toString(); // 'Ts'
   * ```
   *
   * @return The card as a string.
   */
  toString(): string {
    if (this.rank === 13)
      return RANKS[13];
    
    return RANKS[this.rank] + SUITS[this.suit];
  }

  /**
   * This compares cards by their rank. If their ranks are equal, it will then compare them by their suits.
   *
   * @param a The first Card.
   * @param b The second Card.
   * @return If 0, they are equal. If < 0, then `a` is less than `b`. if > 0, then `a` is greater than `b`.
   */
  static compare(a: Card, b: Card): number {
    let result: number = Card.compareRank(a, b);

    if (result === 0)
      result = Card.compareSuit(a, b);

    return result;
  }


  /**
   * This compares cards by their rank.
   *
   * @param a The first Card.
   * @param b The second Card.
   * @return If 0, their ranks are equal. If < 0, then `a.rank` is less than `b.rank`. if > 0, then `a.rank` is greater than `b.rank`.
   */
  static compareRank(a: Card, b: Card): number {
    if (a.rank < b.rank)
      return -1;
    if (a.rank > b.rank)
      return 1;

    return 0;
  }

  /**
   * This compares cards by their suit.
   *
   * @param a The first Card.
   * @param b The second Card.
   * @return If 0, their suits are equal. If < 0, then `a.suit` is less than `b.suit`. if > 0, then `a.suit` is greater than `b.suit`.
   */
  static compareSuit(a: Card, b: Card): number {
    if (a.suit < b.suit)
      return -1;
    if (a.suit > b.suit)
      return 1;

    return 0;
  }
}
