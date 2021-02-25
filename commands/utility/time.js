const Discord = require("discord.js");
const { DateTime } = require("luxon");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        time = DateTime.fromObject({zone: 'America/New_York'}).toLocaleString(DateTime.DATETIME_MED)
        message.channel.send("It's " + time + " CBT")
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 1,
    aliases: []
}

exports.help = {
    name: "time",
    description: "gives you the server time",
    usage: "time"
}