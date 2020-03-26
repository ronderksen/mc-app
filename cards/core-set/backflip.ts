import { EventCard } from "../../lib/card";
import {IEventCard} from "../../lib/card/event-card";

export class Backflip extends EventCard implements IEventCard {
  aspect: null;

  constructor({ owner }) {
    super({ owner });
  }
}
