import { HeroCard } from "../../lib/card";
import {Effect} from "../../lib/card/effects/effect";
import {GameActions, Resources, Traits} from "../../lib/constants";
import {heroCard} from "../../lib/cards-fp/hero-card";

// export class SpiderMan extends HeroCard {
//   id: '001-001';
//   alterEgoStats: {
//     isUnique: true;
//     title: 'Peter Parker',
//     traits: [Traits.Genius],
//     hitPoints: 10,
//     handLimit: 6,
//     abilities: Effect[],
//   };
//   heroStats: {
//     isUnique: true;
//     title: 'Spider-Man',
//     traits: [Traits.Avenger],
//     hitPoints: 10,
//     handLimit: 5,
//     abilities: Effect[],
//   };
//
//   constructor({ owner }) {
//     super({ owner });
//   }
//
//   setupAbilities() {
//     // Scientist — Resource: Generate a  resource. (Limit once per round.)
//     this.alterEgoStats.abilities.push(new Effect({
//       trigger: GameActions.useAction,
//       target: this.owner,
//       effectFn: context => {
//         context.target.addResource(1, Resources.Mental);
//       }
//     }))
//   }
// }

export function SpiderMan({ owner }) {
  return {
    ...heroCard({
      id: '001-001',
      alterEgoStats: {
        isUnique: true,
        title: 'Peter Parker',
        traits: [Traits.Genius],
        hitPoints: 10,
        handLimit: 6,
        recoverValue: 3,
        abilities: [],
      },
      heroStats: {
        isUnique: true,
        title: 'Spider-Man',
        traits: [Traits.Avenger],
        hitPoints: 10,
        handLimit: 5,
        attackValue: 2,
        thwartValue: 1,
        defendValue: 3,
        abilities: [],
      }
    }),
    owner
  }
}
