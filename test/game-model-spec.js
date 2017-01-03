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
    expect(game).to.contain.keys('gameHPStart', 'gameHPSafety',
      'gameURL', 'gameID');
    expect(game.gameHPStart).to.equal(10);
    expect(game.gameHPSafety).to.equal(30);
    expect(game.gameURL).to.equal('http://www.reddit.com/r/testing/comments/abc123/survivor');
    expect(game.gameID).to.equal(1);
  });

  it('should have default game values', function () {
    const game = GameState(null, characters, actions);
    expect(game).to.contain.keys('gameHPStart', 'gameHPSafety',
      'gameURL', 'gameID');
    expect(game.gameHPStart).to.be.ok;
    expect(game.gameHPSafety).to.be.ok;
  });

  it('should have zones to hold the characters in', function () {
    const game = GameState(gameObject, characters, actions);
    expect(game).to.have.property('characters');
    expect(game.characters).to.have.keys('alive', 'dead', 'safe');
  });

  it ('should put characters in "alive" zone to start', function (){
    const game = GameState(gameObject, characters, actions);
    expect(game.characters.alive).to.be.an('array');
    expect(game.characters.alive.length).to.equal(4);
    expect(game.characters.alive[0]).to.be.an('object');
  });

  it('should put characters in alphabetical order', function () {
    const game = GameState(gameObject, characters, actions);
    expect(game.characters.alive[0].name).to.equal('Batman');
  });

  actions.push({ type: 'hurt', characterID: 'spider', user: '/u/survivorBot'});

  it('should lower hp if a character is "hurt"', function () {
    const game = GameState(gameObject, characters, actions);
    expect(game.characters.alive[2].hp).to.equal(9);
  });

  actions.push({ type: 'heal', characterID: 'superm', user: '/u/survivorBot'});

  it('should raise hp if a character is "healed"', function () {
    const game = GameState(gameObject, characters, actions);
    expect(game.characters.alive[3].hp).to.equal(11);
  });

});
