const playCommand = require('./play');
const stopCommand = require('./stop');
module.exports = [playCommand.toJSON(), stopCommand.toJSON()];
