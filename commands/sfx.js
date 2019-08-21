const fs = require('fs');
const path = require('path');

// TODO: Add sounds to Dice Rolls
const playSound = async (message, audioPlayer, broadcast) => {
  // Stop if invoker isn't in a voice Channel
  if (!message.member.voiceChannel) {
    try {
      if (!!message.delete) await message.delete();
    } catch (err) {
      console.log(err.message);
    } finally {
      return await message.channel.send(
        `${message.author} You need to be in a Voice Channel to play audio!`
      );
    }
  }

  // Play audio in invoker's Voice Channel.
  await broadcast.end();
  await message.member.voiceChannel
    .join()
    .then(connection => {
      // console.log(audioPlayer);
      if (!audioPlayer.voiceChannel)
        audioPlayer.voiceChannel = message.member.voiceChannel;
      // Play Audio
      let num = 2;
      const audio = path.resolve(
        __dirname,
        `../audio/multiple/Multi_${num}.mp3`
      );
      broadcast.playFile(audio);
      const dispatcher = connection.playBroadcast(broadcast);
      audioPlayer.dispatcher = dispatcher;
      // Play next sounds in queue
      // broadcast.on('end', () => {
      //   console.log('ended');
      // });
    })
    .catch(err => {
      console.log(err.message);
    });
};

module.exports = playSound;
