const { prefix } = require('../config.json');

/**
 * Command that automagically rolls dice
 *
 * !r xdy -- Roll the "y" sided die "x" times.
 *
 * EX: 1d20 -- Roll the 20 sided die 1 time.
 * @param message Message object recieved by the bot when a message is sent
 */
const rollDice = message => {
  if (message.content.startsWith(`${prefix}r `)) {
    let roll = message.content.slice(3),
      num = +roll.slice(0, roll.indexOf('d')),
      dice = roll.slice(roll.indexOf('d') + 1, roll.length),
      result = 0;

    // Remove all characters after #dice, if any
    // !r 1d12please ol buddy ol friend => dice === 12
    if (isNaN(typeof +dice)) {
      dice = dice.replace(new RegExp(/\D/g), '');
    }

    // Random roll
    for (let i = 0; i < num; i++) {
      result += Math.round(Math.random() * (dice - 1) + 1);
    }

    // Delete user message
    message.delete();

    // Send the rolled result
    message.channel.send(
      `${message.author} ${message.content}\`\`\`> ${result}\`\`\``
    );
  }
};

module.exports = rollDice;
