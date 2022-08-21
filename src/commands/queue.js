const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = new SlashCommandBuilder()
  .setName('queue')
  .setDescription('check queue');
