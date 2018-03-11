'use strict';

exports.readConfig = function() {
  var fs = require('fs');
  var config_path = null;
  for(var i = 0; i < process.argv.length; i++){
    if(process.argv[i].startsWith('--configPath=')){
            config_path = process.argv[i].split('=')[1];
            break;
    }
  }

  if(!config_path){
    console.log('Running requires a config path')
    process.exit(999);
  }
  var fd = fs.openSync(config_path, 'r');
  if(!fd){
    console.log('Cannot open config file');
    process.exit(999);
  }
  var config = JSON.parse(fs.readFileSync(fd, 'utf8'));

  // Close the opened config file
  fs.closeSync(fd);

  //loop  through config object and add to global
  for(var key in config) {
    if (config.hasOwnProperty(key)){
      global[key] = config[key];
    }
  }
  global.CONFIG_READ = true;
}

// Check if config options imported
exports.checkConfig = function(NEEDED_PARAMS) {
  //If you havent read config read, it now
  if (!global.hasOwnProperty(global.CONFIG_READ) || !global.CONFIG_READ) {
    module.exports.readConfig();
  }

  var paramsLength = NEEDED_PARAMS.length;
  for (var i = 0; i < paramsLength; i++) {
      var PARAM_KEY = NEEDED_PARAMS[i];
      if (!global.hasOwnProperty(PARAM_KEY) || !global[PARAM_KEY]){
        console.log('Config value ' + PARAM_KEY + ' is undefined');
        process.exit(999);
      }
  }
}


exports.isTrue = function(PARAM) {
  //If you havent read config read, it now
  if (!global.hasOwnProperty(global.CONFIG_READ) || !global.CONFIG_READ) {
    module.exports.readConfig();
  }

  if (global.hasOwnProperty(PARAM) && global[PARAM].toString().toLowerCase() === 'true' ) {
      return true;
  } else {
    return false;
  }
}






