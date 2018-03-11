'use strict';

const fs = require('fs');
const Console = require('console').Console;

for(var i = 0; i < process.argv.length; i++){
    if(process.argv[i].startsWith('--debug')){
        global.DEBUG_SYSTEM = true;
    }
}

var stdErr = null;
var stdOut = null;
// Initialize error output location
if(global.DEBUG_SYSTEM || !global.STDERR_LOG){
  stdErr = process.stderr ;
} else {
  //Append to stderr log file
  stdErr = fs.createWriteStream(global.STDERR_LOG, {flags: 'a+'});
  process.on('exit', (code) => {
    stdErr.end();
  });
}

// Initialize stdout location
if(global.DEBUG_SYSTEM || !global.STDOUT_LOG){
  stdOut = process.stdout ;
} else {
  // Append to stdout log file
  stdOut = fs.createWriteStream(global.STDOUT_LOG, {flags: 'a+'});
  process.on('exit', (code) => {
    stdOut.end();
  });
}

//Get caller of function
function getCaller() {
  var stack = getStack();

  // Remove superfluous function calls on stack
  stack.shift(); // getCaller --> getStack
  stack.shift(); // omfg --> getCaller

  // Return caller's caller
  return stack[0];
}


//Get stack
function getStack() {
  // Save original Error.prepareStackTrace
  var origPrepareStackTrace = Error.prepareStackTrace;

  // Override with function that just returns `stack`
  Error.prepareStackTrace = function (_, stack) {
    return stack;
  };

  // Create a new `Error`, which automatically gets `stack`
  var err = new Error();

  // Evaluate `err.stack`, which calls our new `Error.prepareStackTrace`
  var stack = err.stack;

  // Restore original `Error.prepareStackTrace`
  Error.prepareStackTrace = origPrepareStackTrace;

  // Remove superfluous function call on stack
  stack.shift(); // getStack --> Error

  return stack;
}



const Logger = new Console(stdOut, stdErr);

exports.error = function(error) {
  var caller = getCaller();

  var logBlock = "[" + new Date() + "]--[" + caller.getFileName() + ":" + caller.getLineNumber() + "]--: "+ error;
  Logger.error(logBlock);
};

exports.log = function(error) {

  var caller = getCaller();
  var logBlock = "[" + new Date() + "]--[" + caller.getFileName() + ":" + caller.getLineNumber() + "]--: " + error;
  Logger.log(logBlock);
};

