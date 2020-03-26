import {Card, CardProps, ICard} from "./card";
import {CardTypes, Traits} from "../constants";
import {Effect} from "./effects/effect";

type Abilities = typeof Effect;

export interface IHeroCard extends ICard {
  alterEgoStats: {
    title: string;
    isUnique: boolean;
    traits: Traits[]
    handLimit: number
    hitPoints: number
    abilities: Abilities[]
  }
  heroStats: {
    title: string;
    isUnique: boolean;
    traits: Traits[]
    handLimit: number
    hitPoints: number
    abilities: Abilities[]
  }
  attackValue: number
  thwartValue: number
  recoverValue: number

  changeForm(): void
  attack(target: ICard): void
  defend(): boolean
}

export class HeroCard extends Card implements IHeroCard {
  private _alterEgoStats;
  private _heroStats;
  private _attackValue;
  private _thwartValue;
  private _recoverValue;
  private _defenseValue;
  private _heroForm;

  constructor({ owner }) {
    super({ owner });
    this._heroForm = false;
  }

  get alterEgoStats() {
    return this._alterEgoStats;
  }

  get heroStats() {
    return this._heroStats;
  }

  get isHero() {
    return this._heroForm;
  }

  get isAlterEgo() {
    return !this._heroForm;
  }

  get attackValue() {
    return this._attackValue;
  }

  get thwartValue() {
    return this._thwartValue;
  }

  get recoverValue() {
    return this._recoverValue;
  }

  get defenseValue() {
    return this._defenseValue;
  }

  get handLimit() {
    if (this.isAlterEgo) {
      return this._alterEgoStats.handLimit;
    }
    return this.heroStats.handLimit;
  }

  changeForm() {
    this._heroForm = !this._heroForm;
  }

  attack(target) {
    if (target.type !== CardTypes.VILLAIN && target.type !== CardTypes.MINION) {
      throw new Error('Not a valid attack target');
    }
    if (!this._heroForm) {
      throw new Error('Character is not in hero form');
    }

    target.addDamage(this.attackValue);
  }

  defend() {
    if (!this.exhausted) {
      this.exhaust();
      return true;
    }
    return false;
  }
}
