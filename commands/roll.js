/**
 * Command that automagically rolls dice
 *
 * !r xdy -- Roll the "y" sided die "x" times.
 * !r xdyz -- Roll "xdy" "z" times.
 * Append modifiers with +num or -num. EX: !r 2d20x3+5 (Roll 2 D20s 3 times and add 5).
 *
 * EX: 1d20 -- Roll the 20 sided die 1 time.
 * @param message Message object recieved by the bot when a message is sent
 */

const rollDice = async (message, audioPlayer, broadcast) => {
  // Stop if no dice to roll
  if (!message.content.includes('d')) return;

  let msg = message.content.slice(3);
  let args = msg.split(/[dx\+-]/); // d=#dice, x=#times, \+ and - = mod

  // Destructure dice info from args
  let [num, dice, times, mod] = args;

  // Set correct mod and times if user specified a mod but not a #times
  if (!msg.includes('x') && (msg.includes('+') || msg.includes('-'))) {
    mod = times;
    times = 1;
  }

  // Set defaults for #times & mod
  if (!times) times = 1;
  if (!mod) mod = 0;

  // Convert values to integers
  +num, +dice, +times, +mod;

  // Set negative sign on mod if message has '-'
  if (mod && msg.includes('-')) mod *= -1;

  // Set limit.
  if (num > 100 || dice > 100 || times > 100) {
    message.channel.send('One of your requested values exceeds my limit!');
    return;
  }

  // Roll!
  let result = +mod; // Result starts as the mod. Dice Rolls add to result.
  let rolls = [],
    rollTexts = []; // Arrays roll results

  // #times
  for (let i = 0; i < times; i++) {
    let currentTotal = 0,
      currentText = '';
    // (num)d(dice)
    for (let j = 0; j < num; j++) {
      let roll = Math.floor(Math.random() * dice + 1);
      currentText += roll;
      if (j !== num - 1) currentText += ' + ';
      currentTotal += roll;
    }
    result += currentTotal;
    rolls.push(currentTotal);
    rollTexts.push(currentText);
  }

  let rollResults = rolls.map((roll, index) => {
    return { roll: rolls[index], text: `(${rollTexts[index]})` };
  });

  // Delete user message
  await message.delete();

  // Message
  let rollsText =
    num > 1 || rollResults.length > 1
      ? rollResults
          .map(roll => {
            return `${roll.roll} ${num > 1 ? roll.text : ''}`;
          })
          .join(', ')
      : '';

  const commandText = `${num}d${dice}${times > 1 ? `x${times}` : ''}${
    mod ? (mod > 0 ? `+${mod}` : mod) : ''
  }`;

  await message.channel.send(
    `${message.author} ${commandText}\`\`\`RESULT: ${result} ${
      mod ? `(${result - mod}${mod > 0 ? `+${mod}` : mod})` : ''
    }\`\`\``
  );
  if (rollsText) await message.channel.send(`||${rollsText}||`);

  // Play roll sound
  if (message.member.voiceChannel)
    await require('./sfx.js')(message, audioPlayer, broadcast);
};

module.exports = rollDice;
