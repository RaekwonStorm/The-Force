'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Team = require('./models/team')

User.belongsTo(Team);
Team.hasMany(User);

