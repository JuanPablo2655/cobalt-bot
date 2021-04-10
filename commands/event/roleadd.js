const Discord = require("discord.js");
const eventConfig = require("../../models/eventConfig");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let data = await eventConfig.findOne({ guildID: message.guild.id });
        if (!args[0]) return message.channel.send("You need to add a role")
        if (args[0].length !== 18) return message.channel.send("Please send a valid role id")
        if (!data) {
            const newEntry = new eventConfig({
                guildID: message.guild.id,
                roles: [args[0]]
            });
            await newEntry.save();
            message.channel.send("added the role id")
        } else {
            if (!data.roles.includes(args[0])) {
                data.roles.push(args[0])
                await data.save();
                message.channel.send("added the role id")
            } else {
                message.channel.send("already in the list")
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
    name: "roleadd",
    description: "add a role in the event config",
    usage: "roleadd"
}