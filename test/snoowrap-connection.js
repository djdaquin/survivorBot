/*global describe it xit */

const chai = require('chai');
const chaiaspromised = require('chai-as-promised');
const expect = chai.expect;

chai.use(chaiaspromised);

const r = require('../snoowrap_config/snoowrap.js');

describe('Snoowrap/reddit connection', function () {
  it('should exist', function () {
    expect(r).to.be.ok;
  });
  xit('should return not an error', function () {
    return expect(r.getInbox()).to.eventually.be.an('array');
  });
});
