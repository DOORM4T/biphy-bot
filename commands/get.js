const { prefix } = require('../config.json');

const get = (message, audioPlayer) => {
  try {
    // Delete user command & send info
    message.delete();
    message.channel.send(
      `\`\`\`\nSTATUS: ${audioPlayer.status}\nTITLE: ${
        audioPlayer.currentAudio ? audioPlayer.currentAudio : 'N/A'
      }\nURL: ${
        audioPlayer.audioUrl ? audioPlayer.audioUrl : 'N/A'
      }\nVOLUME:${audioPlayer.volume * 100}%\n\`\`\``
    );
  } catch (err) {
    console.log(`Couldn't get audio info...`);
  }
};

module.exports = get;
