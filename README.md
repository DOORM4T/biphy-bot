<style>
#biphy {
    width:20%;
    position: absolute;
    top:0;
    right:-60px;
    transform:rotate(-45deg)
}
</style>

# Biphy Bot

<img id="biphy" src="https://cdn.discordapp.com/attachments/588918874272038932/613085069824884899/Biphy.png" style="float:right; ">
<!-- ![Biphy character and art by fellow Headhunter @Julz Bananz](https://cdn.discordapp.com/attachments/588918874272038932/609184207284994074/IMG_0564.PNG) -->

## Get Started

1. Create a new application & bot at https://discordapp.com/developers/applications/
2. Clone this repository
3. Create a config.json file. Insert JSON in the following format:
4. Start the bot with `npm start`
5. Enjoy!

```JSON
{
    "prefix": <command_prefix>,
    "token": <your_token>
}
```

## Commands

```
> !help, !h             =>  Sends the list of available commands.
> !r <x>d<y>            =>  Roll a "y" sided die "x" times.
> !play <audio_url>     =>  Plays audio your current Voice Channel.
> !stop                 =>  Stops current audio.
> !volume, !v <level>   =>  Modifies current audio volume. Max is 1.5 (150%).
```
