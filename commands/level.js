const Discord = require("discord.js");
const mongoose = require('mongoose');
let levels = require('../model/levels.js');

mongoose.connect('mongodb://localhost/cobalt', {
    useNewUrlParser: true
});

module.exports.run = async (cobalt, message, args) => {
    levels.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, (err, res) => {
        if (err) console.log(err);
        let levelEmbed = new Discord.RichEmbed()
            .setTitle("Cobalt level")
            .setColor('RANDOM')
            .setThumbnail(message.author.displayAuthorURL)
        if (!res) {
            levelEmbed.addField("xp", "0", true)
            levelEmbed.addField("Level", "0", true)

            return message.channel.send(levelEmbed);
        } else {
            levelEmbed.addField("xp", res.xp, true)
            levelEmbed.addField("Level", res.lvl, true)
            return message.channel.send(levelEmbed);
        }
    })
};

exports.conf = {
    aliases: ['rank']
}

exports.help = {
    name: "level",
    description: "show's how much xp you have",
    usage: "level"
}