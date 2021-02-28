const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");
        const botRoll = Math.floor(Math.random() * 13)+1;
        const userChoice = Math.floor(Math.random() * 13)+1;
        const userData = await cobalt.fetchEconUser(message.author.id);

        let betAmount = args[0];
        const result = userChoice-botRoll;

        if (!betAmount || isNaN(betAmount) && betAmount !== 'all' && betAmount !== 'max') return message.channel.send('Please enter the amount you want to gamble')

        if (betAmount < 50) return message.channel.send(`The minimum you can gamble is \`₡50\`.`)
        if (betAmount == 'all' || betAmount == 'max') betAmount = userData.onHand;
        else betAmount = parseInt(args[0]);

        if (betAmount > userData.onHand) return message.channel.send("You dont have enough CND")
        if (botRoll < userChoice) {
            const wonCoins = Math.floor(betAmount + (betAmount * 0.30));
            userData.onHand += wonCoins;
            userData.netWorth += wonCoins;
            await userData.save();
            message.channel.send(`The bot rolled: ${botRoll}\nYou rolled: ${userChoice}\nYou won **₡${wonCoins}**`)
        } else if (botRoll == userChoice) {
            message.channel.send(`The bot rolled: ${botRoll}\nYou rolled: ${userChoice}\nYou tied and won nothing`)
        } else {
            const lostCoins = betAmount;
            userData.onHand -= lostCoins;
            userData.netWorth -= lostCoins;
            await userData.save();
            message.channel.send(`The bot rolled: ${botRoll}\nYou rolled: ${userChoice}\nYou lost **₡${lostCoins}**`)
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
    name: "gamble",
    description: "gamble your money",
    usage: "gamble [amount]"
}
