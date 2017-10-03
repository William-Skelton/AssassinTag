'use strict';

const Game = require('../model/game.js');
const User = require('../model/user.js')

const Express = require('express');
const gameRouter = module.exports = new Express.Router();

const jsonParser = require('body-parser').json();
const debug = require('debug')('assassintag:game-routes');

gameRouter.post( '/api/game', jsonParser, (req, res, next) => {
  debug('POST: /api/game');

  let testUser = new User({
    username: 'steve',
    password: '420blaze'
  });

  testUser.generatePasswordHash(testUser.password)
  .then( user => user.save() )
  .then( user => {
    testUser = user;
    console.log(testUser);
  });



  let game = new Game(req.body);
  game.adminId = testUser._id;

  game.save()
  .then( game => res.json(game) )
  .catch(next);
});
