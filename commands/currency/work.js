const Discord = require("discord.js");
let currency = require('../../models/currency');
const { DateTime } = require("luxon");
const prettyMilliseconds = require('pretty-ms');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let workEmbed = new Discord.MessageEmbed();
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");
        let workEntries = [`${message.author.username} got his forklift certification, his pay:`, `${message.author.username} is based:`, `${message.author.username} drone strike'd children in Yemen for:`, `${message.author.username} works at Tencent for:`, `${message.author.username} had an epic poggers moment and got:`, `${message.author.username} sold some cheese and got:`, `${message.author.username} took out the alien form among us for: `]
        let workentry = workEntries[Math.floor(Math.random() * workEntries.length)];
        
        let date = DateTime.local();
        let cooldownDate = date.plus({ hours: 6 });
        let moneyEarned = Math.floor(200 + Math.random() * 100)

        let userData = await cobalt.fetchEconUser(message.author.id);
        if (!userData.servers.includes(message.guild.id)) {
            userData.servers.push(message.guild.id)
        }

        if (isNaN(userData.workCooldown)) {
            userData.username = message.author.username;
            userData.workCooldown = cooldownDate
            await userData.save();
            await cobalt.giveMoney(message.author.id, moneyEarned);
            workEmbed.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png' }))
                .setColor('#1cc936')
                .setDescription(`${workentry} ${moneyEmoji} ${moneyEarned}`);
            message.channel.send(workEmbed)
        } else if (userData.workCooldown > date) {
            let timeRemaining = prettyMilliseconds(userData.workCooldown - Date.now(), { verbose: true })
            return message.channel.send(`You have to wait ${timeRemaining} until you can work again.`)
        } else {
            userData.username = message.author.username;
            userData.workCooldown = cooldownDate
            await userData.save();
            await cobalt.giveMoney(message.author.id, moneyEarned);
            workEmbed.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png' }))
                .setColor('#1cc936')
                .setDescription(`${workentry} ${moneyEmoji} ${moneyEarned}`);
            message.channel.send(workEmbed)
        }
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 60*5,
    aliases: []
}

exports.help = {
    name: "work",
    description: "got to work",
    usage: "work"
}