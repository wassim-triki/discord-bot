'use strict';
require('dotenv').config();
const config = require('./config');
const player = require('./player');
const { REST, Routes } = require('discord.js');
const client = require('./client');
const ytdl = require('ytdl-core');
const {
  joinVoiceChannel,
  createAudioResource,
  createAudioPlayer,
  StreamType,
} = require('@discordjs/voice');

const SERVER_ID = '1009727529122267176';
const WELCOME_CHANNEL_ID = '1009745835908669501';
const GENERAL_CHANNEL_ID = '1009763648870301796';

client.player = player;

const commands = [
  {
    name: 'play',
    description: 'Play a song.',
    options: [
      {
        name: 'name',
        description: 'The name of the song',
        type: 3, //String
      },
    ],
  },
];
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

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'play') {
    const { _hoistedOptions: options } = interaction.options;
    const songName = options[0]?.value || null;
    let reply = 'Playing a random song 🎶... ';
    if (songName) {
      reply = `Playing "${songName}" 🎶...`;
    }
    await interaction.reply(reply);
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

// client.on('messageCreate', async (message) => {
//   const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
//   const command = args.shift();
//   const guildQueue = client.player.getQueue(message.guild.id);

//   if (command === 'play') {
//     let queue = client.player.createQueue(message.guild.id);
//     const channel = message.member.voice.channel;
//     if (!channel)
//       message.channel.send('a5tar voice channel bch tal3b mouzika.');
//     const connection = joinVoiceChannel({
//       channelId: channel.id,
//       guildId: message.guild.id,
//       adapterCreator: message.guild.voiceAdapterCreator,
//       selfDeaf: false,
//     });
//     const stream = ytdl(
//       'https://www.youtube.com/watch?v=KmVaSZS_SW4&ab_channel=PolyvinylRecords',
//       { filter: 'audioonly' }
//     );
//     const resource = createAudioResource(stream, {
//       inputType: StreamType.Arbitrary,
//     });
//     const audioPlayer = createAudioPlayer();
//     audioPlayer.play(resource);
//     connection.subscribe(audioPlayer);
//   }
// });

client.login(config.token);
