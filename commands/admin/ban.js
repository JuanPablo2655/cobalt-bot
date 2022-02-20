const { Permissions } = require('discord.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    let userBan = cobalt.users.cache.get(args[0]) || message.mentions.users.first();
    let [days, ...reason] = args;
    try {
        if (message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            try {
                if (userBan.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
                    return message.reply({ content: "You can't ban someoneon ranked the same or higher than you" });
                await member.ban({
                    days: days || 0,
                    reason: reason || 'fuck you, to the ranch dimension',
                });
                message.channel.send({ content: `${userBan.displayName} has been sent to the ranch dimension` });
            } catch {
                message.channel.send({ content: 'I do not have permission to ban ' + userBan.displayName });
            }
        } else {
            message.reply({ content: 'you can not ban ' + userBan.displayName });
        }
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: false,
    ownerOnly: false,
    cooldown: 1,
    aliases: [],
};

exports.help = {
    name: 'ban',
    description: 'ban someone from the server',
    usage: 'ban [userID] [reason]',
};
