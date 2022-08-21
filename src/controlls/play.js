const client = require('../client');

client.on('messageReactionRemove', (reaction, user) => {
  const action = reaction._emoji.name;
  const queue = client.distube.getQueue(reaction.message);
  if (queue) {
    if (action === client.emotes.play) {
      if (reaction.count % 2 != 0) {
        queue.resume(reaction.message);
        // reaction.message.channel.send('Resumed!');
      } else {
        queue.pause(reaction.message);
        // reaction.message.channel.send('Paused!');
      }
    }
  }
});
