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
  actions;
  return {};

};

module.exports = gameStateCreator;
