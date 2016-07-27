'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('team', {
    team_domain: {
        type: Sequelize.STRING,
        unique: true
    },
    team_id: {
        type: Sequelize.STRING,
        unique: true
    },
}, {
    instanceMethods: {},
    classMethods: {},
    hooks: {}
});
