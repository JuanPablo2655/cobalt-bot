const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        return;
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: false,
    aliases: []
}

exports.help = {
    name: "ip",
    description: "get the Minecraft Server IP",
    usage: "ip"
}