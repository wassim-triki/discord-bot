const { EmbedBuilder } = require('@discordjs/builders');

module.exports = (song, queue) => {
  const isPlaying = queue.songs[0] === song;
  // console.log('qSize:', queue.songs.length);
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
