const stop = async (message, audioPlayer, broadcast) => {
  await broadcast.end();
  try {
    if (!!message.delete) await message.delete();
  } catch (err) {
    console.log(err.message);
  }
  await message.channel.send(
    `${message.author}\`\`\`Stopped Playing: ${audioPlayer.currentAudio}\`\`\``
  );
  audioPlayer.status = 'Inactive';
  audioPlayer.currentAudio = null;
  audioPlayer.audioUrl = null;
  audioPlayer.title = null;
  audioPlayer.loop = false;
};

module.exports = stop;
