const stop = async (message, audioPlayer, broadcast) => {
  try {
    await message.delete();
    if (message.delete && audioPlayer.currentAudio) {
      await message.channel.send(
        `${message.author}\`\`\`Stopped Playing: ${
          audioPlayer.currentAudio
        }\`\`\``
      );
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    audioPlayer.status = 'Inactive';
    audioPlayer.currentAudio = null;
    audioPlayer.audioUrl = null;
    audioPlayer.title = null;
    audioPlayer.looping = false;
    await broadcast.end();
  }
};

module.exports = stop;
