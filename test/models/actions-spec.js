/*global describe it */

const chai = require('chai');
const chaiaspromised = require('chai-as-promised');
const expect = chai.expect;

chai.use(chaiaspromised);


const Actions = require('../../database/models/actions.js');
