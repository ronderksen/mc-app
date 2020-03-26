import {Card, CardProps, ICard} from "./card";
import {CardTypes} from "../constants";

type VillainStage = {
  hitPoints: number
  attack: number;
  scheme: number;
}

export interface IVillainCard extends ICard {
  hitPoints: number
  attackValue: number;
  schemeValue: number;
  activeStage: number;
  addDamage(hp: number): void;
  activateNextStage(): void;
}

type VillainCardProps = CardProps & {
  stages: VillainStage[]
}

export class VillainCard extends Card implements IVillainCard {
  private _stages;
  private _hitPoints;
  private _activeStage;
  private _attackValue;
  private _schemeValue;

  constructor({ stages, ...cardProps }: VillainCardProps) {
    super({ ...cardProps, type: CardTypes.VILLAIN });
    this._stages = stages;
    this._activeStage = 0;
    this._hitPoints = stages[0].hitPoints;
    this._attackValue = stages[0].attack;
    this._schemeValue = stages[0].scheme;
  }

  get activeStage() {
    return this._activeStage;
  }

  get hitPoints() {
    return this._hitPoints;
  }

  get attackValue() {
    return this._attackValue;
  }

  get schemeValue() {
    return this._schemeValue;
  }

  addDamage(hp) {
    this._hitPoints = this._hitPoints - hp;
    if (this._hitPoints <= 0) {
      this.activateNextStage();
    }
  }

  activateNextStage() {
    this._activeStage += 1;
    if (this._activeStage > this._stages.length) {
      throw new Error('Villain has been defeated');
    } else {
      this._hitPoints = this._stages[this._activeStage].hitPoints;
      this._attackValue = this._stages[this._activeStage].attackValue;
      this._schemeValue = this._stages[this._activeStage].schemeValue;
    }
  }
}
