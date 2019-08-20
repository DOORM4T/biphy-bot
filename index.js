const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const path = require('path');

const client = new Discord.Client();
const broadcast = client.createVoiceBroadcast();

let audioPlayer = {
  connection: null,
  voiceChannel: null,
  volume: 0.2,
  dispatcher: null,
  currentAudio: null,
  audioUrl: null
};

client.once('ready', () => {
  console.log('Ready!');
});

client.once('reconnecting', () => {
  console.log('Reconnecting!');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});

client.on('message', async message => {
  // Stop if the message is from this bot and if the command has no prefix
  if (!message.author.bot && message.content.startsWith(prefix)) {
    if (
      message.content.startsWith(`${prefix}r `) ||
      message.content.startsWith(`${prefix}roll `)
    ) {
      require('./commands/roll.js')(message, audioPlayer);
    } else if (message.content.startsWith(`${prefix}play `)) {
      require('./commands/play.js')(message, audioPlayer, broadcast);
    } else if (message.content.startsWith(`${prefix}stop`)) {
      require('./commands/stop.js')(message, audioPlayer);
    } else if (
      message.content.startsWith(`${prefix}v `) ||
      message.content.startsWith(`${prefix}volume `)
    ) {
      require('./commands/volume.js')(message, audioPlayer);
    } else if (message.content.startsWith(`${prefix}leave`)) {
      message.delete();
      if (audioPlayer.voiceChannel) audioPlayer.voiceChannel.leave();
    } else if (message.content.startsWith(`${prefix}get`)) {
      require('./commands/get.js')(message, audioPlayer);
    } else if (
      message.content.startsWith(`${prefix}h `) ||
      message.content.startsWith(`${prefix}help `)
    ) {
    } else if (message.content.startsWith(`${prefix}afk`)) {
      require('./commands/afk.js')(message, audioPlayer);
    } else if (
      message.content.startsWith(`${prefix}h `) ||
      message.content.startsWith(`${prefix}help `)
    ) {
      require('./commands/help.js')(message);
    } else {
      require('./commands/help.js')(message);
    }
  }
});
client.login(token);
