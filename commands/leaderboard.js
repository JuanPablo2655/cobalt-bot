const Discord = require("discord.js");
const mongoose = require('mongoose');
let money = require('../model/economy.js');

mongoose.connect('mongodb://localhost/cobalt', {
    useNewUrlParser: true
});

module.exports.run = async (cobalt, message, args) => {
    money.find({
        serverID: message.guild.id
    }).sort([
        ['money', 'descending']
    ]).exec((err, res) => {
        if (err) console.log(err);
        let leaderEmbed = new Discord.RichEmbed()
            .setTitle("The top ten richest Cobaltians")
        if (res.length === 0) {
            leaderEmbed.setColor('RED');
            leaderEmbed.addField('No data found', 'Looks like a dead server to me')
        } else if (res.length < 10) {
            leaderEmbed.setColor('RANDOM');
            for (i = 0; i < res.length; i++) {
                let member = message.guild.members.get(res[i].userID) || "User Left"
                if (member === "User Left") {
                    leaderEmbed.addField(`${i + 1}. ${member}`, `**Money**: ${res[i].money}`);
                } else {
                    leaderEmbed.addField(`${i + 1}. ${member.user.username}`, `**Money**: ${res[i].money}`);
                }
            }
        } else {
            for (i = 0; i < 10; i++) {
                let member = message.guild.members.get(res[i].userID) || "User Left"
                if (member === "User Left") {
                    leaderEmbed.addField(`${i + 1}. ${member}`, `**Money**: ${res[i].money}`);
                } else {
                    leaderEmbed.addField(`${i + 1}. ${member.user.username}`, `**Money**: ${res[i].money}`);
                }
            }
        }

        message.channel.send(leaderEmbed);
    })
}

exports.conf = {
    aliases: ['leaderboard', 'lb']
}

exports.help = {
    name: "leaderboard",
    description: "show's the leaderboard for the top ten cobaltians",
    usage: "leaderboard"
}