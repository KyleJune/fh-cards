# Card

A card from a standard 52-card deck.

## Constructor

### Card(rank\[, suit\])

- `rank`: The rank or index of the rank in [RANKS].
- `suit`: The suit or index of the suit in [SUITS].

### Card(card)

- `card`: An object.  
  - `rank`: The rank or index of the rank in [RANKS].
  - `suit`: Optional. The suit or index of the suit in [SUITS].

### Card(value)

- `value`: The string representation of a card.

## Properties

### rank

**Type**: number  
The index of the rank in [RANKS].

### suit

**Type**: number  
The index of the suit in [SUITS].

## Methods

### toFullName()

Get the full name of the card.
Examples provided below.

```ts
(new Card(12, 0)).toFullName(); // "Ace of clubs"
(new Card(0, 1)).toFullName(); // "Two of Diamonds"
(new Card(7, 2)).toFullName(); // "Nine of Hearts"
(new Card(8, 3)).toFullName(); // "Ten of Spades"
```

**Returns**: string  
The full name of the card.

### toString()

Get the string representation of the card.  
Examples provided below.

```ts
(new Card(12, 0)).toString(); // "Ac"
(new Card(0, 1)).toString(); // "2d"
(new Card(7, 2)).toString(); // "9h"
(new Card(8, 3)).toString(); // "Ts"
```

**Returns**: string  
The string representation of the card.

## Static Methods

### compare(a, b)

- `a`: The first [Card].
- `b`: The second [Card].

This compares cards by their [rank] and then [suit].

**Returns**: number  
If 0, they are equal.  
If < 0, then `a` is less than `b`.  
If > 0, then `a` is greater than `b`.

### compareRank(a, b)

- `a`: The first [Card].
- `b`: The second [Card].

This compares cards by their [rank].

**Returns**: number  
If 0, their ranks are equal.  
If < 0, then `a.rank` is less than `b.rank`.  
If > 0, then `a.rank` is greater than `b.rank`.

### compareSuit(a, b)

- `a`: The first [Card].
- `b`: The second [Card].

This compares cards by their [suit].

**Returns**: number  
If 0, their suits are equal.  
If < 0, then `a.suit` is less than `b.suit`.  
If > 0, then `a.suit` is greater than `b.suit`.

[Card]: #card
[rank]: #rank
[suit]: #suit
[RANKS]: ../constants/RANKS.md#ranks
[SUITS]: ../constants/SUITS.md#suits
