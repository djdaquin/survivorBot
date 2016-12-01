/*global describe it */

const chai = require('chai');
const expect = chai.expect;

const Contestant = require('../models/contestant.js');

describe('Contestant Model', function () {
  it('should exist', function () {
    expect(Contestant).to.be.ok;
  });
  it('should return something', function () {
    const contestant = new Contestant();
    expect(contestant).to.exist;
  });
  it('should return an object', function () {
    const contestant = new Contestant();
    expect(contestant).to.be.an('object');
  });
  it('should be a \"contestant\"', function () {
    const contestant = new Contestant();
    expect(contestant instanceof Contestant).to.be.true;
  });
});
