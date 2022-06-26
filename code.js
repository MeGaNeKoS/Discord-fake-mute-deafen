// set an decoder
let decoder = new TextDecoder("utf-8");

if (WebSocket.prototype.original == undefined) {
    // store the original WebSocket
    WebSocket.prototype.original = WebSocket.prototype.send
}

let last_channel = null
WebSocket.prototype.send = function(data) {
    if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
        if (decoder.decode(data).includes("self_mutes\u0004true") || decoder.decode(data).includes("self_deafs\u0004true")) {
            // store the new channel
            start = decoder.decode(data).split("channel_idm\u0000\u0000\u0000")[1]
            end = start.split("\u0000\u0000\u0000	self_mutes")[0]
            last_channel = "channel_idm\u0000\u0000\u0000" + end + "\u0000\u0000\u0000	self_mutes"
        } else if (decoder.decode(data).includes("self_mutes\u0005false") || decoder.decode(data).includes("self_deafs\u0005false")) {

            if (decoder.decode(data).includes("guild_ids\u0003nil")) {
                // in here we are disconnect from vc
                last_channel = null
            } else if (decoder.decode(data).includes(last_channel)) {
                // something want to update our deafen/mute status
                return
            } else {
                // store the new channel
                start = decoder.decode(data).split("channel_idm\u0000\u0000\u0000")[1]
                end = start.split("\u0000\u0000\u0000	self_mutes")[0]
                last_channel = "channel_idm\u0000\u0000\u0000" + end + "\u0000\u0000\u0000	self_mutes"
            }
        }
    }
    WebSocket.prototype.original.apply(this, [data]);
}
