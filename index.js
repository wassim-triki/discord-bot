'use strict';
require('dotenv').config();
const config = require('./src/config');
const client = require('./src/client');
const distube = require('./src/distube');
const commands = require('./src/commands/commands');
const colors = require('colors/safe');
const { REST, Routes, EmbedBuilder } = require('discord.js');
const SERVER_ID = '1009727529122267176';
const WELCOME_CHANNEL_ID = '1009745835908669501';
const GENERAL_CHANNEL_ID = '1009763648870301796';

client.distube = distube;
client.emotes = config.emotes;
const rest = new REST({ version: '10' }).setToken(config.token);
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands,
    });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
const createSongEmbed = (song, queue) => {
  const isPlaying = queue.songs[0] === song;
  console.log('qSize:', queue.songs.length);
  return new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(song.name)
    .setAuthor({
      name: isPlaying ? '🎵 Playing 🎵' : '➕ Added to queue',
    })
    .setURL(song.url)
    .addFields({ name: 'Duration', value: song.formattedDuration })
    .setImage(song.thumbnail)
    .setFooter({
      text: `Requested by ${song.user.username}`,
      iconURL: song.user.avatarURL(),
    })
    .setTimestamp();
};
client.distube.on('addSong', (queue, song) => {
  const songEmbed = createSongEmbed(song, queue);
  queue.textChannel.send({ embeds: [songEmbed] });
});

client.distube.on('playSong', (queue, song) => {
  const songEmbed = createSongEmbed(song, queue);
  queue.textChannel.send({ embeds: [songEmbed] });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'play') {
    if (!interaction.member.voice.channel) {
      await interaction.reply(
        `${client.emotes.error} | You must be in a voice channel!`
      );
    }
    const input = interaction.options._hoistedOptions[0].value || '';
    const voiceChannel = interaction.member.voice.channel;
    const result = await client.distube.search(input);
    if (!result) {
      console.log(colors.red('No result found.'));
    }
    const song = result[0];
    console.log('🎵' + song.name + '🎵');
    client.distube
      .play(voiceChannel, song.url || '', {
        member: interaction.member,
        textChannel: interaction.channel,
      })
      .catch((err) => console.log(colors.red(err)));
  }
});

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', (member) => {
  const welcomeChannel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!welcomeChannel) return;
  const role = member.guild.roles.cache.find((role) => role.name === 'Peasant');
  if (role) member.roles.add(role);
  const { user } = member;
  welcomeChannel.send(`3aslema <@${user.id}> 🙌 ! Ahla bik fel **Denya**.`);
});

client.on('guildMemberRemove', (member) => {
  const generalChannel = member.guild.channels.cache.get(GENERAL_CHANNEL_ID);

  if (!generalChannel) return;
  const { user } = member;
  generalChannel.send(`<@${user.id}> **5raj**/**tza3ak** 🤡 mel *Denya*.`);
});

client.login(config.token);
