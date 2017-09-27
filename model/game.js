'use strict';

const debug = require('debug')('assassintag:game');
const createError = require('http-errors');

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const gameSchema = Schema({
  adminId: {type: Schema.Types.ObjectId, ref: 'player', required: true, unique: false},
  players: [{type: Schema.Types.ObjectId, ref: 'player', required: false, unique: false}], // List of player Ids
  alive: [{type: Schema.Types.ObjectId, ref: 'player', required: false, unique: false}], // List of Player Ids who are alive
  dead: [{type: Schema.Types.ObjectId, ref: 'player', required: false, unique: false}], // List of Player Ids who are dead
  rounds: {type: Number, required: false, unique: false},
  isStarted: {type: Boolean, default: false}
  contracts: [{type: Schema.Types.ObjectId, ref: 'contract', required: false, unique: false}], // List of all contracts associated with this game
});

module.exports = mongoose.model('game', gameSchema);


//TODO: gameSchema.methods.initializeRound()
  // -if (!game.started) game.started = true;
  // -use playerSchema.generateContract on each player in the 'players' array

  // players = shuffle(players)
  // while(players.length) {
  //   generateContract(players.shift(), players.shift())
  // }

  // -set curRoundEnd as either a timer, or a date that has a check (to see if ended)?
