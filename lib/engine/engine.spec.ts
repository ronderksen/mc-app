import {Engine} from './engine';
import {cards, encounterCards} from "../__fixtures__/cards";
import {GameActions, Locations} from "../constants";
import {Deck} from "../deck";

describe('class: Engine', () => {
  let encounterDeck;

  beforeEach(() => {
    encounterDeck = new Deck(encounterCards, Locations.ENCOUNTER_DECK);
  });

  it('should start', () => {
    const engine = new Engine();
    const player = {
      deck: []
    };
    const scenario = {
      deck: encounterDeck,
      isExpertMode: false
    };

    engine.startGame({}, { players: [player], scenario });
  });

  it('should extract villain cards from the scenario', () => {
    const engine = new Engine();
    const scenario = {
      deck: encounterDeck,
      isExpertMode: false
    };
    engine.startGame({}, { scenario });
    expect(engine.villain).toBe(encounterCards[0]);
    // expect(engine.villain.stage).toBe(1);
  });

  it('should apply game actions', async () => {
    const engine = new Engine();
    const [_, card1, card2] = cards;
    card2.allowedActions = [];

    try {
      const c = await engine.applyGameAction(GameActions.exhaustCard, [card1, card2]);
      expect(c).toHaveLength(1);
      expect(c[0].title).toBe(card1.title);
    } catch (e) {
      expect(e).toBeUndefined()
    };
  });


  it('should check for end game conditions', () => {
    const engine = new Engine();
    expect(engine.checkPlayerWinCondition()).toBe(false);

  });
});
