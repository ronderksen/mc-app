import {CardTypes} from "../constants";
import {Card} from "./card";

export interface CharacterCard {
  attackValue: number
  thwartValue: number
  hitPoints: number
  addDamage(amount: number): void
  attack(target: Card & CharacterCard): void
}

export type CharacterCardProps = {
  attackValue: number
  thwartValue: number
  hitPoints: number
}

export function characterCard({ attackValue, thwartValue, hitPoints }: CharacterCardProps): CharacterCard {
  return ({
    attackValue,
    thwartValue,
    hitPoints,
    addDamage(hp) {
      this._hitPoints = this._hitPoints - hp;
      if (this._hitPoints <= 0) {
        // this.discard()
      }
    },

    attack(target) {
      if (target.type !== CardTypes.VILLAIN && target.type !== CardTypes.MINION) {
        throw new Error('Not a valid attack target');
      }

      target.addDamage(this.attackValue);
      if (this._incidentalDamage.attack > 0) {
        this.addDamage(this._incidentalDamage.attack);
      }
    },

  })
}
