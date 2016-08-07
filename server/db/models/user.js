'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('user', {
    user_name: {
        type: Sequelize.STRING
    },
    user_id: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    team_id: {
        type: Sequelize.STRING
    },
    points: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
