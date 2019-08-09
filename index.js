const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

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
  console.log('reconnecting!');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});

// Handle user messages
client.on('message', async message => {
  // Stop if message is from this bot
  if (message.author.bot) return;

  // Stop if the command has no prefix
  if (!message.content.startsWith(prefix)) return;

  // ======================
  // COMMANDS
  // ======================

  // Dice Roller (!r <x>d<y>)
  require('./commands/roll.js')(message);

  // Help (!help, !h)
  require('./commands/help.js')(message);

  // Play (!play <url>)
  require('./commands/play.js')(message, audioPlayer);

  // Stop (!stop)
  require('./commands/stop.js')(message, audioPlayer);

  // Set Volume (!volume <level>, !vol <level>)
  require('./commands/volume.js')(message, audioPlayer);

  // Player Info Getter (!get <field>)
  require('./commands/get.js')(message, audioPlayer);
});

// Bot Login
client.login(token);
