// set an decoder
let decoder = new TextDecoder("utf-8");

if (WebSocket.prototype.original == undefined) {
    // store the original WebSocket
    WebSocket.prototype.original = WebSocket.prototype.send
}

let last_channel = null

let mode = 0

WebSocket.prototype.send = function(data) {
    if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
		if (decoder.decode(data).includes("guild_ids\u0003nil")) {
                // in here we are disconnect from vc
                last_channel = null
		}
		
		if (decoder.decode(data).includes(last_channel)) {
			if (mode === 0 ){
				// allowing deafen/mute
				if (decoder.decode(data).includes("self_mutes\u0005false") && decoder.decode(data).includes("self_deafs\u0005false")) {
					return
				}
			} else if (mode === 1){
				// deafen only
				if (decoder.decode(data).includes("self_deafs\u0005false")) {
					return
				}
			} else if (mode === 2){
				// normal
			}
		} 
		if (decoder.decode(data).includes("channel_idm\u0000\u0000\u0000")) {
			// we detect a voice channel in the data
            // store the new channel
            start = decoder.decode(data).split("channel_idm\u0000\u0000\u0000")[1]
            end = start.split("\u0000\u0000\u0000	self_mutes")[0]
            last_channel = "channel_idm\u0000\u0000\u0000" + end + "\u0000\u0000\u0000	self_mutes"
        } 
        
    }
    WebSocket.prototype.original.apply(this, [data]);
}
