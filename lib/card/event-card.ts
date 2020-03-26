import {Card, CardProps, ICard} from "./card";
import {Aspects, CardTypes} from "../constants";

export interface IEventCard extends ICard {
  aspect: Aspects
}

export class EventCard extends Card implements IEventCard {
  private readonly _aspect;
  type: CardTypes.EVENT;

  constructor({ owner }) {
    super({ owner });
  }

  get aspect() {
    return this._aspect;
  }
}
