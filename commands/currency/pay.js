const Discord = require("discord.js");
let currency = require('../../models/currency');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");
        let [user, money] = args;
        let person = cobalt.users.cache.get(args[0]) || message.mentions.users.first();
        if (!person) return message.channel.send('You have to pay someone')

        currency.findOne({
            userID: message.author.id
        }, (err, res) => {
            if (err) cb(err)
            if (!res) {
                return message.channel.send("You don't have any money to pay anyone")
            } else {
                if (!money) return message.channel.send('You have to pay the user some money')
                if (isNaN(parseInt(money, 10))) return message.channel.send('Please input a valid number')
                if (res.onHand < Number(money)) return message.channel.send('You don\'t have enough money')
                 currency.findOne({
                    userID: person.id
                 }, (err, res) => {
                     if (err) cb(err)
                     if (!res) {
                        const newEntry = new currency({
                            username: person.username,
                            userID: person.id,
                            servers: [message.guild.id],
                            onHand: Number(money),
                            deposited: 0,
                            bankSpace: 1000,
                            netWorth: Number(money)
                        })
                        newEntry.save().catch(err => console.log(err));
                     } else {
                        res.onHand += Number(money)
                        res.netWorth += Number(money)
                        res.save().catch(err => console.log(err));
                     }
                 })
                res.onHand -= Number(money)
                res.netWorth -= Number(money)
                res.save().catch(err => console.log(err));
                message.channel.send(`You paid ${person.username} ${moneyEmoji} ${money}. You now have ${moneyEmoji} ${res.onHand} left.`)
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
    name: "pay",
    description: "pay someone",
    usage: "pay [user] [amount]"
}