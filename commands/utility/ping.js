const Discord = require('discord.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        message.channel.send({ content: 'Pong' }).catch(e => cb(e));
        addCD();
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 1,
    aliases: [],
};

exports.help = {
    name: 'ping',
    description: 'ping pong',
    usage: 'ping',
};
