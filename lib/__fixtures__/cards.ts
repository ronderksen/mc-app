import {Card, HeroCard, VillainCard} from "../card";
import {CardTypes, GameActions} from "../constants";

export const cards = [
  new HeroCard({id: '1', title: 'test hero', handLimit: { alterEgo: 6, hero: 4 }, attackValue: 2, thwartValue: 2, recoverValue: 3, allowedActions: [GameActions.exhaustCard] }),
  new Card({id: '2', type: CardTypes.ALLY, title: 'test ally', allowedActions: [GameActions.exhaustCard] }),
  new Card({id: '3', type: CardTypes.SUPPORT, title: 'test support', allowedActions: [GameActions.exhaustCard] }),
  new Card({id: '4', type: CardTypes.EVENT, title: 'test event', allowedActions: [GameActions.exhaustCard] }),
  new Card({id: '5', type: CardTypes.UPGRADE, title: 'test upgrade', allowedActions: [GameActions.exhaustCard] }),
  new Card({id: '6', type: CardTypes.UPGRADE, title: 'test upgrade 2', allowedActions: [GameActions.exhaustCard] }),
  new Card({id: '7', type: CardTypes.UPGRADE, title: 'test upgrade 3', allowedActions: [GameActions.exhaustCard] }),
  new Card({id: '8', type: CardTypes.UPGRADE, title: 'test upgrade 4', allowedActions: [GameActions.exhaustCard] }),
  new Card({id: '9', type: CardTypes.UPGRADE, title: 'test upgrade 5', allowedActions: [GameActions.exhaustCard] }),
  new Card({id: '10', type: CardTypes.UPGRADE, title: 'test upgrade 6', allowedActions: [GameActions.exhaustCard] }),
  new Card({id: '11', type: CardTypes.UPGRADE, title: 'test upgrade 7', allowedActions: [GameActions.exhaustCard] }),
];

export const encounterCards = [
  new VillainCard({id: '100', title: 'Rhino', stages: [{hitPoints: 15, scheme: 1, attack: 2}], allowedActions: [GameActions.exhaustCard] }),
  new Card({id: '101', type: CardTypes.TREACHERY, title: 'Treachery card', allowedActions: []}),
  new Card({id: '102', type: CardTypes.TREACHERY, title: 'Treachery card', allowedActions: []}),
  new Card({id: '103', type: CardTypes.MINION, title: 'Minion card', allowedActions: []}),
  new Card({id: '104', type: CardTypes.MINION, title: 'Minion card', allowedActions: []}),
  new Card({id: '105', type: CardTypes.MINION, title: 'Minion card', allowedActions: []}),
];
