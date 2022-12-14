'use strict';
require('dotenv').config();
const config = require('./src/config');
const client = require('./src/client');
const distube = require('./src/distube');
require('./src/controlls/play');
require('./src/controlls/pause');
require('./src/controlls/next');
require('./src/controlls/previous');
require('./src/controlls/queue');
const colors = require('colors/safe');
require('./src/rest')();
const createSongEmbed = require('./src/createSongEmbed');
const WELCOME_CHANNEL_ID = '1009745835908669501';
const GENERAL_CHANNEL_ID = '1010169328244633681';

client.distube = distube;
client.emotes = config.emotes;
client.distube.on('addSong', (queue, song) => {
  const songEmbed = createSongEmbed(song, queue);
  queue.textChannel.send({ embeds: [songEmbed] });
});

client.distube.on('playSong', async (queue, song) => {
  try {
    const songEmbed = createSongEmbed(song, queue);
    const message = await queue.textChannel.send({ embeds: [songEmbed] });
    await message.react(client.emotes.previous);
    await message.react(client.emotes.play);
    await message.react(client.emotes.next);
    await message.react(client.emotes.queue);
    // await message.react('🔇');
    // await message.react('🔉');
    // await message.react('🔊');
  } catch (err) {
    console.log(colors.red(err));
  }
});

client.on('interactionCreate', async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'pause') {
      client.distube.pause(interaction);
      await interaction.reply({
        content: `${client.emotes.neutral} | Music paused.`,
      });
    }
    if (interaction.commandName === 'resume') {
      client.distube.resume(interaction);
      await interaction.reply({
        content: `${client.emotes.neutral} | Music resuming.`,
      });
    }
    if (interaction.commandName === 'skip') {
      client.distube.skip(interaction);
      await interaction.reply({
        content: `${client.emotes.neutral} | Skipped track.`,
      });
    }
    if (interaction.commandName === 'prev') {
      client.distube.previous(interaction);
      await interaction.reply({
        content: `${client.emotes.neutral} | Previous track.`,
      });
    }
    if (interaction.commandName === 'queue') {
      const queue = client.distube.getQueue(interaction);
      await interaction.reply({
        content:
          '📃 Queue:\n' +
          queue.songs
            .map(
              (song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
            )
            .join('\n'),
      });
    }

    if (interaction.commandName === 'play') {
      if (!interaction.member.voice.channel) {
        return interaction.reply({
          content: `${client.emotes.warning} | lezm tkoun fi voice channel bech tasma3 music!`,
        });
      }
      const input = interaction.options._hoistedOptions[0]?.value || 'music';
      const voiceChannel = interaction.member.voice.channel;

      const result = await client.distube.search(input);
      if (!result)
        return interaction.reply({
          content: `${client.emotes.error} | ma 9itch "${input}"!`,
        });
      const song = result[0];
      client.distube
        .play(voiceChannel, song.url, {
          member: interaction.member,
          textChannel: interaction.channel,
        })
        .catch((err) => console.log(colors.red(err)));

      await interaction.reply({ content: 'la7dha bark 🧐 ' });
      return;
    }
  } catch (error) {
    await interaction.reply({
      content: `${client.emotes.error} | ${error.message}`,
    });

    return;
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
