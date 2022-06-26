# Discord Fake Deafen / Mute
Allows you to talk while muted/deafened in Discord Voice Chat

# TL;DR
0. ☆ Star this project (Highly Recommended) ;)
1. Enable `Discord Developer Console` (search it on google)
2. Ctrl + Shift + I and go to "Console" tab <br />
# "WARNING!.. DO NOT PASTE ANY CODE TO THE CONSOLE UNLESS YOU UNDERSTAND THE CODE OR CONSULT TO YOUR TRUSTED DEVELOPER BEFORE CONTINUE"
3. Copy the code from [code.js](code.js) and execute in the console <br />
4. Mute or deafen yourself.
5. Unmute and undeafen, you'll now be able to talk normally, while others will see you as muted and/or deafen
6. To revert it, you need to disconnect or move to other channel first, then come back.
7. Permanent revert? restart your discord or run this code `WebSocket.prototype.send = WebSocket.prototype.original`

# How it work?
Discord using WebSocket to send data. So, Here will decode the data if it an ArrayBuffer. <br/>
Next, it will check is there any `self_mutes` or `self_deafen` in the data.  <br/>
If so, then if the value is `true` we forward the data to original WebSocket to tell the server we are on muted/deafened. <br/>
 <br/>
If the value `false`, it gonna check the `guild_id` is `null` or not. If it `null`, then it will forward the data to original WebSocket to tell the server we want to disconnect from voice channel. then we set the `last_channel` to `null` <br/>
if the data has `guild id`, then we check is the `last_channel` are in the data. If so, then we return. This data is the one will update our mute/deafen status.
otherwise, we will forward all other data, and store the last channel. <br/>
