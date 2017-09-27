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

userSchema.methods.generatePasswordHash = function(password) {
  debug('generatePasswordHash');

  return new Promise( (resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

userSchema.methods.comparePasswordHash = function(password) {
  debug('comparePasswordHash');

  return new Promise( (resolve, reject) => {
    bcrypt.compare(password, this.password, (isValid) => {
      if(isValid) return resolve(this);
      reject(createError(400, 'Unauthorized, password does not match'))
    });
  });
};

userSchema.methods.generateFindHash = function() {
  debug('generateFindHash');

  return new Promise( (resolve, reject) => {
    let tries = 0;

    _generateFindHash.call(this);

    function _generateFindHash() {
      this.findHash = crypto.randomBytes(32).toString('hex');
      this.save()
      .then( () => resolve(this.findHash) )
      .catch( err => {
        if(tries > 3) return reject(err);
        tries++;
        _generateFindHash.call(this);
      });
    }
  });
}

userSchema.methods.generateToken = function() {
  debug('generateToken');

  return new Promise( (resolve, reject) => {
    this.generateFindHash()
    .then( findHash => resolve(jwt.sign({ token: findhash }, process.env.APP_SECRET )))
    .catch( err => reject(err));
  });
};
module.exports = mongoose.model('user', userSchema);
