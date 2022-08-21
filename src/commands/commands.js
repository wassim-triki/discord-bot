const playCommand = require('./play');
const pauseCommand = require('./pause');
const resumeCommand = require('./resume');
const skipCommand = require('./skip');
const prevCommand = require('./prev');
const queueCommand = require('./queue');
module.exports = [
  playCommand.toJSON(),
  pauseCommand.toJSON(),
  resumeCommand.toJSON(),
  skipCommand.toJSON(),
  prevCommand.toJSON(),
  queueCommand.toJSON(),
];
