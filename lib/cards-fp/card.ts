import {CardTypes, GameActions, Locations} from "../constants";
import {ActionOptions} from "../card/card";

interface Effect {
  trigger(action): boolean,
  target(): any,
  effectFn(context: any): void
}

export interface Card {
  id: string
  title: string
  type: CardTypes
  allowedActions: GameActions[]
  abilities: Effect[]
  traits: string[]
  exhausted: boolean
  allowGameAction(action: GameActions): boolean
  exhaust(): void
  ready(): void
  updateLocation(newLocation: Locations): void
  action(options: ActionOptions): void
}

export type CardProps = {
  id: string
  title: string
  type: CardTypes
  allowedActions: GameActions[]
  traits: string[]
  abilities: Effect[]
}

export function card({ id, title, type, allowedActions, traits, abilities }: CardProps): Card {
  return({
    id,
    title,
    type,
    allowedActions,
    traits,
    abilities,
    exhausted: false,

    allowGameAction(action) {
      if (this.allowedActions.includes(action)) {
        return true;
      }
    },

    exhaust() {
      if (this.exhausted === false) {
        this.exhausted = true;
      } else {
        throw new Error('Card is already exhausted');
      }
    },

    ready() {
      if (this.exhausted) {
        this.exhausted = false;
      } else {
        throw new Error('Card is not exhausted');
      }
    },

    updateLocation(newLocation) {
      this.location = newLocation;
    },

    action({ target, handler, when = () => {} }) {

    },
  })
}
