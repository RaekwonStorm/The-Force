var path = require('path');
var Sequelize = require('sequelize');

var db = new Sequelize('postgres:localhost:5432/the-force', { logging: true });

module.exports = db;
