const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('stop music');
