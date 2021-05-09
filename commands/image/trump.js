const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const fs = require('fs');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        let [...context] = args;
        if (!args[0]) {
            message.channel.send("please add message to the tweet!")
        } else {
            const request = await fetch(`https://api.no-api-key.com/api/v2/trump?message=${context.join(' ')}`);
            const trumpEmbed = new MessageEmbed()
                .setImage(request.url)
            await message.channel.send(trumpEmbed)
        }
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 5,
    aliases: []
}

exports.help = {
    name: "trump",
    description: "send a tweet as trump",
    usage: "trump [message]"
}