# FH Cards

A standard 52-card deck library.

[![npm](https://img.shields.io/npm/v/fh-cards.svg)](https://npmjs.org/package/fh-cards)
[![npm](https://img.shields.io/npm/dm/fh-cards.svg)](https://npmjs.org/package/fh-cards)
[![npm](https://img.shields.io/npm/l/fh-cards.svg)](https://npmjs.org/package/fh-cards)
[![Travis](https://img.shields.io/travis/KyleJune/fh-cards.svg)](https://travis-ci.org/KyleJune/fh-cards)

## Install

```bash
npm install fh-cards
```

## Features

- Uses the [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) algorithm
- Optional Joker cards

## Example

This example is in TypeScript. It creates a standard deck, shuffles it, draws 2 cards, and then shows those two cards as strings.

```ts
import { Card, Deck, StandardDeck } from "fh-cards";

let deck: Deck = new StandardDeck();
deck.shuffle();

let hand: Card[] = deck.draws(2);
hand[0].toString(); // "8d"
hand[1].toString(); // "Ac"
```

This example is in JavaScript. It does the same thing as the previous example.

```js
let fhc = require("fh-cards");
let StandardDeck = fhc.StandardDeck;

let deck = new StandardDeck();
deck.shuffle();

let hand = deck.draws(2);
hand[0].toString(); // "Ts"
hand[1].toString(); // "5h"
```

## Documentation

[API](docs/API.md)

## License

[MIT](LICENSE)
