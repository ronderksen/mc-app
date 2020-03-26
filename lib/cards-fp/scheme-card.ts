import {card, Card, CardProps} from "./card";

export interface SchemeCard extends Card {
  threatValue: number
  isSideScheme: boolean
  reduceThreat(thwartValue: number): void
}

export type SchemeCardProps = CardProps & {
  threatValue: number
  isSideScheme: boolean
}

export function schemeCard({ threatValue, isSideScheme, ...props }: SchemeCardProps): SchemeCard {
  return {
    ...card(props),
    threatValue,
    isSideScheme,
    reduceThreat(thwartValue) {
      this.threatValue = this.threatValue - thwartValue;
      if (this.threatValue <= 0) {
        // discard scheme
      }
    }
  }

}
