const fs = require('fs');
const path = require('path');
const { prefix } = require('../config.json');

/**
 *
 * @param {*} message
 * @param {*} audioPlayer
 * @param {*} broadcast
 */
const playSound = async (message, audioPlayer, broadcast) => {
  await broadcast.end();

  let sound;
  if (message.content.startsWith(`${prefix}r `)) sound = 'dice';
  else sound = message.content.split(' ')[1];
  console.log(sound);
  // Assign array of local sounds to audioPlayer currentSounds property
  if (audioPlayer.currentSoundEffect !== sound) {
    audioPlayer.currentSoundEffect = sound;
    audioPlayer.currentSounds = getSounds(sound);
  }

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
        Math.random() * audioPlayer.currentSounds.length
      );
      // console.log(randomIndex);
      const audio = audioPlayer.currentSounds[randomIndex];

      console.log(audio);
      broadcast.playFile(audio);
      const dispatcher = connection.playBroadcast(broadcast);
      audioPlayer.dispatcher = dispatcher;
    })
    .catch(err => {
      console.log(err.message);
    });
};

module.exports = playSound;

function getSounds(sound) {
  let currentSounds = [];
  try {
    fs.readdirSync(path.resolve(__dirname, `../audio/${sound}`)).forEach(
      file => {
        currentSounds.push(
          path.resolve(__dirname, `../audio/${sound}/${file}`)
        );
      }
    );
  } catch (err) {
    console.log("Sound doesn't exists");
  } finally {
    console.log(currentSounds);
    return currentSounds;
  }
}
