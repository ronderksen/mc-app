import {Deck, Card} from './index';

describe('class: Deck', () => {
  let deck;

  const buildCardSet = (count) => {
    return [...Array(count)].map((x, i) => new Card(i, `card ${i}`));
  };

  beforeEach(() => {
    deck = new Deck(buildCardSet(40));
  });

  it('should be possible to draw one card from the deck', () => {
    expect(deck.draw()).toEqual(new Card(39, 'card 39'));
    expect(deck.size()).toEqual(39);
  });

  it('should be possible to draw multiple cards from the deck', () => {
    const fiveCards = deck.draw(5);
    expect(fiveCards.size()).toBe(5);
    expect(fiveCards.draw()).toEqual(new Card(39, 'card 39'));
    expect(fiveCards.draw()).toEqual(new Card(38, 'card 38'));
    expect(fiveCards.draw()).toEqual(new Card(37, 'card 37'));
    expect(fiveCards.draw()).toEqual(new Card(36, 'card 36'));
    expect(fiveCards.draw()).toEqual(new Card(35, 'card 35'));
    expect(deck.size()).toBe(35);
  });

  it('should return null if the draw deck is empty', () => {
    const emptyDeck = new Deck();
    expect(emptyDeck.draw()).toBeNull();
  });

  it('should be possible to add cards to the deck', () => {
    const card = new Card(40, 'card 40');
    deck.addCard(card);
    expect(deck.size()).toBe(41);
    expect(deck.draw()).toEqual(card);
  });

  it('should be possible to shuffle the deck', () => {
    deck.shuffle(5);
    expect(deck.draw()).not.toEqual(new Card(39, 'card 39'));
  });
});
