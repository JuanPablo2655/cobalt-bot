const { Permissions } = require('discord.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        let userKick = cobalt.users.cache.get(args[0]) || message.mentions.users.first();
        let [...reason] = args;
        if (message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            try {
                if (userKick.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
                    return message.reply({ content: "You can't kick someoneon ranked the same or higher than you" });
                await member.kick({
                    reason: reason || 'fuck you, to the ranch dimension',
                });
                message.channel.send({ content: `${userKick.displayName} has been sent to the ranch dimension` });
            } catch {
                message.channel.send({ content: 'I do not have permission to kick ' + userKick.displayName });
            }
        } else {
            message.reply({ content: 'you can not kick ' + userKick.displayName });
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
    name: 'kick',
    description: 'kick someone from the server',
    usage: 'kick [userID]',
};
