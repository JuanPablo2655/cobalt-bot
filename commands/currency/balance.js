const Discord = require("discord.js");
let currency = require('../../models/currency');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let user = cobalt.users.cache.get(args[0]) || message.mentions.users.last();
        if (!user){
            user = message.author;
        }
        let balanceEmbed = new Discord.MessageEmbed()
            .setAuthor('Cobalt Network', message.guild.iconURL({format: 'png'}))
            .setTitle(`${user.username}'s balance`)
            .setColor('RANDOM')
            .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL({format: 'png'})}`)
            .setTimestamp();
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");

        currency.findOne({
            userID: user.id
        }, (err, res) => {
            if (err) console.log(err)
            if (!res) {
                balanceEmbed.addField('Cash', `${moneyEmoji} 0`, true)
                    .addField('Bank', `${moneyEmoji} 0/1000`, true)
                    .addField('Net Worth', `${moneyEmoji} 0`)
                return message.channel.send(balanceEmbed)
            } else {
                balanceEmbed.addField('Cash', `${moneyEmoji} ${res.onHand}`, true)
                    .addField('Bank', `${moneyEmoji} ${res.deposited}/${res.bankSpace}`, true)
                    .addField('Net Worth', `${moneyEmoji} ${res.netWorth}`)
                 return message.channel.send(balanceEmbed)
            }
        })
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    aliases: ['bal']
}

exports.help = {
    name: "balance",
    description: "check your balance or someone else",
    usage: "balance [user]"
}