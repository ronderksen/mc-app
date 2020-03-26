import {CardTypes, GameActions, Locations, Traits} from "../constants";
import {Effect} from "../card/effects/effect";
import {Card} from "./card";
import {ActionOptions} from "../card/card";

type AlterEgoStats = {
  title: string
  isUnique: boolean
  traits: Traits[]
  handLimit: number
  hitPoints: number
  recoverValue: number
  abilities: Effect[]
}

type HeroStats = {
  title: string
  isUnique: boolean
  traits: Traits[]
  handLimit: number
  hitPoints: number
  attackValue: number
  thwartValue: number
  defendValue: number
  abilities: Effect[]
}

type HeroCardProps = {
  id: string
  alterEgoStats: AlterEgoStats
  heroStats: HeroStats
}

interface HeroCard {
  id: string
  type: CardTypes
  alterEgoStats: AlterEgoStats
  heroStats: HeroStats
  exhausted: boolean

  allowGameAction(action: GameActions): boolean
  exhaust(): void
  ready(): void
  updateLocation(location: Locations): void
  action(options: ActionOptions): void

  changeForm(): void
  attack(target: Card): void
  defend(): boolean
}

export function heroCard({ id, alterEgoStats, heroStats, ...props}: HeroCardProps): HeroCard {
  return ({
    id,
    type: CardTypes.HERO,
    alterEgoStats,
    heroStats,
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
    changeForm() {},
    attack(target: Card) {},
    defend() { return false }
  })
}
