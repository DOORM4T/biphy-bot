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

> !h, !help =>  Sends the list of available commands.
> !r xdy    =>  Roll a "y" sided die "x" times. 
    \`\`\``);
  }
};

module.exports = help;
