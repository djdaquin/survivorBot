const Sequelize = require('sequelize');
const sequelize = require('../database.js');

const Games = sequelize.define('game', {
  ID: Sequelize.INTEGER,
  name: Sequelize.STRING,
  redditPostID: Sequelize.STRING,
  isActive: Sequelize.BOOLEAN,
});


sequelize.sync({force: true}).then(function (){ //TODO remove the force at some point
  console.log('Games Table Synced');
  return;
});

module.exports = Games;
