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
