const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        const request = await fetch('https://no-api-key.com/api/v1/animals/cat');
        const json = await request.json();
        let catEmbed = new Discord.MessageEmbed()
            .setTitle(json.fact)
            .setImage(json.image)
            .setTimestamp()
            .setColor('RANDOM')
        message.channel.send(catEmbed)
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 2,
    aliases: []
}

exports.help = {
    name: "cat",
    description: "get a random cat pic",
    usage: "cat"
}