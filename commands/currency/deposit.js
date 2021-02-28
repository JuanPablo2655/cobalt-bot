const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");

        let userData = await cobalt.fetchEconUser(message.author.id)
        if (!args[0]) return message.channel.send("How much money?")
        if (isNaN(parseInt(args[0], 10)) && args[0] !== 'all') return message.channel.send("Please input a valid number");
        let money = Number(args[0]);

        if (userData.onHand - money < 0) return message.channel.send("You don\'t have that much money");
        if (money < 0) return message.channel.send("You can't deposit negative money");
        if (userData.deposited + money > userData.bankSpace) return message.channel.send("You don\'t have enough bank space");
        if (args[0] == 'all') {
            canDeposit = Number(userData.bankSpace) - Number(userData.deposited)
            if (canDeposit == 0) return message.channel.send("You don\'t have enough bank space");
            money = Math.min(canDeposit, Number(userData.onHand));
        }
        userData.onHand -= money
        userData.deposited += money
        userData.save().catch(err => cb(err));
        message.channel.send(`You deposited ₡${money} your bank balance is now ₡${userData.deposited}`);
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