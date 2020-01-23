# Project Headhunter: Biphy Bot

## Get Started

1. Create a new application & bot at https://discordapp.com/developers/applications/.

2. Under OAuth2, select the "Bot" scope and enable permissions to `Send Messages`, `Manage Messages`, `Connect`, and `Speak`. 

3. Invite your bot to your server using the generated link. It should look something like this: https://discordapp.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=3155968&scope=bot.

4. Clone this repository with `git clone https://github.com/DOORM4T/biphy-bot.git`.

5. Create a config.json file. Insert JSON in the following format:
```JSON
{
    "prefix": <command_prefix>,
    "token": <your_token>
}
```

6. Start the bot with `npm start`.
7. Enjoy!

## Commands

```
  !help, !h                 =>  Sends the list of available commands.
 
 DICE ROLLING
  !r <x>d<y>                =>  Roll a "y" sided die "x" times. 
  !r <x>d<y>x<z>            =>  Rolls "z" <x>d<y>'s. 
 
 AUDIO
  !play <audio_url> <?loop> =>  Play audio in current Voice Channel. End with 'loop' to loop
  !playSound, ps <sound>    =>  Play audio in current Voice Channel. End with 'loop' to loop
  !pause, !p                =>  Pauses current audio.
  !resume, !r               =>  Resume current audio.
  !stop, !s                 =>  Stop current audio without leaving the Voice Channel
  !leave, !l                =>  Leave current Audio Channel.
  !volume, !v <level>       =>  Modifies current audio volume. Max is 1.5 (150%).
  !loop                     =>  Toggle Audio Looping
 
 OTHER
  !get, !g                  =>  Get audio info. 
  !afk <reason>             =>  Sends away from keyboard message to channel.
```
Note: To run audio commands, you will need [ffmpeg](https://ffmpeg.zeranoe.com/builds/) installed on your machine. 


<img id="biphy" alt="Biphy character and art by fellow Headhunter @Julz Bananz" src="https://cdn.discordapp.com/attachments/588918874272038932/613085069824884899/Biphy.png" width=200 style="width:20%;position: absolute;top:0;right:-60px;transform:rotate(-45deg)">
<hr>

`Biphy character and art by fellow Headhunter @Julz Bananz`
