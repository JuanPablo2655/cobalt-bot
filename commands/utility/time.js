const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (cobalt, message, args) => {
    time = moment().format('LT');
    message.channel.send("It's "+time+" CBT")
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "time",
    description: "gives you the server time",
    usage: "time"
}