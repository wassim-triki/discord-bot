const { Player } = require('discord-music-player');
const client = require('./client');
const player = new Player(client, { leaveOnEmpty: false });
module.exports = player;
