var Sequelize = require('sequelize');
var db = require('./database.js');

var zipcodes = db.define('zipcodes', {
  zipcode: Sequelize.INTEGER,
  nearby: { type: Sequelize.STRING, defaultValue: null },
  lat: { type: Sequelize.STRING, allowNull: true, defaultValue: null },
  lng: { type: Sequelize.STRING, allowNull: true, defaultValue: null },
});

zipcodes.sync({force: false});

module.exports = zipcodes;
