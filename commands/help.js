const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    if (args.length == 0) {
        message.channel.send(cobalt.buildHelpMenu(cobalt.commands));
    } else {
        message.channel.send(cobalt.advancedHelp(cobalt.commands.get(args[0]))).catch(console.error);
    }
}

exports.conf = {
    aliases: ['help', 'h', 'halp']
}

exports.help = {
    name: "help",
    description: "get the help menu.",
    usage: "help [commands]"
}