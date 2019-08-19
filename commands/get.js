const { prefix } = require('../config.json');

const get = (message, audioPlayer) => {
  if (message.content.startsWith(`${prefix}get `)) {
    // !get <thing>
    // [0]    [1]
    // <thing>: "song/s", "volume/v", "url/u"
    const args = message.content.split(' ');
    let info;
    if (args[1] === 'title' || args[1] === 't') info = audioPlayer.currentAudio;
    else if (args[1] === 'volume' || args[1] === 'v')
      info = audioPlayer.volume * 100 + '%';
    else if (args[1] === 'url' || args[1] === 'u') info = audioPlayer.audioUrl;
    else if (args[1] === 'all' || args[1] === 'a') {
      info = `\nTITLE: ${audioPlayer.currentAudio}\nURL: ${
        audioPlayer.audioUrl
      }\nVOLUME:${audioPlayer.volume * 100}%\n`;
    }

    // If info is falsy/not helpful
    if (!info) {
      info = 'N/A';
    }

    switch (args[1]) {
      case 't':
        args[1] = 'title';
        break;
      case 'v':
        args[1] = 'volume';
        break;
      case 'u':
        args[1] = 'url';
        break;
      case 'all':
        args[1] = 'all info';
        break;
      case 'a':
        args[1] = 'all info';
        break;
    }

    // Delete user command & send info
    message.delete();
    message.channel.send(`\`\`\`${args[1].toUpperCase()}: ${info}\`\`\``);
  } else if (message.content === `${prefix}get`) {
    message.delete();
    message.channel.send(
      `${
        message.author
      }\`\`\`Here's the Audio Player info you can get: all, title, url, volume\`\`\``
    );
  }
};

module.exports = get;
