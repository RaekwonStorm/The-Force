var db = require('./server/db');
var User = db.model('user');
var Team = db.model('team');

module.exports = {

  findOrCreateTeam: function (domain, id) {
    return Team.findOrCreate({where: {team_domain: domain, team_id: id}})
      .spread(function (team, created) {
        return team;
      });
  },

  findOrCreateUser: function (user, points) {
    return User.findOrCreate({where: {user_name: user.name, team_id: user.team_id, user_id: user.id}})
      .spread(function (user, created) {
        var newPoints = parseInt(user.points) + parseInt(points);
        return user.update({points: newPoints}, {returning: true})
      })
      .then(function (user) {
        return user;
      })
  },

  findAllUsers: function (teamId) {
    return User.findAll({where: {
      team_id: teamId
    }})
    .then(function (users) {
      return users;
    })
  },

  createUser: function (user) {
    return User.create({where: {user_name: user.name, team_id: user.team_id, user_id: user.id}})
      .then(function (user) {
        return user;
      })
  }

}
