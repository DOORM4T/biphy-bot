const resume = async (message, audioPlayer, broadcast) => {
  if (!audioPlayer.currentAudio)
    return await message.channel.send(
      '```CANT RESUME: No Audio Currently Playing.```'
    );

  await message.delete();
  try {
    await broadcast.resume();
    await message.channel.send(
      `\`\`\`Resuming ${audioPlayer.currentAudio}\`\`\``
    );
    audioPlayer.status = 'Active';
  } catch (err) {
    console.log(err);
    await message.channel.send(
      `\`\`\`Ran into an issue while trying to resume...\`\`\``
    );
  }
};

module.exports = resume;
