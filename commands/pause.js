const pause = (message, audioPlayer, broadcast) => {
  if (!audioPlayer.currentAudio)
    return message.channel.send(
      '```CANT PAUSE: No Audio Currently Playing.```'
    );

  message.delete();
  try {
    broadcast.pause();
    message.channel.send(`\`\`\`Paused ${audioPlayer.currentAudio}\`\`\``);
    audioPlayer.status = 'Paused';
  } catch (err) {
    console.log(err);
    message.channel.send(
      `\`\`\`Ran into an issue while trying to pause...\`\`\``
    );
  }
};

module.exports = pause;
