const Discord = require("discord.js");
let currency = require('../../models/currency');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");
        let [action, money] = args;

        let userData = await cobalt.fetchEconUser(message.author.id)
        if (!action) return message.channel.send("Are you going to deposit or withdraw?")
        if (!money) return message.channel.send("How much money?")
        if (isNaN(parseInt(money, 10)) && money !== 'all') return message.channel.send("Please input a valid number");
        if (action == 'deposit') {
            if (userData.onHand - Number(money) < 0) return message.channel.send("You don\'t have that much money");
            if (Number(money) < 0) return message.channel.send("You can't deposit negative money");
            if (userData.deposited + Number(money) > userData.bankSpace) return message.channel.send("You don\'t have enough bank space");
            if (money == 'all') {
                canDeposit = Number(userData.bankSpace) - Number(userData.deposited)
                money = Math.min(canDeposit, Number(userData.onHand));
            }
            userData.onHand -= Number(money)
            userData.deposited += Number(money)
            userData.save().catch(err => cb(err));
            message.channel.send(`You deposited ${moneyEmoji} ${money} your bank balance is now ${moneyEmoji} ${userData.deposited}`);
        } else if (action == 'withdraw') {
            if (userData.bank - Number(money) < 0) return message.channel.send("You don\'t have that much money deposited");
            if (money == 'all') money = userData.deposited
            if (Number(money) <= 0) return message.channel.send("You can't withdraw money you don\'t have");
            userData.onHand += Number(money)
            userData.deposited -= Number(money)
            userData.save().catch(err => cb(err));
            message.channel.send(`You withdrew ${moneyEmoji} ${money} your bank balance is now ${moneyEmoji} ${userData.deposited}`);
        } else return message.channel.send("Please specify if you are going to deposit or withdraw.");

        // currency.findOne({
        //     userID: message.author.id
        // }, (err, res) => {
        //     if (err) console.log(err)
        //     if (!res) {
        //         message.channel.send("You don\'t have any money to deposit")
        //     } else {
        //         if (!action) return message.channel.send("Are you going to deposit or withdraw?")
        //         if (!money) return message.channel.send("How much money?")
        //         if (isNaN(parseInt(money, 10)) && money !== 'all') return message.channel.send("Please input a valid number");
        //         if (action == 'deposit') {
        //             if (res.onHand - Number(money) < 0) return message.channel.send("You don\'t have that much money");
        //             if (Number(money) < 0) return message.channel.send("You can't deposit negative money");
        //             if (res.deposited + Number(money) > res.bankSpace) return message.channel.send("You don\'t have enough bank space");
        //             if (money == 'all') {
        //                 canDeposit = Number(res.bankSpace) - Number(res.deposited)
        //                 money = Math.min(canDeposit, Number(res.onHand));
        //             }
        //             res.onHand -= Number(money)
        //             res.deposited += Number(money)
        //             res.save().catch(err => cb(err));
        //             message.channel.send(`You deposited ${moneyEmoji} ${money} your bank balance is now ${moneyEmoji} ${res.deposited}`);
        //         } else if (action == 'withdraw') {
        //             if (res.bank - Number(money) < 0) return message.channel.send("You don\'t have that much money deposited");
        //             if (money == 'all') money = res.deposited
        //             if (Number(money) <= 0) return message.channel.send("You can't withdraw money you don\'t have");
        //             res.onHand += Number(money)
        //             res.deposited -= Number(money)
        //             res.save().catch(err => cb(err));
        //             message.channel.send(`You withdrew ${moneyEmoji} ${money} your bank balance is now ${moneyEmoji} ${res.deposited}`);
        //         } else return message.channel.send("Please specify if you are going to deposit or withdraw.");
        //     }
        // })
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
    name: "bank",
    description: "withdraw or deposit on the bank",
    usage: "bank [deposit|withdraw] [amount]"
}