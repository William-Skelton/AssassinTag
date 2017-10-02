'use strict';

const debug = require('debug')('assassintag:contract');
const createError = require('http-errors');

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const contractSchema = Schema({
  associatedGameId: {type: Schema.Types.ObjectId, required: true, unique: true}
  assignedTo: {type: Schema.Types.ObjectId, required: true, unique: false},
  target: {type: Schema.Types.ObjectId, required: true, unique: false},
  isComplete: {type: Boolean, required: true, default: false},
  dateAssigned: {type: String, required: true, unique: false},
  dateCompleted: {type: String, required: true, unique: false}
});



//In our contract route, we'll save a new contract.
contractSchema.methods.designateContract = (assassinId, targetId, gameId) => {
  return new Promise((resolve, reject) => {
    if(!assassinId || !targetId || !gameId) {
      reject(new Error('Missing assassinId, targetId, or gameId'))
    }
    this.assignedTo = assassinId;
    this.target = targetId
    this.dateAssigned = JSON.stringify(new Date())
    this.associatedGameId = gameId;
    resolve(this);
  })
}

module.exports = mongoose.model('contract', contractSchema);
