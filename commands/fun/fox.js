const Discord = require("discord.js");
const fetch = require('node-fetch');


module.exports.run = async (cobalt, message, args, cb) => {
    try {
        try {
            const request = await fetch('https://some-random-api.ml/animal/fox');
            const json = await request.json();
            let foxEmbed = new Discord.MessageEmbed()
                .setTitle(json.fact)
                .setImage(json.image)
                .setTimestamp()
                .setColor('RANDOM')
            message.channel.send(foxEmbed)
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
    name: "fox",
    description: "get a random fox pic",
    usage: "fox"
}