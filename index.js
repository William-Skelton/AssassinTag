'use strict';

require('dotenv').config();
require('./lib/server.js').start()
//chaining a promise here to ensure this runs after server toggle fires
