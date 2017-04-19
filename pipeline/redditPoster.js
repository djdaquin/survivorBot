const opGen = require('./redditMDGen.js');
const gameStateGen = require('./gameState.js');
const r = require('../snoowrap_config/snoowrap.js');

const sampleActions = require('../test/fixtures/sampleActions.js');
const sampleGameObject = require('../test/fixtures/sampleGameObject.js');
const sampleCharacters = require('../test/fixtures/sampleCharacters.js');

const gameState = gameStateGen(sampleGameObject, sampleCharacters, sampleActions);

// gameState.characters.dead = [];
// gameState.characters.safe = [];
gameState.winner = 'The Joker';

const opMarkdown = opGen(gameState);

r.getUser('hurtandheal').getSubmissions().then((subs) => {
  subs[0].edit(opMarkdown);
});
