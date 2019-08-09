const { prefix } = require('../config.json');

const help = message => {
  if (
    message.content.toUpperCase() === `${prefix}HELP` ||
    message.content.toUpperCase() === `${prefix}H`
  ) {
    // Delete user message
    message.delete();

    // Send help message
    message.channel.send(`${message.author} ${message.content}\`\`\`
==============================================
            BIPHY'S COMMANDS
==============================================

> !help, !h             =>  Sends the list of available commands.
> !r <x>d<y>                =>  Roll a "y" sided die "x" times. 
> !play <audio_url>     =>  Plays audio your current Voice Channel.
> !stop                 =>  Stops current audio.
> !volume, !v <level>   =>  Modifies current audio volume. Max is 1.5 (150%).
    \`\`\``);
  }
};

module.exports = help;
