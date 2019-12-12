export interface ICard {
  id: string
  title: string
}

export class Card implements ICard {
  id;
  title;

  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}
