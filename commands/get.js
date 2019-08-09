const { prefix } = require('../config.json');

const get = (message, audioPlayer) => {
  if (message.content.startsWith(`${prefix}get `)) {
    // !get <thing>
    // [0]    [1]
    // <thing>: "song/s", "volume/v", "url/u"
    const args = message.content.split(' ');
    let info;
    if (args[1] === 'song' || args[1] === 's') info = audioPlayer.currentAudio;
    else if (args[1] === 'volume' || args[1] === 'v')
      info = audioPlayer.volume * 100 + '%';
    else if (args[1] === 'url' || args[1] === 'u') info = audioPlayer.audioUrl;

    // If info is falsy/not helpful
    if (!info) {
      info = 'N/A';
    }

    switch (args[1]) {
      case 's':
        args[1] = 'song';
        break;
      case 'v':
        args[1] = 'volume';
        break;
      case 'u':
        args[1] = 'url';
        break;
    }

    // Delete user command & send info
    message.delete();
    message.channel.send(`\`\`\`${args[1].toUpperCase()}: ${info}\`\`\``);
  } else if (message.content === `${prefix}get`) {
    message.delete();
    message.channel.send(
      `\`\`\`Here's the Audio Player info you can get: song, volume, url\`\`\``
    );
  }
};

module.exports = get;
