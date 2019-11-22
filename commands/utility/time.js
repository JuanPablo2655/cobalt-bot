const Discord = require("discord.js");
const moment = require("moment");
require('moment-timezone');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        time = moment().tz('America/New_York').format('LT');
        message.channel.send("It's " + time + " CBT")
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "time",
    description: "gives you the server time",
    usage: "time"
}