const fs = require('fs');
const path = require('path');

// TODO: Add sounds to Dice Rolls
const playSound = (message, audioPlayer, broadcast) => {
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

  async function play(connection) {
    await broadcast.end();

    // Play Audio
    let num = 2;
    console.log(num);
    const audio = path.resolve(__dirname, `../audio/multiple/Multi_${num}.mp3`);
    await broadcast.playStream(fs.createReadStream(audio));
    const dispatcher = await connection.playBroadcast(broadcast);
  }
};

module.exports = playSound;
