'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('user', {
    user_name: {
        type: Sequelize.STRING,
        unique: true
    },
    points: {
        type: Sequelize.INTEGER
    }
}, {
    instanceMethods: {
        updatePoints: function (points) {
            var Points = this.getDataValues('points') + points;

            this.setDataValues('points', Points);
        }
    },
    classMethods: {},
    hooks: {}
});
