const AFK = (message) => {
    const args = message.content.split(' ');
    if (message.content.trim().length > 4 && message.content[4] == " ") {
        message.channel.send(`${message.author} is away from keyboard because the player is ${message.content.substring(5, message.content.length)}.`);
    }
    else {
        message.channel.send(`${message.author} is away from keyboard.`);
    }
    message.delete();
};

module.exports = AFK;
