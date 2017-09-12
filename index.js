'use strict';

const mysql = require('mysql');
require('dotenv').config();
require('./lib/server.js').start()
//chaining a promise here to ensure this runs after server toggle fires
.then( () => {
  const connection = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    localAddress: `https://localhost:${process.env.PORT}`
  })

  connection.connect( err => {
    if(err) console.log('error:', err)
    console.log('connected as id:', connection.threadId)

  })
  connection.query('CREATE TABLE IF NOT EXISTS test
  (
    test_column INT
  )', (err, res, fields) => {
    if(err) throw err;
    console.log(res);
  })
  connection.end();
})
