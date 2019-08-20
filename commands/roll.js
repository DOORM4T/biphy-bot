/**
 * Command that automagically rolls dice
 *
 * !r xdy -- Roll the "y" sided die "x" times.
 *
 * EX: 1d20 -- Roll the 20 sided die 1 time.
 * @param message Message object recieved by the bot when a message is sent
 */
const { prefix } = require('../config.json');
const rollDice = (message, audioPlayer, broadcast) => {
  let msg = message.content.slice(3);
  msg.replace(new RegExp(/[\D\s]/g), '');
  let args = msg.split(/[dx]/); // \s=whitespace, d=#dice, x=#times

  // Destructure dice info from args
  let [num, dice, times] = args;

  // Convert each value to an integer
  +num, +dice, +times;

  // If no "times"
  if (!times) {
    times = 1;
  }

  // Set limit.
  if (num > 100 || dice > 100 || times > 100) {
    message.channel.send('One of your requested values exceeds my limit!');
    return;
  }

  // Roll!
  let result = 0;
  let rolls = []; // Array of each roll result

  // #times
  for (let i = 0; i < times; i++) {
    // (num)d(dice)
    for (let j = 0; j < num; j++) {
      let roll = Math.round(Math.random() * (dice - 1) + 1);
      result += roll;
      rolls.push(roll);
    }
  }

  // Delete user message
  message.delete();

  // Play roll sound
  if (result > 0) require('./sfx.js')(message, audioPlayer, broadcast);

  // Send the rolled result
  let rollsText = rolls.length > 1 ? `${rolls.join(', ')}\n` : '',
    command = `${prefix}r ${num}d${dice}x${+times}`,
    total = `\`\`\`> Total: ${result}\`\`\``;

  rollsText = `${rollsText ? `\`\`\`> Rolls: ${rollsText}\`\`\`` : ''}`;

  // Message
  message.channel.send(`${message.author} ${command}${total}${rollsText}`);
};

module.exports = rollDice;
