'use strict';

var MongoClient = require('mongodb').MongoClient;
var f = require('util').format;
var LOGGER = require('./logger.js');

var config = require('../../config.js');
var NEEDED_PARAMS = [
  "MONGODB_USER",
  "MONGODB_USER_PWD",
  "MONGODB_DB_NAME",
  "MONGODB_URL"
];

config.checkConfig(NEEDED_PARAMS);

module.exports = function(cb){
  var url = f('mongodb://' + global.MONGODB_URL + '/' + global.MONGODB_DB_NAME);
  // var url = f('mongodb://' + global.MONGODB_USER + ':' + global.MONGODB_USER_PWD + '@' + global.MONGODB_URL + '/' + global.MONGODB_DB_NAME);    
  MongoClient.connect(url, function(err, client){
    global.mongodb = client.db(global.MONGODB_DB_NAME)
	   if(global.mongodb){
  		LOGGER.log('connected to database ' + global.MONGODB_DB_NAME);
    	cb();
    } else {
    	LOGGER.error('failed to connect to database ' + global.MONGODB_DB_NAME);
    	process.exit(999);
    }
  });
};
