'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const debug = require('debug')('assassintag:user');

const userSchema = Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: false},
  findHash: {type: String, required: false, unique: true}
});
