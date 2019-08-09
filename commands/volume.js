const { prefix } = require('../config.json');

/**
 * Sets volume to the level specified
 * @param {*} message User message that was intended to be a command for Biphy.
 * @param {*} audioPlayer Object with properties such as connection and dispatcher.
 */
const volume = (message, audioPlayer) => {
  if (
    message.content.startsWith(`${prefix}volume`) ||
    message.content.startsWith(`${prefix}v`)
  ) {
    // !v <level>
    // [0]  [1]
    const args = message.content.split(' ');

    // If user is getting current volume

    let level = +args[1];
    // Prevent unreasonable sound levels
    if (level > 1.5) {
      level = 1.5;
    } else if (level < 0.01) {
      level = 0.01;
    }

    try {
      audioPlayer.dispatcher.setVolume(level); // Set the currently streaming audio volume
      audioPlayer.volume = level; // Set audioPlayer volume for the "get" function
      message.delete(); // Delete user command
      message.channel.send(`\`\`\`Set volume to ${level * 100}%\`\`\``);
    } catch (err) {
      message.delete();
      message.channel.send(
        `\`\`\`I had a problem setting your volume. Is there audio playing right now?\`\`\``
      );
      console.log('Couldnt set new volume...');
    }
  }
};

module.exports = volume;
