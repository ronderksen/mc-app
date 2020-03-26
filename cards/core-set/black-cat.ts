import {AllyCard} from "../../lib/card";
import {Effect} from "../../lib/card/effects/effect";
import {GameActions, Locations, Resources, Traits} from "../../lib/constants";
import {IAllyCard} from "../../lib/card/ally-card";
import {allyCard} from "../../lib/cards-fp/ally-card";

// export class BlackCat extends AllyCard implements IAllyCard {
//   id: '001-002';
//   title: 'Black Cat';
//   isUnique: true;
//   cost: 2;
//   resources: 1;
//   traits: Traits.HeroForHire;
//   resourceType: Resources.Energy;
//   attackValue: 1;
//   thwartValue: 1;
//   hitPoints: 2;
//   incidentalDamage: {
//     attack: 0;
//     thwart: 1;
//   };
//   abilities: Effect[];
//
//   constructor({ owner }) {
//     super({ owner });
//   }
//
//   setupAbilities() {
//     this.abilities.push(new Effect({
//       trigger: (action) => {
//         if (action.type === GameActions.playCard && action.target === this) {
//           return true;
//         }
//       },
//       target: this.owner,
//       effectFn: (context) => {
//         const cards = context.owner.discardFrom(2, Locations.PLAYER_DRAW_DECK);
//         cards.filter(c => c.resourceType === Resources.Mental);
//       }
//     }))
//   }
// }

export const BlackCat = ({ owner }) => {
  return ({
    ...allyCard({
      id: '001-002',
      title: 'Black Cat',
      cost: 2,
      resourceCount: 1,
      resourceType: Resources.Energy,
      attackValue: 1,
      thwartValue: 1,
      incidentalDamage: {
        attack: 1,
        thwart: 1
      },
      hitPoints: 2,
      traits: [Traits.HeroForHire],
      allowedActions: [],
      abilities: [
        {
          trigger: (action) => {
            if (action.type === GameActions.playCard && action.target === this) {
              return true;
            }
          },
          target: this.owner,
          effectFn: (context) => {
            const cards = context.owner.discardFrom(2, Locations.PLAYER_DRAW_DECK);
            cards.filter(c => c.resourceType === Resources.Mental);
          }
        }
      ]
    }),
    owner,
  });
};
