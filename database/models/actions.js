const Sequelize = require('sequelize');
const sequelize = require('../database.js');

const Actions = sequelize.define('action', {
  ID: Sequelize.INTEGER,
  healTarget: Sequelize.STRING,
  hurtTarget: Sequelize.STRING,
  user: Sequelize.STRING,
  test: Sequelize.INTEGER,
});


sequelize.sync({force: true}).then(function (){ //TODO remove the force at some point
  console.log('Actions Table Synced');
  return;
});

module.exports = Actions;
