const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = new SlashCommandBuilder()
  .setName('prev')
  .setDescription('previous track');
