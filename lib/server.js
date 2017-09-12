const express = require('express');

const app = express();

const server = module.exports = {};

server.isOn = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log(`App served on port: ${PORT}`);
        resolve();
      })
      return;
    }
    reject(new Error('Server is already running!'))
  })
}

server.stop = () => {
  
}
