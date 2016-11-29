/*global describe it */

const chai = require('chai');
const expect = chai.expect;

const Contestant = require('../models/contestant.js');

describe('Contestant Model', function () {
  it('should exist', function () {
    const contestant = new Contestant();
    expect(contestant).to.exist;
  });
});
