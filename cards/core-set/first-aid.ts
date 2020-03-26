import {Aspects, CardTypes} from "../../lib/constants";
import {Effect} from "../../lib/card/effects/effect";
import {EventCard} from "../../lib/card";

export class FirstAid extends EventCard {
  id = '001-086';
  title = 'First Aid';
  allowedActions = [];
  aspect = Aspects.Basic;

  abilities = [
    new Effect({
      trigger: () => true,
      target: card => [CardTypes.ALLY, CardTypes.HERO].includes(card.type),
      effectFn: context => {
        context.target.heal(2);
      },
    })
  ];
}
