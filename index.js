const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const path = require('path');

const client = new Discord.Client();
const broadcast = client.createVoiceBroadcast();

let audioPlayer = {
  audioUrl: null,
  broadcast,
  connection: null,
  currentAudio: null,
  dispatcher: null,
  voiceChannel: null,
  volume: 0.2
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
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  // Determine invoked command
  const args = message.content.split(' ');
  console.log(args);
  console.log(args[0]);
  switch (args[0]) {
    // DICE ROLLER
    case `${prefix}r`:
      require('./commands/roll.js')(message, audioPlayer);
      break;
    case `${prefix}roll`:
      require('./commands/roll.js')(message, audioPlayer);
      break;

    // PLAY AUDIO
    case `${prefix}play`:
      require('./commands/play.js')(message, audioPlayer, broadcast);
      break;

    // STOP AUDIO
    case `${prefix}stop`:
      require('./commands/stop.js')(message, audioPlayer);
      break;

    // CHANGE VOLUME
    case `${prefix}volume`:
      require('./commands/volume.js')(message, audioPlayer);
      break;
    case `${prefix}v`:
      require('./commands/volume.js')(message, audioPlayer);
      break;

    // LEAVE VOICE CHANNEL
    case `${prefix}leave`:
      message.delete();
      if (audioPlayer.voiceChannel) audioPlayer.voiceChannel.leave();
      break;

    // GET CURRENT AUDIO INFORMATION
    case `${prefix}get`:
      require('./commands/get.js')(message, audioPlayer);
      break;

    // GO AFK
    case `${prefix}afk`:
      require('./commands/afk.js')(message, audioPlayer);
      break;

    // HELP
    case `${prefix}help`:
      require('./commands/help.js')(message);
      break;
    case `${prefix}h`:
      require('./commands/help.js')(message);
      break;
    default:
      require('./commands/help.js')(message);
  }
});

client.login(token);
