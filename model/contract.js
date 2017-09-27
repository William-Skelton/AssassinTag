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

module.exports = mongoose.model('contract', contractSchema);



//TODO: contractSchema.methods.generateContract(assassinId, targetId)
