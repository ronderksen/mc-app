import {Deck, IDeck} from "../deck/deck";
import {CardTypes, Locations} from "../constants";
import {ICard} from "../card/card";
import {IHeroCard} from "../card/hero-card";
import {IVillainCard} from "../card/villain-card";

interface IPlayer {
  readonly deck: IDeck;
  readonly discardPile: IDeck;
  readonly inPlay: IDeck;
  readonly hand: IDeck;
  readonly name: string;
  readonly hero: IHeroCard;

  playCard: (card: ICard) => void
  discardFrom: (card: ICard, location?: Locations) => void
  exhaustCard: (card: ICard) => void
  readyCard: (card: ICard) => void
  drawCards: (count?: number) => ICard[]
  attack: (card: IHeroCard, target: IVillainCard) => void

}

interface PlayerOptions {
  name: string;
  deck: IDeck;
}

export class Player implements IPlayer {
  private readonly _deck;
  private readonly _discardPile;
  private readonly _inPlay;
  private readonly _hand;
  private readonly _name;
  private readonly _hero;

  constructor(options: PlayerOptions) {
    this._name = options.name;
    this._deck = options.deck;
    this._discardPile = new Deck([], Locations.PLAYER_DISCARD_PILE);
    this._inPlay = new Deck([], Locations.IN_PLAY);
    this._hero = this._deck.drawCardOfType(CardTypes.HERO);

    this._hand = new Deck([], Locations.IN_HAND);
    this.drawCards(this._hero.handLimit);
  }

  get name() {
    return this._name;
  }

  get deck() {
    return this._deck;
  }

  get discardPile() {
    return this._discardPile;
  }

  get inPlay() {
    return this._inPlay;
  }

  get hand() {
    return this._hand;
  }

  get hero() {
    return this._hero;
  }

  playCard(card) {
    if (card.location === Locations.IN_HAND) {
      this.hand.moveCardTo(card, this.inPlay);
    } else {
      throw Error(`Card '${card.title}' not in hand`);
    }
  }

  discardFrom(cards, location = Locations.IN_HAND) {
    if (!Array.isArray(cards)) {
      cards = [cards];
    }
    cards.forEach(card => {
      if (card.location === location) {
        switch (location) {
          case Locations.IN_PLAY:
            this.inPlay.moveCardTo(card, this._discardPile);
            break;
          case Locations.PLAYER_DRAW_DECK:
            this.deck.moveCardTo(card, this._discardPile);
            break;
          case Locations.IN_HAND:
          default:
            this.hand.moveCardTo(card, this._discardPile);
            break;
        }
      }
    })
  }

  exhaustCard(card) {
    if (card.location === Locations.IN_PLAY) {
      card.exhaust();
    }
  }

  readyCard(card) {
    if (card.location === Locations.IN_PLAY) {
      card.ready();
    }
  }

  drawCards(count = 1) {
    const drawnCards = this.deck.draw(count);
    if (count > 1) {
      drawnCards
        .map(card => {
          this._hand.addCard(card);
          return card;
        });
    } else {
      this._hand.addCard(drawnCards);
    }
    return drawnCards;
  }

  attack(source, target) {
    source.attack(target);
  }
}
