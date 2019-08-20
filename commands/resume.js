const resume = (message, audioPlayer, broadcast) => {
  if (!audioPlayer.currentAudio)
    return message.channel.send(
      '```CANT RESUME: No Audio Currently Playing.```'
    );

  message.delete();
  try {
    broadcast.resume();
    message.channel.send(`\`\`\`Resuming ${audioPlayer.currentAudio}\`\`\``);
    audioPlayer.status = 'Active';
  } catch (err) {
    console.log(err);
    message.channel.send(
      `\`\`\`Ran into an issue while trying to resume...\`\`\``
    );
  }
};

module.exports = resume;
