const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    let channel = cobalt.channels.get('562358955893063680');
    let announcement = args.join(" ");
    message.delete();
    channel.send(announcement);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "announcement",
    description: "Let the bot say stuff",
    usage: "announcement [channel] [message]"
}