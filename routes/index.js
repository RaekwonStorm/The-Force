'use strict'
var express = require('express');
var router = express.Router();
var request = require('request');
var helpers = require('../helpers');
var Promise = require('bluebird');
var db_calls = require('../database_calls');

// router.get('/',function(req,res){
//     //res.status(200).send();
//    return res.render("main");
// });

router.post('/', function (req, res) {

  // first query database for users and cache
  // then send the get request to slack to get the users
  // if any user isn't in the cached array, create one in the db and push to array.
  // then parse the req
  // then make points changes and send response.

  var token = req.body.token
  var parsedReq = helpers.parseReq(req.body.text);
  var updatedUser = parsedReq.user;
  var points = parsedReq.points;
  var alignment = parsedReq.alignment;

  if (updatedUser === req.body.user_name) {
    res.send("Yourself judge you cannot. Others only may see clearly your destiny.")
  } else {
    request.get('https://slack.com/api/users.list?token=' + token, function (error, response, body) {
      if (error) return console.error(error);
      var body = JSON.parse(body);

      body.members.forEach(function (user) {
        if (user.name === updatedUser) {
         return db_calls.findOrCreateUser(user, parsedReq.points)
        } else {
          return db_calls.findOrCreateUser(user, 0)
        }
      })

      // usersArr = body.members.map(function (user) {
      //   return {
      //     user_id: user.id,
      //     user_name: user.name,
      //     email: user.email,
      //     team_id: user.team_id
      //   }
      // })

    })

    if (!updatedUser) res.send('Process your request I could not. A @user must you choose, yes.');
    else if (!points) res.send('Process your request I could not. Points must you bestow upon ' + updatedUser + ', yes.');
    else if (!alignment) res.send('Process your request I could not. A side must you choose, yes.');
    else if (alignment === "dark") res.send('Powerful you have become, '+ updatedUser +', the dark side I sense in you.');
    else res.send('Always pass on what you have learned, '+ updatedUser +'. May the force be with you.');
  }


})

module.exports = router;


  // if (Boolean(points) === false) res.send('no points were awarded');
  // else if (!alignment) res.send('no alignment was given');

  // else {
  //   helpers.findOrCreateTeam(req.body.team_domain, req.body.team_id)
  //   .then(function (team) {
  //     helpers.findOrCreateUser(req.body.user_name, team.id, points)
  //   })
  //   .then(function () {
  //     res.send(req.body.user_name + " was awarded " + points + " " + alignment + " side points");
  //   })
  // }
