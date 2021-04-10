const Discord = require("discord.js");
const eventConfig = require("../../models/eventConfig");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let data = await eventConfig.findOne({ guildID: message.guild.id });
        if (!args[0]) return message.channel.send("You need to remove a role")
        if (args[0].length !== 18) return message.channel.send("Please send a valid role id to remove")
        if (!data) {
            return message.channel.send("there is no collection to remove from")
        } else {
            var i;
            for (i = 0; i < data.roles.length; i++) {
                if (data.roles[i] === args[0]) {
                    data.roles.splice(i, 1);
                    await data.save();
                    message.channel.send("removed the role id")
                }
            }
        }
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
    name: "roleremove",
    description: "remove a role in the event config",
    usage: "roleremove"
}