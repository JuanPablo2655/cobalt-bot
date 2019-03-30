const Discord = require("discord.js");
const mongoose = require('mongoose');
let money = require('../model/economy.js');

mongoose.connect('mongodb://localhost/cobalt', {
    useNewUrlParser: true
});

module.exports.run = async (cobalt, message, args) => {
    money.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, (err, res) => {
        if (err) console.log(err);
        let moneyEmbed = new Discord.RichEmbed()
            .setTitle("Cobalt bucks")
            .setColor('RANDOM')
            .setThumbnail(message.author.displayAuthorURL)
        if (!res) {
            moneyEmbed.addField("Money", "0", true)
            return message.channel.send(moneyEmbed);
        } else {
            moneyEmbed.addField("Money", res.money, true)
            return message.channel.send(moneyEmbed);
        }
    })
};

exports.conf = {
    aliases: ['money']
}

exports.help = {
    name: "money",
    description: "show's how much money you have",
    usage: "money"
}