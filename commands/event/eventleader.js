const Discord = require("discord.js");
const collector = require("../../models/collector");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        collector.find({ "roles.messages": { $gte: 1 } } ).sort({"roles.messages": -1}).exec(async (err, res) => {
            if (err) cb(err);
            if (res.length == 0) return message.channel.send("there is no data to sort");
            let dataEmbed = new Discord.MessageEmbed()
            .setTitle("message leaderboard")
            var i;
            for (i = 0; i < res.length; i++) {
                res[i].roles.sort((a, b) => b.messages - a.messages);
                dataEmbed.addField(`${cobalt.channels.cache.get(res[i].channelID).name}`, `${message.guild.roles.cache.get(res[i].roles[0].roleID).name}`);
            }
            message.channel.send(dataEmbed);
        })
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 2,
    aliases: ['el']
}

exports.help = {
    name: "eventleader",
    description: "check which role is the leader",
    usage: "eventleader"
}