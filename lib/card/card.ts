import {GameActions, CardTypes, Locations} from "../constants";
import {Effect} from "./effects/effect";
import {Player} from "../player";

export type ActionOptions = {
  target: any
  handler: any
  when?: any
}

export interface ICard {
  owner: Player;
  id: string
  type: CardTypes
  title: string
  exhausted: boolean
  location: Locations
  allowedActions: GameActions[]
  abilities: Effect[]

  setupAbilities(): void

  allowGameAction: (action: GameActions) => boolean

  exhaust: () => void

  ready: () => void

  updateLocation: (newLocation: Locations) => void

  action(options: ActionOptions): void

}

export type CardProps = {
  type?: CardTypes,
  id: string,
  title: string,
  allowedActions: GameActions[],
  abilities: Effect[]
};

export abstract class Card implements ICard {
  private _effects = [];
  private _owner;

  type;
  id;
  title;
  exhausted = false;
  location;
  allowedActions = [];
  abilities = [];

  protected constructor({ owner }) {
    this._owner = owner;
  }

  get owner() {
    return this.owner;
  }

  setupAbilities() {}

  allowGameAction(action) {
    if (this.allowedActions.includes(action)) {
      return true;
    }
  }

  exhaust() {
    if (this.exhausted === false) {
      this.exhausted = true;
    } else {
      throw new Error('Card is already exhausted');
    }
  }

  ready() {
    if (this.exhausted) {
      this.exhausted = false;
    } else {
      throw new Error('Card is not exhausted');
    }
  }

  updateLocation(newLocation) {
    this.location = newLocation;
  }

  action({ target, handler, when = () => {} }) {

  }
}
