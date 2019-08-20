// TODO: Implement broadcast functions like stop, pause, and resume

const leave = async (message, audioPlayer, broadcast) => {
  if (!audioPlayer.voiceChannel) {
    await message.delete();
    await message.channel.send("```I'm not currently in any Voice Channel!```");
  }

  try {
    require('./stop.js')(message, audioPlayer, broadcast);
    await audioPlayer.voiceChannel.leave();
    audioPlayer.voiceChannel = null;
  } catch (err) {
    console.log('Failed to leave.');
  }
};

module.exports = leave;
