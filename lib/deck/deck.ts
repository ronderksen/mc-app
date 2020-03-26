import {ICard} from "../card/card";
import {CardTypes, Locations} from "../constants";

export interface IDeck {
  cards: ICard[]
  location: Locations
  size: number

  draw(count: number): Maybe<ICard | ICard[]>
  drawCardOfType(type: CardTypes): Maybe<ICard>
  addCard(card: ICard): void
  moveCardTo(card: ICard, targetDeck: IDeck): void
  shuffle(): void
}

export class Deck implements IDeck {
  private _cards = [];
  private readonly _location;

  constructor(cards: ICard[] = [], location: Locations) {
    this._location = location;
    cards.forEach(card => this.addCard(card));
  }

  get cards() {
    return this._cards;
  }

  get location() {
    return this._location;
  }


  get size() {
    return this.cards.length;
  }

  draw(count = 1) {
    if (this.size === 0) {
      return null;
    }
    if (count > 1) {
      return this.cards.splice(this.size - count, count);
    }
    return this.cards.pop();
  }

  drawCardOfType(type: CardTypes) {
    let card;
    this._cards = this.cards.filter(c => {
      if (c.type !== type) {
        return c;
      }
      card = c;
    });
    return card;
  }

  addCard(card) {
    card.updateLocation(this.location);
    this.cards.push(card);
  }

  moveCardTo(card, targetDeck) {
    this._cards = this.cards.filter(c => c.id !== card.id);
    targetDeck.addCard(card);
  }

  shuffle(count: number = 1): void {
    let a = 0;
    for (; a <= count; a++) {
      let j, x, i;
      for (i = this.size - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        if (i === j) continue;
        x = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = x;
      }
    }
  }
}
