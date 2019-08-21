const fs = require('fs');
const path = require('path');

const playSound = async (message, audioPlayer, broadcast) => {
  // Assign array of local sounds to audioPlayer localSounds property
  if (audioPlayer.localSounds.length === 0)
    audioPlayer.localSounds = getSounds('dice');

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
  await message.member.voiceChannel
    .join()
    .then(connection => {
      broadcast.end();
      if (!audioPlayer.voiceChannel)
        audioPlayer.voiceChannel = message.member.voiceChannel;

      // Play Audio
      const randomIndex = Math.floor(
        Math.random() * audioPlayer.localSounds.length
      );
      console.log(randomIndex);
      const audio = path.resolve(
        __dirname,
        `../audio/${audioPlayer.localSounds[randomIndex]}`
      );
      broadcast.playFile(audio);
      const dispatcher = connection.playBroadcast(broadcast);
      audioPlayer.dispatcher = dispatcher;
    })
    .catch(err => {
      console.log(err.message);
    });
};

module.exports = playSound;

function getSounds(base) {
  let defaultSounds = [];
  fs.readdirSync(path.resolve(__dirname, `../audio/${base}`)).forEach(
    folder => {
      defaultSounds = [
        ...defaultSounds,
        ...fs
          .readdirSync(path.resolve(__dirname, `../audio/${base}/${folder}`))
          .map(file => `${base}/${folder}/${file}`)
      ];
    }
  );

  console.log(defaultSounds);
  return defaultSounds;
}
