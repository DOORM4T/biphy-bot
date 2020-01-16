const ytdl = require("ytdl-core");

// Stream audio from YouTube using YTDL
const play = async (message, audioPlayer, broadcast) => {
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
    if (audioPlayer.looping) {
      console.log("Looping");
      broadcast.end();
      play(msg, audioPlayer, broadcast);
    } else {
      audioPlayer.connection = null;
      audioPlayer.currentAudio = null;
      audioPlayer.audioUrl = null;
      audioPlayer.status = "Inactive";
    }
  });

  // Join Voice Channel of user who invoked the command
  message.member.voiceChannel
    .join()
    .then(async (connection) => {
      broadcast.end();
      if (!audioPlayer.voiceChannel)
        audioPlayer.voiceChannel = message.member.voiceChannel;
      if (!args[1]) return;

      const info = await ytdl.getInfo(args[1]);
      const { title, video_url } = info;
      stream = await ytdl(video_url, {
        filter: "audioonly",
      });
      audioPlayer.connection = connection;
      audioPlayer.currentAudio = title;
      audioPlayer.audioUrl = video_url;
      audioPlayer.status = "Active";

      if (!!message.delete) {
        await message.delete();
        await message.channel.send(
          `${message.author}\`\`\`Now Playing: ${title}\n${video_url}${
            audioPlayer.looping ? "\nLOOPING" : ""
          }\`\`\``,
        );
      }

      // Play Audio
      await broadcast.playStream(stream);
      const dispatcher = await connection.playBroadcast(broadcast);
      await dispatcher.setVolume(audioPlayer.volume);
      audioPlayer.dispatcher = dispatcher;
    })
    .catch(console.log);
};

module.exports = play;
