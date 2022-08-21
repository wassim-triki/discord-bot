const client = require('../client');

client.on('messageReactionAdd', async (reaction, user) => {
  try {
    const action = reaction._emoji.name;
    const queue = client.distube.getQueue(reaction.message);

    if (action === client.emotes.queue && reaction.count > 1) {
      reaction.message.channel.send(
        '📃 Queue:\n' +
          queue.songs
            .map(
              (song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
            )
            .join('\n')
      );
    }
  } catch (error) {
    reaction.textChannel.send(`${client.emotes.error} | ${error.message}`);
    return;
  }
});
client.on('messageReactionRemove', async (reaction, user) => {
  try {
    const action = reaction._emoji.name;
    const queue = client.distube.getQueue(reaction.message);

    if (action === client.emotes.queue) {
      reaction.message.channel.send(
        '📃 Queue:\n' +
          queue.songs
            .map(
              (song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
            )
            .join('\n')
      );
    }
  } catch (error) {
    reaction.textChannel.send(`${client.emotes.error} | ${error.message}`);
    return;
  }
});
