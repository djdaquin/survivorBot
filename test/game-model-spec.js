/*global describe it */

const chai = require('chai');
const expect = chai.expect;

const Game = require('../models/game.js');

describe('Game Model', function () {
  it('should exist', function () {
    const game = new Game;
    expect(game).to.exist;
  });
});
