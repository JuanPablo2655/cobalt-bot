const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        return
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    aliases: []
}

exports.help = {
    name: "get_hours",
    description: "get your vc hours data",
    usage: "get_hours"
}