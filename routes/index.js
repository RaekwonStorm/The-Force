var express = require('express');
var router = express.Router();
// var db = require('../server/db');
// var User = db.model('user');
// var Team = db.model('team');
var helpers = require('../helpers')

// router.get('/',function(req,res){
//     //res.status(200).send();
//    return res.render("main");
// });

router.post('/', function (req, res) {

  var strArr = req.body.text.split(" ");
  var alignment = helpers.parseAlignment(strArr);
  var points = helpers.parsePoints(strArr);

  if (Boolean(points) === false) res.send('no points were awarded');
  else if (!alignment) res.send('no alignment was given');

  else {
    helpers.findOrCreateTeam(req.body.team_domain, req.body.team_id)
    .then(function (team) {
      helpers.findOrCreateUser(req.body.user_name, team.id, points)
    })
    .then(function () {
      res.send(req.body.user_name + " was awarded " + points + " " + alignment + " side points");
    })
  }
})

// helper functions

// refactor these using regex

// var parseAlignment = function (arr) {
//   if (arr.includes("dark") && !arr.includes("light")) return 'dark'
//   else if (arr.includes('light') && !arr.includes('dark')) return 'light'
//   else return undefined;
// }

// var parsePoints = function (arr) {
//   var points = arr.filter(function (element) {
//     if (parseInt(element).toString() !== "NaN") {
//       return parseInt(element);
//     }
//   });

//   if (points.length !== 1) return undefined

//   return points[0];
// }

// var findOrCreateTeam = function (domain, id) {
//   return Team.findOrCreate({where: {team_domain: domain, team_id: id}})
//     .spread(function (team, created) {
//       return team;
//     })
// }

// var findOrCreateUser = function (username, teamId, points) {
//   return User.findOrCreate({where: {user_name: username, teamId: teamId, points: points}})
//     .spread(function (user, created) {
//       if (!created) user.update
//       else return user;
//     })
// }

// var requestParser = function (str) {
//   var alignment,
//   points,
//   user;

//   var strArr = str.split(" ");
//   var darkRe = '/[Dd][Aa][Rr][Kk]+/g'
//   var lightRe = '/[Ll][Ii][Gg][Hh][Tt]+/g'
//   var points = '/\d+/g'
//   var userArr = parseFindUser(strArr);

//   console.log(userArr);

// }


// // Refactor parseFindUser to check against a cached
// // array of all the users for whatever channel.

// var parseFindUser = function (arr) {

//   var userArr = arr.map(function(element) {
//     return User.findOne({where: {
//       user_name: element
//       }
//     })
//     .then(function (user) {
//       return user
//     })
//   })

//   return userArr;

// }


module.exports = router;
