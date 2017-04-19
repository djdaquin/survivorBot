const Sequelize = require('sequelize');
const sequelize = require('../database.js');

const Characters = sequelize.define('character', {
  ID: Sequelize.INTEGER,
  name: Sequelize.STRING,
  gameID: Sequelize.INTEGER,
  visID: Sequelize.STRING,
});


sequelize.sync({force: true}).then(function (){ //TODO remove the force at some point
  console.log('Characters Table Synced');
  return;
});

module.exports = Characters;
