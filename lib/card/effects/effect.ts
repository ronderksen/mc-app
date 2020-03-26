import {GameActions} from "../../constants";
import {ICard} from "../card";
import {Player} from "../../player";

type EffectProps = {
  trigger: GameActions,
  target: ICard,
  effectFn(): void
}

export interface IEffect {
  trigger: GameActions
  target: ICard | Player
  effectFn(): void
}

export class Effect implements IEffect {
  trigger;
  target;
  effectFn;

  constructor({ trigger, target, effectFn }) {
    this.trigger = trigger;
    this.target = target;
    this.effectFn = effectFn;
  }

  checkTrigger(action) {
    if (action === this.trigger) {

    }
  }
}
