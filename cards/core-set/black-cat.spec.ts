import { BlackCat } from './black-cat';
import { SpiderMan } from './spider-man';
import {Player} from "../../lib/player";
import {Deck} from "../../lib/deck";
import {Locations} from "../../lib/constants";

describe('Card: Black Cat', () =>{
  let card;
  let player;
  let heroCard;
  beforeEach(() => {
    card = BlackCat({ owner: player });
    heroCard = SpiderMan({ owner: player });
    const playerDeck = new Deck([heroCard, card], Locations.PLAYER_DRAW_DECK);
    player = new Player({deck: playerDeck, name: 'Ron'});
  });

  it('should have instantiated properly', () => {
    expect(card).toBeDefined();
    expect(card.attackValue).toBe(1);
  });
});
