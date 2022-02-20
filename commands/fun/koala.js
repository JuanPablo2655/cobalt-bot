const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        try {
            const request = await fetch('https://some-random-api.ml/animal/koala');
            const json = await request.json();
            let koalaEmbed = new Discord.MessageEmbed()
                .setTitle(json.fact)
                .setImage(json.image)
                .setTimestamp()
                .setColor('RANDOM');
            message.channel.send({ embeds: koalaEmbed });
        } catch {
            message.channel.send({ content: 'The API is down contact Juan Pablo.' });
        }
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
    name: 'koala',
    description: 'get a random koala pic',
    usage: 'koala',
};
