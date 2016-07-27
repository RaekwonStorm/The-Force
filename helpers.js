var db = require('./server/db');
var User = db.model('user');
var Team = db.model('team');

// helper functions

// refactor these using regex
module.exports = {

  parseAlignment: function (arr) {
    if (arr.includes("dark") && !arr.includes("light")) return 'dark'
    else if (arr.includes('light') && !arr.includes('dark')) return 'light'
    else return undefined;
  },

  parsePoints: function (arr) {
    var points = arr.filter(function (element) {
      if (parseInt(element).toString() !== "NaN") {
        return parseInt(element);
      }
    });

    if (points.length !== 1) return undefined

    return points[0];
  },

  findOrCreateTeam: function (domain, id) {
    return Team.findOrCreate({where: {team_domain: domain, team_id: id}})
      .spread(function (team, created) {
        return team;
      });
  },

  findOrCreateUser: function (username, teamId, points) {
    return User.findOrCreate({where: {user_name: username, teamId: teamId, points: points}})
      .spread(function (user, created) {
        if (!created) user.update
        else return user;
      })
  },

  requestParser: function (str) {
    var alignment,
    points,
    user;

    var strArr = str.split(" ");
    var darkRe = '/[Dd][Aa][Rr][Kk]+/g'
    var lightRe = '/[Ll][Ii][Gg][Hh][Tt]+/g'
    var points = '/\d+/g'
    var userArr = parseFindUser(strArr);

    console.log(userArr);

  },


  // Refactor parseFindUser to check against a cached
  // array of all the users for whatever channel.

  parseFindUser: function (arr) {

    var userArr = arr.map(function(element) {
      return User.findOne({where: {
        user_name: element
        }
      })
      .then(function (user) {
        return user
      })
    })

    return userArr;

  }
};
