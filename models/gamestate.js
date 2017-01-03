const _ = require('underscore');


// Game should take an array of actions and return a game state.
// Should it take just actions or actions and characters?
// Game, Actions

/**
 * Action Objects:
 *
 *  Main Action
 *  {
 *    type: 'hurt' OR 'heal',
 *    characterID: 'abcdef',
 *    created_at: '1/1/1900 12:00:01',
 *    user: '/u/reddit_user_name'
 *  }
 *  // hurt lowers hp by one
 *  // heal raises hp by one
 *
 *  Admin Actions
 *  {
 *    type: 'set'
 *    characterID: 'abcdef',
 *  } // sets hp to certain amount. Can be used to create bosses or something
 *
 */

/**
 * Takes the game info obj, an array of all characters that are in this game,
 * and all actions that happened in that game, and recreates the game state and
 * stores it in an object.
 * @param  {Object} game       The game object, should have information on
 *                             starting health, the safety level, and the
 *                             OP location
 * @param  {Array}  characters array of all characters in the game. Should
 *                             be objects that contain both
 *                             the visible id and real name.
 * @param  {Array}  actions    array of all actions from this game. Should
 *                             have a property of 'type' and a target.
 * @return {Object}            An object representing the game state. Should
 *                             have all characters in their location and their
 *                             current health, What turn we are on, and who
 *                             killed who.
 */
const gameStateCreator = function (game, characters, actions) {
  actions; // remove this. It is here to prevent arguments error.
           // remove it as soon as we actually use actions.
  const gameState = {}; // this will be what is returned.

  // handle adding the game information.
  if (game) {
    gameState.gameHPStart = game.start;
    gameState.gameHPSafety = game.safety;
    gameState.gameID = game.id;
    gameState.gameURL = game.url;
  } else { // no game info is given
    gameState.gameHPStart = 10;
    gameState.gameHPSafety = 30;
    gameState.gameID = null;
    gameState.gameURL = null;
  }

  // Handle character initilization

  gameState.characters = {};
  //shortcut
  const gsCharacters = gameState.characters;
  gsCharacters.alive = [];
  gsCharacters.dead = [];
  gsCharacters.safe = [];

  // Add characters to alive pool to start, setting them up as game objects
  // as well
  if(characters){
    gsCharacters.alive = characters.map((char) => {
      char.hp = gameState.gameHPStart;
      return char;
    }).sort((a, b) => {
      //sort alphabetically
      if (a.name < b.name){
        return -1;
      } else if(b.name < a.name){
        return 1;
      } else {
        return 0;
      }
    });
  }

  // Start to handle actions.
  if (!actions) return gameState;
  // make sure actions are in chronological order.

  // go action by action and adjust the game state
  actions.forEach((action) => {
    // make user history object work.
    // Adjust HP and move characters as appropriate.
    var target = _.find(gsCharacters.alive, char => char.visid === action.characterID);

    // Handle if an action got submitted for someone that isn't in the alive
    // pool anymore.
    if(!target) return;

    if(action.type === 'heal') {
      target.hp++;
      if(target.hp >= gameState.gameHPSafety){
        const targetIndex = gsCharacters.alive.indexOf(target);
        gsCharacters.safe.push(gsCharacters.alive.splice(targetIndex, 1)[0]);
      }
    }

    if(action.type === 'hurt') {
      target.hp--;
      if (target.hp <= 0) {
        const targetIndex = gsCharacters.alive.indexOf(target);
        gsCharacters.dead.push(gsCharacters.alive.splice(targetIndex, 1)[0]);
      }
    }

    // Handle alive pool hitting 1
    if(gsCharacters.alive.length <= 1){
      if (gsCharacters.safe.length + gsCharacters.alive.length === 1){
        // handle a winner
      } else {
        // there is no winner, put all those in the safe zone back into the fray
        while (gsCharacters.safe.length > 0){
          gsCharacters.alive.push(gsCharacters.safe.pop());
        }
        // set all of the character's health to 10;
        gsCharacters.alive.forEach(char => char.hp = 10);
      }
    }

  });

  return gameState;
};

module.exports = gameStateCreator;
