import {Player} from './player';
import {Deck} from "../deck";
import {Locations} from "../constants";
import {cards} from '../__fixtures__/cards';
import {VillainCard} from "../card";

describe('class: Player', () => {
  let playerDeck;

  beforeEach(() => {
    playerDeck = new Deck([...cards], Locations.PLAYER_DRAW_DECK);
  });

  it('should initialize a player', () => {
    const player = new Player({name: 'Ron', deck: playerDeck});

    expect(player.name).toBe('Ron');
  });

  it('should have a deck', () => {
    const player = new Player({
      name: 'Ron',
      deck: playerDeck
    });

    expect(player.deck).toEqual(playerDeck);
    player.deck.cards.forEach(card => {
      expect(card.location).toBe(Locations.PLAYER_DRAW_DECK);
    });
  });

  it('should draw a starting hand size equal to the hero hand limit', () => {
    const player = new Player({
      name: 'Ron',
      deck: playerDeck
    });
    expect(player.hand.size).toBe(6);
  });

  it('should have a hero card', () => {
    const player = new Player({
      name: 'Ron',
      deck: playerDeck
    });

    expect(player.hero).toEqual(cards[0]);
  });

  it('should be allowed to draw a card', () => {
    const player = new Player({
      name: 'Ron',
      deck: playerDeck
    });

    const deckSize = player.deck.size;
    player.drawCards();

    expect(player.deck.size).toBe(deckSize - 1);
    expect(player.hand.size).toBe(player.hero.handLimit + 1);
    player.hand.cards.forEach(card => {
      expect(card.location).toBe(Locations.IN_HAND);
    });
  });

  it('should be allowed to draw multiple cards', () => {
    const player = new Player({
      name: 'Ron',
      deck: playerDeck
    });

    const deckSize = player.deck.size;
    player.drawCards(2);

    expect(player.deck.size).toBe(deckSize - 2);
    expect(player.hand.size).toBe(player.hero.handLimit + 2);
    player.hand.cards.forEach(card => {
      expect(card.location).toBe(Locations.IN_HAND);
    });
  });


  it('should be possible to play a card', () => {
    const player = new Player({name: 'Ron', deck: playerDeck});
    const card = player.hand.cards[0];

    player.playCard(card);

    expect(card.location).toBe(Locations.IN_PLAY);
  });

  it('should be possible to discard cards from the draw deck', () => {
    const player = new Player({name: 'Ron', deck: playerDeck});
    const cards = [player.deck.cards[0], player.deck.cards[1]];
    const deckSize = player.deck.size;

    player.discardFrom(cards, Locations.PLAYER_DRAW_DECK);

    expect(player.deck.size).toBe(deckSize - 2);
    expect(player.discardPile.size).toBe(2);
    expect(player.discardPile.cards).toContain(cards[0]);
    expect(player.discardPile.cards).toContain(cards[1]);
  });

  it('should be possible to discard cards from hand', () => {
    const player = new Player({name: 'Ron', deck: playerDeck});
    const cards = [player.hand.cards[0], player.hand.cards[1]];

    player.discardFrom(cards);

    expect(player.hand.size).toBe(player.hero.handLimit - 2);
    expect(player.discardPile.size).toBe(2);
    expect(player.discardPile.cards).toContain(cards[0]);
    expect(player.discardPile.cards).toContain(cards[1]);
  });

  it('should be possible to discard cards from play', () => {
    const player = new Player({name: 'Ron', deck: playerDeck});
    const card = player.hand.cards[0];

    player.playCard(card);
    expect(card.location).toBe(Locations.IN_PLAY);
    expect(player.inPlay.size).toBe(1);

    player.discardFrom(card, Locations.IN_PLAY);
    expect(card.location).toBe(Locations.PLAYER_DISCARD_PILE);
    expect(player.inPlay.size).toBe(0);
    expect(player.discardPile.size).toBe(1);
  });

  it('should be possible to exhaust a card', () => {
    const player = new Player({name: 'Ron', deck: playerDeck});
    const card = player.hand.cards[0];

    player.playCard(card);
    player.exhaustCard(card);

    expect(card.exhausted).toBeTruthy();
  });

  it('should be possible to ready a card', () => {
    const player = new Player({name: 'Ron', deck: playerDeck});
    const card = player.hand.cards[0];

    player.playCard(card);
    player.readyCard(card);

    expect(card.exhausted).toBeFalsy();
  });

  it('should be possible to change identity form', () => {
    const player = new Player({name: 'Ron', deck: playerDeck});
    const hero = player.hero;

    expect(hero.isHero).toBe(false);
    expect(hero.isAlterEgo).toBe(true);

    hero.changeForm();

    expect(hero.isHero).toBe(true);
    expect(hero.isAlterEgo).toBe(false);

    hero.changeForm();

    expect(hero.isHero).toBe(false);
    expect(hero.isAlterEgo).toBe(true);
  });

  it('should be possible to attack the villain', () => {
    const player = new Player({name: 'Ron', deck: playerDeck});
    const hero = player.hero;
    hero.changeForm();

    const target = new VillainCard({
      id: 'v1',
      title: 'Rhino',
      allowedActions: [],
      stages: [
        {
          scheme: 1,
          attack: 2,
          hitPoints: 15,
        }
      ]
    });

    player.attack(hero, target);

    expect(target.hitPoints).toBe(15 - hero.attackValue);
  });
});
