// const pg = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/survivor';
//
// const client = new pg.Client(connectionString);
// client.connect();
// const query = client.query(
//   'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', () => { client.end(); });
const Sequelize = require('sequelize');

console.log(process.env.DATABASE_URL || 'postgres://localhost:5432/survivor');

var sequelize =
  new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/survivor');
// var sequelize = new Sequelize('postgres://localhost:5432/survivor');

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.', err);
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;
