const { colors } = require('colors');
const client = require('../client');

client.on('messageReactionAdd', (reaction, user) => {
  try {
    const action = reaction._emoji.name;
    const queue = client.distube.getQueue(reaction.message);

    if (action === client.emotes.previous && reaction.count > 1) {
      if (queue.previousSongs.length > 0) {
        queue.previous(reaction.message);
      }
    }
  } catch (error) {
    return reaction.message.channel.send(
      `${client.emotes.error} | ${error.message}`
    );
  }
});
client.on('messageReactionRemove', (reaction, user) => {
  try {
    const action = reaction._emoji.name;
    const queue = client.distube.getQueue(reaction.message);

    if (action === client.emotes.previous) {
      if (queue.previousSongs.length > 0) {
        queue.previous(reaction.message);
      }
    }
  } catch (error) {
    return reaction.message.channel.send(
      `${client.emotes.error} | ${error.message}`
    );
  }
});
