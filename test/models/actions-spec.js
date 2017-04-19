/*global describe it */

const chai = require('chai');
const chaiaspromised = require('chai-as-promised');
const expect = chai.expect;

chai.use(chaiaspromised);

const Sequelize = require('sequelize');
const Actions = require('../../database/models/actions.js');

describe('Action model', function () {
  it('should be a thing', function () {
    expect(Actions).to.be.ok;
  });
  it('should have the correct fields', function () {
    Actions.sync({force: true}).then(function () {
      expect(Actions.create({
        healTarget: 'hello',
        hurtTarget: 'world',
        user: 'boo'
      })).to.eventually.be.a('object');
    });
  });
});
