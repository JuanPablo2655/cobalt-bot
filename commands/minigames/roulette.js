const Discord = require('discord.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        let lost = Math.round(Math.random() * 6) === 0;

        if (lost) {
            message.channel.send({ content: ':boom: :gun:\n`You Lost` :anguished:' });
        } else {
            message.channel.send({ content: '*click* :gun:\n`You survived to the next round`' });
        }
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 5,
    aliases: [],
};

exports.help = {
    name: 'roulette',
    description: 'play russian roulette',
    usage: 'roulette',
};
