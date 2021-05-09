const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        return;
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: false,
    ownerOnly: false,
    cooldown: 1,
    aliases: []
}

exports.help = {
    name: "ip",
    description: "get the Minecraft Server IP",
    usage: "ip"
}