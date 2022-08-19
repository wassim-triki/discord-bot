const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const config = require('./config');
// const { YtDlpPlugin } = require('@distube/yt-dlp');

const spotifyOptions = { parallel: true, emitEventsAfterFetching: true };
if (config.spotify_api.enabled) {
  spotifyOptions.api = {
    clientId: config.spotify_api.clientId,
    clientSecret: config.spotify_api.clientSecret,
  };
}
const client = require('./client');
module.exports = new DisTube(client, {
  leaveOnStop: false,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  joinNewVoiceChannel: true,
  plugins: [new SpotifyPlugin(spotifyOptions), new SoundCloudPlugin()],
});
