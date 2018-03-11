'use strict';

var config = require('../config.js');
var NEEDED_PARAMS = [
  "APP_PORT"
];


config.checkConfig(NEEDED_PARAMS);


var port    = global.APP_PORT,
    express = require('express'),
    app     = express(),
    http = require('http'),
    // io = require('socket.io'),
    LOGGER = require('./lib/logger');

var server = http.createServer(app);
// io = io(server);
app.use(function(req, res, next) {
  // req.io = io;
  // LOGGER.log('io', io);
  next();
});

// io.on('connection', require('./sockets/connection'));
// io.set('origins', '*:*');

//LOAD THE ROUTES
require('./routes/routes')(app, express);
//CONNECT THE DB AND LISTEN
require('./lib/mongodb')(function(){
  LOGGER.log('APP LISTENING AT PORT ' + port);
  server.listen(port);
});

module.exports = app;

