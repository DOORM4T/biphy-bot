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
  status: 'Inactive',
  voiceChannel: null,
  volume: 0.2
};

client.on('ready', () => {
  console.log('Ready!');
});

client.on('message', async message => {
  // Stop if the message is from this bot
  if (message.author.bot) return;

  // BaD wOrD fIlTeR
  // require('./commands/pie.js')(message);

  // If the command has no prefix
  if (!message.content.startsWith(prefix)) return;

  // Determine invoked command
  const args = message.content.split(' ');
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
    case `${prefix}pl`:
      require('./commands/play.js')(message, audioPlayer, broadcast);
      break;

    // PAUSE AUDIO
    case `${prefix}pause`:
      require('./commands/pause.js')(message, audioPlayer, broadcast);
      break;
    case `${prefix}p`:
      require('./commands/pause.js')(message, audioPlayer, broadcast);
      break;

    // RESUME AUDIO
    case `${prefix}resume`:
      require('./commands/resume.js')(message, audioPlayer, broadcast);
      break;
    case `${prefix}re`:
      require('./commands/resume.js')(message, audioPlayer, broadcast);
      break;

    // STOP AUDIO
    case `${prefix}leave`:
      require('./commands/leave.js')(message, audioPlayer, broadcast);
      break;
    case `${prefix}l`:
      require('./commands/leave.js')(message, audioPlayer, broadcast);
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
    case `${prefix}g`:
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
