const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = new SlashCommandBuilder()
  .setName('pause')
  .setDescription('pause the music');
