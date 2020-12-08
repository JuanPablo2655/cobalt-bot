const Discord = require("discord.js");
const fetch = require('node-fetch');


module.exports.run = async (cobalt, message, args, cb) => {
    try {
        const request = await fetch('https://no-api-key.com/api/v1/animals/bear');
        const json = await request.json();
        let bearEmbed = new Discord.MessageEmbed()
            .setTitle(json.fact)
            .setImage(json.image)
            .setTimestamp()
            .setColor('RANDOM')
        message.channel.send(bearEmbed)
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    aliases: []
}

exports.help = {
    name: "bear",
    description: "get a random bear pic",
    usage: "bear"
}