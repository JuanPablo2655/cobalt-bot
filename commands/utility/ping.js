const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    message.channel.send(Math.round(cobalt.ping)+"ms")
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "ping",
    description: "ping pong",
    usage: "ping"
}