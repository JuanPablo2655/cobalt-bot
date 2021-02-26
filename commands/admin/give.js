const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]);
        if (!member || !args[0]) return message.channel.send('You have to give cobaltian money to someone')
        if (!args[1]) return message.channel.send('You have to give the user some cobaltian money')
        if (isNaN(parseInt(args[1], 10))) return message.channel.send('Please input a valid number')
        await cobalt.giveMoney(member.user.id, args[1])
        message.channel.send('Done!')
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: true,
    cooldown: 1,
    aliases: []
}

exports.help = {
    name: "give",
    description: "give someone cobaltian money",
    usage: "give [user] [amount]"
}