const Discord = require("discord.js");
let currency = require('../../models/currency');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");
        currency.find({
            servers: message.guild.id
        }).sort([
            ['netWorth', 'descending']
        ]).exec((err, res) => {
            if (err) console.log(err);
            let balEmbed = new Discord.MessageEmbed()
                .setTitle("Top 10 most rich users")
            if (res.length === 0) {
                balEmbed.setColor('RED');
                balEmbed.addField('No data found', 'Looks like a dead server to me')
            } else if (res.length < 10) {
                balEmbed.setColor('RANDOM');
                for (i = 0; i < res.length; i++) {
                    if (res[i].netWorth == 0) continue
                    let member = message.guild.members.cache.get(res[i].userID) || "User Left"
                    if (member === "User Left") {
                        balEmbed.addField(`${i + 1}. ${member}`, `**Net Worth**: ${moneyEmoji} ${res[i].netWorth}`);
                    } else {
                        balEmbed.addField(`${i + 1}. ${member.user.username}`, `**Net Worth**: ${moneyEmoji} ${res[i].netWorth}`);
                    }
                }
            } else {
                for (i = 0; i < 10; i++) {
                    if (res[i].netWorth == 0) continue
                    let member = message.guild.members.cache.get(res[i].userID) || "User Left"
                    if (member === "User Left") {
                        balEmbed.addField(`${i + 1}. ${member}`, `**Net Worth**: ${moneyEmoji} ${res[i].netWorth}`);
                    } else {
                        balEmbed.addField(`${i + 1}. ${member.user.username}`, `**Net Worth**: ${moneyEmoji} ${res[i].netWorth}`);
                    }
                }
            }
    
            message.channel.send(balEmbed);
        })
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
    name: "baltop",
    description: "top 10 most rich people in the server",
    usage: "baltop"
}