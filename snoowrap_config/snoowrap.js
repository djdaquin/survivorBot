'use strict';
const snoowrap = require('snoowrap');
const creds = require('./snoowrap-secrets.js');

const r = new snoowrap(creds);


// r.getInbox().then(console.log);

module.exports = r;
