const stop = (message, audioPlayer) => {
  try {
    // Delete user command
    message.delete();

    // Send success message
    message.channel.send(
      `${message.author}\`\`\`Stopped Playing: ${
        audioPlayer.currentAudio
      }\`\`\``
    );
    // Stop audio
    audioPlayer.dispatcher.end();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = stop;
