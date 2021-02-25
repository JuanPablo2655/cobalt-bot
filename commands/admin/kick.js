const Discord = require("discord.js");


module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let userKick = cobalt.users.cache.get(args[0]) || message.mentions.users.first();
        let [...reason] = args;
        if (message.member.hasPermission("KICK_MEMBERS")) {
            try {
                if (userKick.hasPermission("KICk_MEMBERS")) return message.reply("You can't kick someoneon ranked the same or higher than you")
                await member.kick({
                    reason: reason || "fuck you, to the ranch dimension"
                })
                message.channel.send(`${userKick.displayName} has been sent to the ranch dimension`)
            } catch {
                message.channel.send("I do not have permission to kick " + userKick.displayName)
            }

        } else {
            message.reply("you can not kick " + userKick.displayName)
        }
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: false,
    ownerOnly: false,
    cooldown: 1,
    aliases: []
}

exports.help = {
    name: "kick",
    description: "kick someone from the server",
    usage: "kick [userID]"
}