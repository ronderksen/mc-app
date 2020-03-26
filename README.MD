Application flow

Login page/Register page

Homescreen requires login
Options:
- Create game
- Create/edit deck
- Import deck (from marvelcdb.com)
- Quit

Create game -> Lobby page

On Lobby page, other players can join.
Spectators? 
"Host" can select villain and encounter sets. Toggle expert mode. 
All players can select decks from their "collection"

Start game -> game page

System gathers all players in room, initializes the decks and shows everything on screen
All decks are shuffled automatically, initial hands are drawn
All players are prompted for mulligan

Round starts
All players are prompted to select first player
First player performing actions
* Next player performing actions
* Next player performing actions
* Next player performing actions
System prompts all players' to discard cards
System refills all players' hands to handlimit
Villain phase -> 
 threat increases ->
  player interrupt window
  increase threat
  player response window
 villain attacks/schemes per player ->
  player interrupt window
  attack/scheme
  player defense choice window
  player response window
  minions engaged with player attack/scheme ->
      player interrupt window
      attack/scheme
      player defense choice window
      player response window
 encounter card is dealt to each player
 encounter card is revealed to each player ->
     player interrupt window
     reveal card
     player response window
End of round

How do card effects work?
Each effect has a trigger, a type and a target.
There are several possible triggers for an effect:
- Effects that require an action from the player, usually related to certain "phase"
- Effects that interrupt another effect
- Effects that respond to another effect
- Effects that are active as long as the card is in play
- TODO: More triggers?

There are multiple effect types:
- increase/decrease a card stat (e.g. hitpoints, attack, defense, etc.)
- increase/decrease a card's cost
- add/remove a state (confused, stunned, tough)
- remove a counter from a card (usually the card that triggered the effect)

A card can have multiple effect types.
