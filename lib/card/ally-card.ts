import {Card, ICard} from "./card";
import {CardTypes, Resources} from "../constants";

type IncidentalDamage = {
  attack: number;
  thwart: number;
}

export interface IAllyCard extends ICard {
  attackValue: number;
  thwartValue: number;
  hitPoints: number;
  incidentalDamage: IncidentalDamage;
  resourceType: Resources;
  resourceCount: number;

  addDamage(amount: number): void;
  attack(target): void;
  thwart(target): void;
  defend(): void;
}

export class AllyCard extends Card implements IAllyCard {
  private readonly _attackValue;
  private readonly _thwartValue;
  private readonly _incidentalDamage;
  private _hitPoints;
  private readonly _resourceCount;
  private readonly _resourceType;
  private readonly _abilities;

  constructor({owner}) {
    super({owner});
  }

  get attackValue() {
    return this._attackValue;
  }

  get thwartValue() {
    return this._thwartValue;
  }

  get hitPoints() {
    return this._hitPoints;
  }

  get incidentalDamage() {
    return this._incidentalDamage;
  }

  get resourceCount() {
    return this._resourceCount;
  }

  get resourceType() {
    return this._resourceType;
  }

  get abilities() {
    return this._abilities;
  }

  addDamage(hp) {
    this._hitPoints = this._hitPoints - hp;
    if (this._hitPoints <= 0) {
      // this.discard()
    }
  }

  attack(target) {
    if (target.type !== CardTypes.VILLAIN && target.type !== CardTypes.MINION) {
      throw new Error('Not a valid attack target');
    }

    target.addDamage(this.attackValue);
    if (this._incidentalDamage.attack > 0) {
      this.addDamage(this._incidentalDamage.attack);
    }
  }

  thwart(target) {
    if (target.type !== CardTypes.SCHEME) {
      throw new Error('Not a valid thwart target');
    }

    target.reduceThreat(this.thwartValue);
    if (this._incidentalDamage.thwart > 0) {
      this.addDamage(this._incidentalDamage.thwart);
    }
  }

  defend() {
    if (!this.exhausted) {
      this.exhaust();
      return true;
    }
    return false;
  }
}
