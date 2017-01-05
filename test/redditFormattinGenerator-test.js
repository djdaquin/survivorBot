/*global describe it */

const chai = require('chai');
const expect = chai.expect;

const redditGen = require('../pipeline/redditMDGen.js');

describe('The Reddit MarkDown Generator (redditMDGen.js)', function () {

  it('should be a thing', function() {
    expect(redditGen).to.be.a('function');
  });

});
