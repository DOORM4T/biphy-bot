const ytdl = require("ytdl-core");

// Stream audio from YouTube using YTDL
const play = async (message, audioPlayer, broadcast) => {
  await broadcast.end();

  // Stop invoker isn't a voice Channel
  if (!message.member.voiceChannel) {
    await message.delete();
    return await message.channel.send(
      `${message.author} You need to be in a Voice Channel to play audio!`,
    );
  }

  const args = message.content.split(" ");
  // !play <url> <loop>
  //  [0]   [1]    [2]

  // Looping?
  if (args[2]) audioPlayer.looping = true;
  const msg = { ...message }; // Copy message object for recursive play calls
  broadcast.once("end", () => {
    // console.log('Loop: ' + audioPlayer.looping);
    // If Looping
    if (audioPlayer.looping) {
      play(msg, audioPlayer, broadcast);
    }
  });

  // Clear broadcast to make room for a new one
  // await broadcast.end();

  // Join Voice Channel of user who invoked the command
  await message.member.voiceChannel
    .join()
    .then(async (connection) => {
      if (!audioPlayer.voiceChannel)
        audioPlayer.voiceChannel = message.member.voiceChannel;
      if (!args[1]) return;

      // Get Youtube Video Info

      let info;
      try {
        console.log(args[1]);
        info = await ytdl.getInfo(args[1]);
      } catch (err) {
        console.log(err);
        return;
      }
      const { title, video_url } = info;
      // Convert Video to Stream
      const stream = await ytdl(video_url, {
        filter: "audioonly",
      });

      // Clear & Send Message. Try catch message.delete because it might not persist through recursion
      try {
        if (!!message.delete) {
          await message.delete();
          await message.channel.send(
            `${message.author}\`\`\`Now Playing: ${title}\n${video_url}${
              audioPlayer.looping ? "\nLOOPING" : ""
            }\`\`\``,
          );
        }
      } catch (err) {
        console.log(err.message);
      }

      // Play Audio
      await broadcast.playStream(stream);
      dispatcher = await connection.playBroadcast(broadcast);
      await dispatcher.setVolume(audioPlayer.volume);

      // Set audioPlayer Information
      audioPlayer.connection = connection;
      audioPlayer.dispatcher = dispatcher;
      audioPlayer.currentAudio = title;
      audioPlayer.audioUrl = video_url;
      audioPlayer.status = "Active";
    })
    .catch(console.log);
};

module.exports = play;
