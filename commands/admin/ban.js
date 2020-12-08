const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    let userBan = cobalt.users.cache.get(args[0]) || message.mentions.users.first();
    let [days, ...reason] = args
    try {
        if (message.member.hasPermission("BAN_MEMBERS")) {
            try {
                if (userBan.hasPermission("BAN_MEMBERS")) return message.reply("You can't ban someoneon ranked the same or higher than you")
                await member.ban({
                    days: days || 0,
                    reason: reason || "fuck you, to the ranch dimension"
                })
                message.channel.send(`${userBan.displayName} has been sent to the ranch dimension`)
            } catch {
                message.channel.send("I do not have permission to ban " + userBan.displayName)
            }

        } else {
            message.reply("you can not ban " + userBan.displayName)
        }
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: false,
    ownerOnly: false,
    aliases: []
}

exports.help = {
    name: "ban",
    description: "ban someone from the server",
    usage: "ban [userID] [reason]"
}