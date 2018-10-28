const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    message.channel.send(`${cobalt.ping}`);
}

exports.conf = {
    aliases: ['ping']
}

exports.help = {
    name: "ping",
    description: "ping pong.",
    usage: "ping"
}