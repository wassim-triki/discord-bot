const client = require('../client');

client.on('messageReactionAdd', (reaction, user) => {
  const action = reaction._emoji.name;
  const queue = client.distube.getQueue(reaction.message);

  if (queue) {
    if (action === client.emotes.play) {
      if (reaction.count % 2 === 0) {
        queue.pause(reaction.message);
        // reaction.message.channel.send('Paused!');
      } else {
        if (!queue.playing) {
          queue.resume(reaction.message);
          // reaction.message.channel.send('Resumed!');
        }
      }
    }
  }
  console.log(queue.playing);
});
