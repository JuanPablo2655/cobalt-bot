const Discord = require("discord.js");
let currency = require('../../models/currency');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");
        // let [member, money] = args;
        let authorData = await cobalt.fetchEconUser(message.author.id);
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]);
        if (!member || !args[0]) return message.channel.send('You have to pay someone')
        if (member.user.id == message.author.id) return message.channel.send('Can\'t pay yourself')
        let userData = await cobalt.fetchEconUser(member.user.id)
        if (!args[1]) return message.channel.send('You have to pay the user some money')
        if (isNaN(parseInt(args[1], 10))) return message.channel.send('Please input a valid number')
        if (authorData.onHand < Number(args[1])) return message.channel.send('You don\'t have enough money')

        if (!authorData.servers.includes(message.guild.id)) {
            authorData.servers.push(message.guild.id)
        }
        await authorData.save();
        if (!userData.servers.includes(message.guild.id)) {
            userData.servers.push(message.guild.id)
        }
        await userData.save();
        await cobalt.removeMoney(message.author.id, args[1])
        await cobalt.giveMoney(member.user.id, args[1])

        message.channel.send(`You paid ${member.user.username} ${moneyEmoji} ${args[1]}. You now have ${moneyEmoji} ${authorData.onHand} left.`)
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
    name: "pay",
    description: "pay someone",
    usage: "pay [user] [amount]"
}