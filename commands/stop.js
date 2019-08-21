const stop = async (message, audioPlayer, broadcast) => {
  try {
    if (!!message.delete) await message.delete();
  } catch (err) {
    console.log(err.message);
  } finally {
    await message.channel.send(
      `${message.author}\`\`\`Stopped Playing: ${
        audioPlayer.currentAudio
      }\`\`\``
    );
    audioPlayer.status = 'Inactive';
    audioPlayer.currentAudio = null;
    audioPlayer.audioUrl = null;
    audioPlayer.title = null;
    audioPlayer.looping = false;
    await broadcast.end();
  }
};

module.exports = stop;
