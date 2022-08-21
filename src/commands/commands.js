const playCommand = require('./play');
const pauseCommand = require('./pause');
module.exports = [playCommand.toJSON(), pauseCommand.toJSON()];
