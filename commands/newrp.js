const Discord = require("discord.js");
const initials = require("initials");

module.exports.run = async (cobalt, message, args) => {
    let [...name] = args;
    if (!name[0]) {
        message.channel.send("Error: Can\'t create a channel with no name.");
    } else if (name) {
        rp = initials(name.join(' '))
        message.guild.createChannel(`${rp}-development`, {type: 'text'})
            .then(channel => channel.setParent('393965452579307521'))
            .then(channel => channel.lockPermissions())
            .then(channel => channel.overwritePermissions(message.author, {
                MANAGE_CHANNELS: true,
                MANAGE_MESSAGES: true
            }));
        message.channel.send("Channel created.")
    }
}

exports.conf = {
    aliases: ['nr']
}

exports.help = {
    name: "newrp",
    description: "create a new rp channel.",
    usage: "newrp"
}