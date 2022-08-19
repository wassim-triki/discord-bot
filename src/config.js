module.exports = {
  token: process.env.DISCORD_BOT_TOKEN,
  spotify_api: {
    enabled: false,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  },
  emotes: {
    play: '⏯',
    stop: '⏯',
    success: '✅',
    repeat: '🔁',
    error: '❌',
  },
};
