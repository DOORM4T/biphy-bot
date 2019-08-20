const pause = async (message, audioPlayer, broadcast) => {
  if (!audioPlayer.currentAudio)
    return await message.channel.send(
      '```CANT PAUSE: No Audio Currently Playing.```'
    );

  await message.delete();
  try {
    await broadcast.pause();
    await message.channel.send(
      `\`\`\`Paused ${audioPlayer.currentAudio}\`\`\``
    );
    audioPlayer.status = 'Paused';
  } catch (err) {
    console.log(err);
    await message.channel.send(
      `\`\`\`Ran into an issue while trying to pause...\`\`\``
    );
  }
};

module.exports = pause;
