const client = require('../client');

client.on('messageReactionRemove', (reaction, user) => {
  const action = reaction._emoji.name;
  const queue = client.distube.getQueue(reaction.message.guildId);
  if (action === client.emotes.play) {
    if (reaction.count % 2 != 0) queue.resume();
  }
});
