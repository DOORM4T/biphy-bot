const fs = require('fs');
const path = require('path');

// TODO: Add sounds to Dice Rolls

const playSound = (message, audioPlayer) => {
  console.log(audioPlayer);
  if (audioPlayer.voiceChannel) {
    // Convert local audio to read stream

    const stream = fs.createReadStream(
      path.join(__dirname, '../audio/multiple/Multi_3.mp3')
    );
    console.log(stream);

    stream.on('error', err => {
      console.log(err.message);
    });

    audioPlayer.connection.playStream(stream);
  }
};

module.exports = playSound;
