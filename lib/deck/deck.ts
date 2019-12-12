import {ICard} from "./card";

interface IDeck {
  cards: ICard[]
}

export class Deck implements IDeck {
  cards;

  constructor(cards: ICard[] = []) {
    this.cards = cards;
  }

  draw(count: number = 1): ICard | IDeck | null {
    if (this.size() === 0) {
      return null;
    }
    if (count > 1) {
      return new Deck(this.cards.splice(this.size() - count, count));
    }
    return this.cards.pop();
  }

  size(): number {
    return this.cards.length;
  }

  addCard(card: ICard): void {
    this.cards.push(card);
  }

  shuffle(count: number = 1): void {
    let a = 0;
    for (; a <= count; a++) {
      let j, x, i;
      for (i = this.size() - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        if (i === j) continue;
        x = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = x;
      }
    }
  }
}
