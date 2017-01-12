/*global describe it */

const chai = require('chai');
const expect = chai.expect;

const gameObject = require('./fixtures/sampleGameObject');
const characters = require('./fixtures/sampleCharacters');

const GameState = require('../pipeline/gamestate.js');

describe('GameState Generator (gamestate.js)', function () {
  it('should exist', function () {
    expect(GameState).to.be.ok;
  });
  it('should return something', function () {
    const game = GameState();
    expect(game).to.exist;
  });

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

  it('should lower hp if a character is "hurt"', function () {
    actions.push({ hurtTarget: 'spider', healTarget: 'superm', user: '/u/survivorBot'});
    const game = GameState(gameObject, characters, actions);
    expect(game.characters.alive[2].hp).to.equal(9);
  });

  it('should raise hp if a character is "healed"', function () {
    const game = GameState(gameObject, characters, actions);
    expect(game.characters.alive[3].hp).to.equal(11);
  });

  it('should "save" characters whose HP hit the safety mark', function () {
    for (let i = 0; i < 9; i++){
      actions.push({ healTarget: 'superm', hurtTarget: 'spider', user: '/u/survivorBot'});
    }
    for (let i = 0; i < 10; i++){
      actions.push({ healTarget: 'superm', hurtTarget: null, user: '/u/survivorBot'});
    }
    const game = GameState(gameObject, characters, actions);
    expect(game.characters.alive.length).to.equal(2);
    expect(game.characters.safe.length).to.equal(1);
    expect(game.characters.safe[0].name).to.equal('Superman');
  });

  it ('should "kill" characters whose HP go to 0', function () {
    const game = GameState(gameObject, characters, actions);
    expect(game.characters.alive.length).to.equal(2);
    expect(game.characters.alive.find(function (e) {
      return e.visid === 'spider';
    })).to.equal(undefined);
    expect(game.characters.dead.length).to.equal(1);
    expect(game.characters.dead[0].name).to.equal('Spiderman');
  });

  it('should mark the time of death for characters that are killed', function () {
    const game = GameState(gameObject, characters, actions);
    expect(game.characters.dead[0].death).to.be.a('number');
    expect(game.characters.dead[0].death).to.equal(10);
  });

  it('should keep track of who killed the character', function () {
    const game = GameState(gameObject, characters, actions);
    expect(game.characters.dead[0].killer).to.be.ok;
    expect(game.characters.dead[0].killer).to.be.a('string');
    expect(game.characters.dead[0].killer).to.equal('/u/survivorBot');
  });

  it('should not break when you try to hurt or heal something that has been '
  + 'killed or saved before', function (){
    actions.push({ type: 'heal', characterID: 'superm', user: '/u/survivorBot'});
    actions.push({ type: 'hurt', characterID: 'spider', user: '/u/survivorBot'});
    const game = GameState(gameObject, characters, actions);
    expect(game).to.be.an('object');
  });

  it('should reset the alive pool when there is only one person in it.', function() {
    for(let i = 0; i < 11; i++){
      actions.push({ hurtTarget: 'johnsm', healTarget: null, user: '/u/survivorBot'});
    }
    const game = GameState(gameObject, characters, actions);
    expect(game.characters.alive.length).to.be.greaterThan(1);
    expect(game.characters.alive[0].hp).to.equal(10);
    expect(game.characters.alive[1].hp).to.equal(10);
  });

  it('should have a winner if there is only one character', function () {
    for(let i = 0; i < 11; i++){
      actions.push({ hurtTarget: 'superm', healTarget: null, user: '/u/survivorBot'});
    }
    const game = GameState(gameObject, characters, actions);
    expect(game.winner).to.equal('Batman');
  });

  // user involvement history
  it('should have a memory object', function () {
    const game = GameState(gameObject, characters, actions);
    expect(game.userHistory).to.exist;
    expect(game.userHistory).to.be.an('object');
  });

  it('should have a memory object that contains user participation data', function () {
    const game = GameState(gameObject, characters, actions);
    expect(game.userHistory['/u/survivorBot']).to.be.greaterThan(5);
  });

});
