const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const path = require('path');

const client = new Discord.Client();
const broadcast = client.createVoiceBroadcast();
broadcast.on('error', err => {
  console.log(err.message);
  broadcast.end();
});

let audioPlayer = {
  audioUrl: null,
  connection: null,
  currentAudio: null,
  dispatcher: null,
  looping: false,
  status: 'Inactive',
  voiceChannel: null,
  volume: 0.2,
  localSounds: []
};

client.on('ready', () => {
  console.log('Ready!');
});

client.on('message', async message => {
  // Stop if the message is from this bot
  if (message.author.bot) return;

  // BaD wOrD fIlTeR
  require('./commands/pie.js')(message);

  // If the command has no prefix
  if (!message.content.startsWith(prefix)) return;

  // Determine invoked command
  const args = message.content.split(' ');
  switch (args[0]) {
    // DICE ROLLER
    case `${prefix}r`:
      require('./commands/roll.js')(message, audioPlayer, broadcast);
      break;
    case `${prefix}roll`:
      require('./commands/roll.js')(message, audioPlayer, broadcast);
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

    // STOP PLAYING
    case `${prefix}stop`:
      require('./commands/stop.js')(message, audioPlayer, broadcast);
      break;

    case `${prefix}s`:
      require('./commands/stop.js')(message, audioPlayer, broadcast);
      break;

    // STOP & LEAVE VOICE CHANNEL
    case `${prefix}leave`:
      require('./commands/leave.js')(message, audioPlayer, broadcast);
      break;
    case `${prefix}l`:
      require('./commands/leave.js')(message, audioPlayer, broadcast);
      break;

    // TOGGLE AUDIO LOOPING
    case `${prefix}loop`:
      if (audioPlayer.looping) audioPlayer.looping = false;
      else audioPlayer.looping = true;
      message.delete();
      message.channel.send(`\`\`\`Looping: ${audioPlayer.looping}\`\`\``);
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

    // PLAY SOUND EFFECT
    case `${prefix}playSound`:
      require('./commands/sfx.js')(message, audioPlayer, broadcast);
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
