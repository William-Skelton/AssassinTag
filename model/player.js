'use strict';

const debug = require('debug')('assassintag:player');
const createError = require('http-errors');

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const playerSchema = Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'user', required: true, unique: true},
  hosting: [{type: Schema.Types.ObjectId, ref: 'game', required: false, unique: false}], // Games where player is host
  attending: [{type: Schema.Types.ObjectId, ref: 'game', required: false, unique: false}], // Games where player is not
  profilePic: {type: String, required: false, unique: false},
  contracts: [{type: Schema.Types.ObjectId, ref: 'contract', required: false, unique: true}], // List of all contracts assigned to player
  achievements: {type: Object, required: true, unique: false}
});

module.exports = mongoose.model('player', playerSchema);


//TODO: playerSchema.methods.joinGame(gameId)
  // -fetch game with id
  // -if (game.started) if not, reject
  // -send a req for join to moderator


//TODO: playerSchema.methods.leaveGame(gameId)
  // -fetch game with id,
  // -if (game.started) handle differently, auto killed.
  // -filter out player by id (this._id)
  // -save()

//TODO: playerSchema.methods.approvePlayer(gameId)
  // -fetch game with id and return adminId
  // -if (game.started) return null
  // -check that adminId === this._id
  // -upon approve, add playerId to game.players array
