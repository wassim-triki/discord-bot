const { REST, Routes } = require('discord.js');
const commands = require('./commands/commands');
const config = require('./config');
const rest = new REST({ version: '10' }).setToken(config.token);
module.exports = async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands,
    });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
};
