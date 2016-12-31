/*global describe it */

const chai = require('chai');
const expect = chai.expect;

const GameState = require('../models/gamestate.js');

describe('GameState Model', function () {
  it('should exist', function () {
    expect(GameState).to.be.ok;
  });
  const game = GameState();
  it('should return something', function () {
    expect(game).to.exist;
  });
  it('should take a ');
});
