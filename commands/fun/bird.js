const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        try {
            const request = await fetch('https://no-api-key.com/api/v1/animals/birb');
            const json = await request.json();
            let birdEmbed = new Discord.MessageEmbed()
                .setTitle(json.fact)
                .setImage(json.image)
                .setTimestamp()
                .setColor('RANDOM');
            message.channel.send({ embeds: [birdEmbed] });
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
    name: 'bird',
    description: 'get a random bird pic',
    usage: 'bird',
};
