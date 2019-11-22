const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    let messageID = args[0];
    
}

exports.conf = {
    enabled: false,
    aliases: []
}

exports.help = {
    name: "count",
    description: "count the reactions in a message",
    usage: "count [MESSAGE ID]"
}