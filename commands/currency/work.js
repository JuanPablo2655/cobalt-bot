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

        currency.findOne({
            userID: message.author.id
        }, (err, res) => {
            if (err) cb(err);
            let date = DateTime.local();
            let cooldownDate = date.plus({ hours: 6 });
            moneyEarned = Math.floor(200 + Math.random() * 100)
            if (!res) {
                const newEntry = new currency({
                    username: message.author.username,
                    userID: message.author.id,
                    servers: [message.guild.id],
                    onHand: moneyEarned,
                    deposited: 0,
                    bankSpace: 1000,
                    netWorth: moneyEarned,
                    workCooldown: cooldownDate
                })
                newEntry.save().catch(err => console.log(err));
                workEmbed.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png' }))
                    .setColor('#1cc936')
                    .setDescription(`${workentry} ${moneyEmoji} ${moneyEarned}`);
                message.channel.send(workEmbed)
            } else {
                if (res.workCooldown > date) {
                    let timeRemaining = prettyMilliseconds(res.workCooldown - Date.now(), { verbose: true })
                    return message.channel.send(`You have to wait ${timeRemaining} until you can work again.`)
                } else {
                    res.onHand += moneyEarned
                    res.netWorth += moneyEarned
                    res.username = message.author.username;
                    res.workCooldown = cooldownDate
                    if (!message.guild.id) {
                        res.servers.push(message.guild.id)
                    }
                    res.save().catch(err => console.log(err));
                    workEmbed.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png' }))
                        .setColor('#1cc936')
                        .setDescription(`${workentry} ${moneyEmoji} ${moneyEarned}`);
                    message.channel.send(workEmbed)
                }
            }
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
    name: "work",
    description: "got to work",
    usage: "work"
}