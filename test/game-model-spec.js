/*global describe it */

const chai = require('chai');
const expect = chai.expect;

const GameState = require('../models/gamestate.js');

describe('GameState Model', function () {
  it('should exist', function () {
    expect(GameState).to.be.ok;
  });
  it('should return something', function () {
    const game = GameState();
    expect(game).to.exist;
  });

  const gameObject = {
    start: 10,
    safety: 30,
    url: 'http://www.reddit.com/r/testing/comments/abc123/survivor',
    id: 1,
  };
  const characters = [
    {
      name: 'John Smith',
      visid: 'johnsm',
    },
    {
      name: 'Spiderman',
      visid: 'spider',
    },
    {
      name: 'Superman',
      visid: 'superm',
    },
    {
      name: 'Batman',
      visid: 'batman',
    }
  ];
  const actions = [];

  it('should have the game information in it', function (){
    const game = GameState(gameObject, characters, actions);
    expect(game).to.have.keys('gameHPStart', 'gameHPSafety',
      'gameURL', 'gameID');
    expect(game.gameHPStart).to.equal(10);
    expect(game.gameHPSafety).to.equal(30);
    expect(game.gameURL).to.equal('http://www.reddit.com/r/testing/comments/abc123/survivor');
    expect(game.gameID).to.equal(1);
  });

});
