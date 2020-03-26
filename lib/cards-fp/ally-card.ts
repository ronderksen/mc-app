import {CardTypes} from "../constants";
import {card, Card, CardProps} from "./card";
import {characterCard, CharacterCard, CharacterCardProps} from "./character-card";
import {playerCard, PlayerCard, PlayerCardProps} from "./player-card";
import {SchemeCard} from "./scheme-card";

export type AllyCardProps = Omit<CardProps, 'type'> & CharacterCardProps & PlayerCardProps & {
  incidentalDamage: {
    attack: number
    thwart: number
  }
}

export interface AllyCard extends Card, CharacterCard, PlayerCard {
  incidentalDamage: {
    attack: number
    thwart: number
  }
  thwart(target: SchemeCard): void
  defend(): void
}

export function allyCard({ incidentalDamage, ...props}: AllyCardProps): AllyCard {
  const self = {
    ...card({ ...props, type: CardTypes.ALLY }),
    ...playerCard(props),
    ...characterCard(props),
    incidentalDamage,

    thwart(target) {
      if (target.type !== CardTypes.SCHEME) {
        throw new Error('Not a valid thwart target');
      }

      target.reduceThreat(self.thwartValue);
      if (self.incidentalDamage.thwart > 0) {
        self.addDamage(self.incidentalDamage.thwart);
      }
    },

    defend() {
      if (!self.exhausted) {
        self.exhaust();
        return true;
      }
      return false;
    }
  };

  return self;
}
