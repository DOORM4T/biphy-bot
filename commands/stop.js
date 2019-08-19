const { prefix } = require('../config.json');

const stop = (message, audioPlayer) => {
  if (message.content.startsWith(`${prefix}stop`)) {
    try {
      // Delete user command
      message.delete();

      // Send success message
      message.channel.send(
        `${message.author}\`\`\`Stopped Playing: ${
          audioPlayer.currentAudio
        }\`\`\``
      );
      // Stop audio
      audioPlayer.dispatcher.end();
    } catch (err) {
      console.log(err.message);
    }
  }
};

module.exports = stop;
