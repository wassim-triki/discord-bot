const client = require('../client');

client.on('messageReactionAdd', (reaction, user) => {
  try {
    const action = reaction._emoji.name;
    const queue = client.distube.getQueue(reaction.message.guildId);
    if (!queue || (!queue.autoplay && queue.songs.length <= 1)) return;
    if (action === client.emotes.next && reaction.count > 1) {
      console.log('skipping');
      queue.skip(reaction.message.guildId);
    }
  } catch (error) {
    return reaction.textChannel.send(
      `${client.emotes.error} | ${error.message}`
    );
  }
});
