const fs = require('fs');
const path = require('path');

// TODO: Add sounds to Dice Rolls
const playSound = (message, audioPlayer, broadcast) => {
  // Stop invoker isn't a voice Channel
  if (!message.member.voiceChannel) {
    message.delete();
    message.channel.send(
      `${message.author} You need to be in a Voice Channel to play audio!`
    );
    return;
  }

  // Play audio in current Voice Channel. Assigns a new Voice Channel to audioPlayer if there isn't one.
  if (audioPlayer.voiceChannel) {
    audioPlayer.voiceChannel
      .join()
      .then(connection => {
        play(connection);
      })
      .catch(err => {
        console.log(err.message);
      });
  } else {
    message.member.voiceChannel
      .join()
      .then(connection => {
        play(connection);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  /**
   * Play sounds
   * @param connection Voice Channel Connection object
   */
  async function play(connection) {
    await broadcast.end();

    // Play Audio
    let num = 2;
    const audio = path.resolve(__dirname, `../audio/multiple/Multi_${num}.mp3`);
    await broadcast.playFile(audio);
    const dispatcher = await connection.playBroadcast(broadcast);
  }
};

module.exports = playSound;
