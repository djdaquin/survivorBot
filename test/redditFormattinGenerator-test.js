/*global describe it */

const chai = require('chai');
const expect = chai.expect;

const GameState = require('../pipeline/gamestate.js');
const redditGen = require('../pipeline/redditMDGen.js');

const sampG = require('./fixtures/sampleGameObject.js');
const sampC = require('./fixtures/sampleCharacters.js');
const sampA = require('./fixtures/sampleActions.js');
const gameState = GameState(sampG, sampC, sampA);

describe('The Reddit MarkDown Generator (redditMDGen.js)', function () {

  it('should be a thing', function() {
    expect(redditGen).to.be.a('function');
  });

  it('should return a string', function () {
    expect(redditGen(gameState)).to.be.a('string');
  });

});
