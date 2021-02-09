const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    try {
        return;
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: false,
    ownerOnly: false,
    aliases: []
}

exports.help = {
    name: "playerlist",
    description: "get a list of who is playing on the Minecraft Server right now.",
    usage: "playerlist"
}