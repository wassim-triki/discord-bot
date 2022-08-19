const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Play music')
  .addStringOption((option) =>
    option
      .setName('song')
      .setDescription('Name/URL of the song to play')
      .setRequired(false)
  );
