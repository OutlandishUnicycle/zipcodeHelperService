const Sequelize = require('sequelize');
const secrets = require('../../secret.js');


let db = new Sequelize(process.env.pgdb, process.env.pguser, process.env.pgpw, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
  host: process.env.pghost,
  port: process.env.pgport,
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

module.exports = db;
