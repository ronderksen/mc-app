import {Card, Deck} from './index';
import {CardTypes, Locations} from "../constants";

describe('class: Deck', () => {
  let deck;

  const buildCardSet = (count) => {
    return [...Array(count)].map((x, i) => new Card({ type: CardTypes.EVENT, id: `${i}`, title: `card ${i}`, allowedActions: [] }));
  };

  beforeEach(() => {
    deck = new Deck(buildCardSet(40), Locations.PLAYER_DRAW_DECK);
  });

  it('should be possible to draw one card from the deck', () => {
    expect(deck.draw().id).toBe('39');
    expect(deck.size).toEqual(39);
  });

  it('should be possible to draw multiple cards from the deck', () => {
    const fiveCards = deck.draw(5);
    expect(fiveCards.length).toBe(5);
    expect(fiveCards[0].id).toBe('35');
    expect(fiveCards[1].id).toBe('36');
    expect(fiveCards[2].id).toBe('37');
    expect(fiveCards[3].id).toBe('38');
    expect(fiveCards[4].id).toBe('39');
    expect(deck.size).toBe(35);
  });

  it('should return null if the draw deck is empty', () => {
    const emptyDeck = new Deck([], Locations.PLAYER_DRAW_DECK);
    expect(emptyDeck.draw()).toBeNull();
  });

  it('should be possible to add cards to the deck', () => {
    const card = new Card({ type: CardTypes.EVENT, id: '40', title: 'card 40', allowedActions: [] });
    deck.addCard(card);
    expect(deck.size).toBe(41);
    expect(deck.draw()).toEqual(card);
  });

  it('should be possible to shuffle the deck', () => {
    deck.shuffle(5);
    expect(deck.draw()).not.toEqual(new Card({ type: CardTypes.EVENT, id: '39', title: 'card 39', allowedActions: [] }));
  });
});
