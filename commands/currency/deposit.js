const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");

        let userData = await cobalt.fetchEconUser(message.author.id)
        if (!args[0]) return message.channel.send("How much money?")
        if (isNaN(parseInt(args[0], 10)) && args[0] !== 'all') return message.channel.send("Please input a valid number");

        if (userData.onHand - Number(args[0]) < 0) return message.channel.send("You don\'t have that much money");
        if (Number(args[0]) < 0) return message.channel.send("You can't deposit negative money");
        if (userData.deposited + Number(args[0]) > userData.bankSpace) return message.channel.send("You don\'t have enough bank space");
        if (args[0] == 'all') {
            canDeposit = Number(userData.bankSpace) - Number(userData.deposited)
            if (canDeposit == 0) return message.channel.send("You don\'t have enough bank space");
            money = Math.min(canDeposit, Number(userData.onHand));
        }
        userData.onHand -= Number(money)
        userData.deposited += Number(money)
        userData.save().catch(err => cb(err));
        message.channel.send(`You deposited ${moneyEmoji} ${money} your bank balance is now ${moneyEmoji} ${userData.deposited}`);
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 2,
    aliases: ['dep']
}

exports.help = {
    name: "deposit",
    description: "deposit your money",
    usage: "deposit [all|amount]"
}