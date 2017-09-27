'use strict';

const mongoose = require('mongoose');

const express = require('express');

const app = express();

const server = module.exports = {};

mongoose.connect(process.env.MONGODB_URI)
.then( () => {
  console.log('we in this server');
})
.catch( () => {
  console.log('nope');
})

server.isOn = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log(`App served on port: ${process.env.PORT}`);
        resolve();
      })
      return;
    }
    reject(new Error('Server is already running!'))
  })
}

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn && server.http) {
      return server.http.close( () => {
        server.isOn = false;
        resolve();
      })
    }
    reject(new Error('Server is already off!'))
  })
};
