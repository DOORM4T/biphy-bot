const ytdl = require('ytdl-core');

// Stream audio from YouTube using YTDL
const play = async (message, audioPlayer, broadcast) => {
  // Stop invoker isn't a voice Channel
  if (!message.member.voiceChannel) {
    message.delete();
    message.channel.send(
      `${message.author} You need to be in a Voice Channel to play audio!`
    );
    return;
  }

  const args = message.content.split(' ');
  // !play <url> <loop>
  //  [0]   [1]    [2]

  // Looping?
  if (args[2]) audioPlayer.looping = true;
  const msg = { ...message }; // Copy message object for recursive play calls
  broadcast.once('end', () => {
    // console.log('Loop: ' + audioPlayer.looping);
    // If Looping
    if (audioPlayer.looping) {
      play(msg, audioPlayer, broadcast);
    }
  });

  // Clear broadcast to make room for a new one
  await broadcast.end();

  // Join Voice Channel of user who invoked the command
  message.member.voiceChannel
    .join()
    .then(async connection => {
      // Get Youtube Video Info
      const info = await ytdl.getInfo(args[1]);
      const { title, video_url } = info;

      // Convert Video to Stream
      const stream = await ytdl(video_url, {
        filter: 'audioonly'
      });

      // Clear & Send Message
      if (message.delete) {
        message.delete();
        message.channel.send(
          `${message.author}\`\`\`Now Playing: ${title}\n${video_url}\`\`\``
        );
      }

      // Play Audio
      broadcast.playStream(stream);
      const dispatcher = connection.playBroadcast(broadcast);

      // Set audioPlayer Information
      audioPlayer.connection = connection;
      audioPlayer.dispatcher = dispatcher;
      audioPlayer.voiceChannel = message.member.voiceChannel;
      console.log(audioPlayer.voiceChannel);
      audioPlayer.currentAudio = title;
      audioPlayer.audioUrl = video_url;
      audioPlayer.status = 'Active';
    })
    .catch(console.log);
};

module.exports = play;
