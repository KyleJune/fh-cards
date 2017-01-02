# Deck

A deck of cards.

## Constructor

### Deck()

## Properties

### cards

**Type**: [Card]\[\]  
The cards in the deck.

### index

**Type**: number  
The current draw position.

## Methods

### add(card)

- `card`: The [card] you want to add to the deck.

Adds cards to the bottom of the deck.

### add(cards)

- `cards`: An array of cards you want to add to the deck.

### draw()

Draws a card from the top of the deck.

**Returns**: [Card]  
The card that was drawn.

### draws(\[count\])

- `count`: The number of cards to draw. Defaults to 1.

Draws cards from the top of the deck.

**Returns**: [Card]\[\]  
The cards drawn.

### restart()

Restarts the deck drawing in its current order.

### shuffle()

Shuffles the cards with the [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) algorithm.

### sort(\[compareFunction\])

- `compareFunction`: The function used to compare cards. Defaults to [Card.compare].

Sorts the cards in the deck.

[Card]: Card.md#card
[Card.compare]: Card.md#comparea-b
