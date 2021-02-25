const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let messageID = args[0];
        let filter = (reaction, user) => reaction.emoji.name === args[1];
        
        if (!args[0]) return message.channel.send("I need a message ID!")
        if (!args[1]) return message.channel.send('I need an emoji name!')

        let collector = messageID.createReactionCollector(filter, {
            time: 5000
        });

        collector.on('collect', (reaction, collector) => {
            cb(`got ${reaction} reaction\n${collector}`);
        });

        collector.on('end', collected => {
            cb(`collected ${collected.size} reactions`);
        });
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
    name: "count",
    description: "count the reactions in a message",
    usage: "count [MESSAGE ID]"
}