// TODO: Implement broadcast functions like stop, pause, and resume

const stop = (message, audioPlayer, broadcast) => {
  try {
    broadcast.end();
    audioPlayer.voiceChannel.leave();
    audioPlayer.status = 'Inactive';
    message.delete();
    message.channel.send(
      `${message.author}\`\`\`Stopped Playing: ${
        audioPlayer.currentAudio
      }\`\`\``
    );
  } catch (err) {
    console.log('Failed to leave.');
  }
};

module.exports = stop;
