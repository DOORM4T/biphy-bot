const ytdl = require('ytdl-core');
const path = require('path');
const fs = require('fs');

const play = async (message, audioPlayer, broadcast) => {
  const args = message.content.split(' ');
  // !play <url>
  //  [0]   [1]

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
      message.delete();
      message.channel.send(
        `${message.author}\`\`\`Now Playing: ${title}\n${video_url}\`\`\``
      );

      // Play Audio
      broadcast.playStream(stream);
      const dispatcher = connection.playBroadcast(broadcast);

      audioPlayer.connection = connection;
      audioPlayer.dispatcher = dispatcher;
      audioPlayer.voiceChannel = message.member.voiceChannel;
      audioPlayer.currentAudio = title;
      audioPlayer.audioUrl = video_url;
    })
    .catch(console.error);

  //   // !play <url>
  //   //  [0]   [1]
  //   const args = message.content.split(' ');
  //   // // Check if user is in a voice channel
  //   // const voiceChannel = message.member.voiceChannel;
  //   // // Stop if user isn't in a voice channel
  //   // if (!voiceChannel) {
  //   //   message.delete();
  //   //   return message.channel.send(
  //   //     `Hey ${message.author}, you need to be in a voice channel to play audio!`
  //   //   );
  //   // }
  //   // const permissions = voiceChannel.permissionsFor(message.client.user);
  //   // if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
  //   //   message.delete();
  //   //   return message.channel.send(
  //   //     `${
  //   //       message.author
  //   //     }, I need permissions to join and speak in your voice channel!`
  //   //   );
  //   // }
  //   // // WHEN ABLE TO JOIN THE VOICE CHANNEL
  //   // // Set global audioPlayer object connection property if it has no not been set
  //   // if (!audioPlayer.connection) {
  //   //   try {
  //   //     audioPlayer.connection = await voiceChannel.join();
  //   //   } catch (err) {
  //   //     console.log(err);
  //   //   }
  //   // }
  //   // // Play audio
  //   // const audio = await ytdl.getInfo(args[1]); // Get video url from ytdl
  //   // const { title, video_url } = audio;
  //   // // Set current audio name
  //   // audioPlayer.currentAudio = title;
  //   // // Set current audio url
  //   // audioPlayer.audioUrl = video_url;
  //   // // Set audioPlayer
  //   // audioPlayer.voiceChannel = voiceChannel;
  //   // // Delete user command
  //   // message.delete();
  //   // // Send message
  //   // message.channel.send(
  //   //   `${message.author} \`\`\`Now playing ${title} \n(${video_url})\`\`\``
  //   // );
  //   // playAudio();
  //   // function playAudio() {
  //   //   // Set global audioPlayer object dispatcher property for use in other commands like !volume and !stop
  //   //   audioPlayer.dispatcher = audioPlayer.connection
  //   //     .playStream(ytdl(video_url))
  //   //     .on('end', () => {
  //   //       resetPlayer('Ended.');
  //   //     })
  //   //     .on('error', err => {
  //   //       resetPlayer(err.message);
  //   //     });
  //   //   audioPlayer.dispatcher.setVolume(audioPlayer.volume);
  //   // }
  //   // /** Resets audioPlayer fields related to the played audio
  //   //  * @param info Text logged when audioPlayer is reset
  //   //  *
  //   //  */
  //   // function resetPlayer(info) {
  //   //   console.log(info);
  //   //   audioPlayer.connection = null;
  //   //   audioPlayer.dispatcher = null;
  //   //   audioPlayer.currentAudio = null;
  //   //   audioPlayer.audioUrl = null;
  //   // }
};

module.exports = play;
