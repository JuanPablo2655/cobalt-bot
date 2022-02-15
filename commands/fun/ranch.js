const Discord = require('discord.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        let ranchedUser = cobalt.users.cache.get(args[0]) || message.mentions.users.first();
        if (!ranchedUser) return message.channel.send({ content: 'bruh' });
        message.channel.send({ content: 'Fuck you ' + ranchedUser.username + ' to the ranch dimension' });
        addCD();
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 2,
    aliases: [],
};

exports.help = {
    name: 'ranch',
    description: 'gives you the server time',
    usage: 'ranch [@username]',
};
