'use strict';

const debug = require('debug')('assassintag:game');
const createError = require('http-errors');

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const Contract = require('./contract');

const gameSchema = Schema({
  adminId: {type: Schema.Types.ObjectId, ref: 'player', required: true, unique: false},
  players: [{type: Schema.Types.ObjectId, ref: 'player', required: false, unique: false}], // List of player Ids
  alive: [{type: Schema.Types.ObjectId, ref: 'player', required: false, unique: false}], // List of Player Ids who are alive
  dead: [{type: Schema.Types.ObjectId, ref: 'player', required: false, unique: false}], // List of Player Ids who are dead
  rounds: {type: Number, required: false, default: 0},
  inProgress: {type: Boolean, default: false},
  contracts: [{type: Schema.Types.ObjectId, ref: 'contract', required: false, unique: false}] // List of all contracts associated with this game
});


//PUT method for our game-routes
gameSchema.methods.initializeRound = () => {
  if (!this.inProgress) {
    this.inProgress = true;
    this.rounds++
  }

  this.players = shuffle(this.players)
  for (var i = 0; i < this.players.length; i++) {
    if(i === this.players.length) {
      Contract.generateContract(this.players[i], this.players[0], this._id)
      .then( contract => contract.save())
      .catch(err => createError(400, 'contract could not be generated'));
      break;
    }
    Contract.generateContract(this.players[i], this.players[i+1], this._id)
    .then( contract => contract.save())
    .catch(err => createError(400, 'contract could not be generated'));
  }
}

// -set curRoundEnd as either a timer, or a date that has a check (to see if ended)?
module.exports = Mongoose.model('game', gameSchema);
