const Discord = require("discord.js");
const fetch = require('node-fetch');


module.exports.run = async (cobalt, message, args, cb) => {
    try {
        try {
            const request = await fetch('https://no-api-key.com/api/v1/animals/dog');
            const json = await request.json();
            let dogEmbed = new Discord.MessageEmbed()
                .setTitle(json.fact)
                .setImage(json.image)
                .setTimestamp()
                .setColor('RANDOM')
            message.channel.send(dogEmbed)
        } catch {
            message.channel.send("The API is down contact Juan Pablo.")
        }
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
    name: "dog",
    description: "get a random dog pic",
    usage: "dog"
}