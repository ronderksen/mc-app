import { EventBus } from '../event-bus';
import {CardTypes, GameActions} from "../constants";
import {ICard} from "../card/card";

type callbackFn = (card: ICard) => void

type GameActionOptions = {
  force?: boolean
};

export class Engine {
  bus;
  room;
  players = [];
  encounter;
  villain;
  isExpertMode = false;

  constructor() {
    this.bus = new EventBus();
  }

  startGame(room, details) {
    this.room = room;
    this.players = details.players;
    this.encounter = details.scenario.deck;
    this.villain = this.encounter.drawCardOfType(CardTypes.VILLAIN);
    this.isExpertMode = details.scenario.isExpertMode;
  }

  checkPlayerWinCondition() {
    return false;
  }

  applyGameAction(action: GameActions, cards: ICard[], options: GameActionOptions = {}): Promise<ICard[]> {
    return new Promise((resolve, reject) => {
      const allowed = options.force ? cards : cards.filter(card => card.allowGameAction(action));

      if (allowed.length === 0) {
        reject('not allowed');
      }

      return resolve(allowed);
    });
  }
}
