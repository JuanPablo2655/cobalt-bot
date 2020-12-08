const Discord = require("discord.js");
const fetch = require('node-fetch');


module.exports.run = async (cobalt, message, args, cb) => {
    try {
        const request = await fetch('https://no-api-key.com/api/v1/animals/panda');
        const json = await request.json();
        let pandaEmbed = new Discord.MessageEmbed()
            .setTitle(json.fact)
            .setImage(json.image)
            .setTimestamp()
            .setColor('RANDOM')
        message.channel.send(pandaEmbed)
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
    name: "panda",
    description: "get a random panda pic",
    usage: "panda"
}