const { prefix } = require('../config.json');

const help = message => {
  // Delete user message
  message.delete();

  // Send help message
  message.channel.send(`${message.author} ${message.content}\`\`\`
  ==============================================
          AVAILABLE COMMANDS
  ==============================================

  ${prefix}help, ${prefix}h                 =>  Sends the list of available commands.

  DICE ROLLING
  ${prefix}r <x>d<y>                =>  Roll a "y" sided die "x" times. 
  ${prefix}r <x>d<y>x<z>            =>  Rolls "z" <x>d<y>'s. 

  AUDIO
  ${prefix}play <audio_url>         =>  Plays audio your current Voice Channel.
  ${prefix}pause, ${prefix}p                =>  Pauses current audio.
  ${prefix}resume, ${prefix}r               =>  Resume current audio.
  ${prefix}leave, ${prefix}l                =>  Leave current Audio Channel.
  ${prefix}volume, ${prefix}v <level>       =>  Modifies current audio volume. Max is 1.5 (150%).

  OTHER
  ${prefix}get, ${prefix}g                  =>  Get audio info. 
  ${prefix}afk <reason>             =>  Sends away from keyboard message to channel.
  \`\`\``);
};

module.exports = help;
