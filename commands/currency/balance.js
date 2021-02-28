const Discord = require("discord.js");
let currency = require('../../models/currency');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]) || message.member;

        let bal = await cobalt.fetchEconUser(member.id);

        if (!bal.servers.includes(message.guild.id)) {
            bal.servers.push(message.guild.id)
        }
        bal.netWorth = bal.onHand + bal.deposited; // just to fix any errors on any other commands
        await bal.save();

        let balanceEmbed = new Discord.MessageEmbed()
            .setAuthor('Cobalt Network', message.guild.iconURL({format: 'png'}))
            .setTitle(`${member.user.username}'s balance`)
            .setThumbnail(member.user.displayAvatarURL({format: 'png'}))
            .setColor('RANDOM')
            .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL({format: 'png'})}`)
            .addField('Cash', `₡${bal.onHand}`, true)
            .addField('Bank', `₡${bal.deposited}/₡${bal.bankSpace}`, true)
            .addField('Net Worth', `₡${bal.netWorth}`, true)
            .addField('Bounty', `₡${bal.bounty}`, true)
            .setTimestamp()
        message.channel.send(balanceEmbed)
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 1,
    aliases: ['bal']
}

exports.help = {
    name: "balance",
    description: "check your balance or someone else",
    usage: "balance [user]"
}
