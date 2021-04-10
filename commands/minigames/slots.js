const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let options = [":banana:", ":apple:", ":pineapple:", ":grapes:", ":pear:", ":cherries:", ":strawberry:", ":watermelon:"];
        const userData = await cobalt.fetchEconUser(message.author.id);
        let money = args[0]
        if (!money || isNaN(money) && money !== 'all' && money !== 'max') return message.channel.send('Please enter an amount to play slots')
        if (money < 50) return message.channel.send(`The minimum you can gamble is \`₡100\`.`)
        if (money == 'all' || money == 'max') money = userData.onHand;
        else money = parseInt(args[0]);
        if (0 >= money) return message.channel.send("Please enter a positive number and more than ₡0")
        if (money > userData.onHand) return message.channel.send("You dont have enough CND")

        let chosen = [];
        for (let i = 0; i < 3; i++) {
            chosen.push(options[Math.round(Math.random() * (options.length - 1))]);
        }

        let first_2 = chosen[0] === chosen[1];
        let last_2 = chosen[1] === chosen[2];
        let opposite_ends = chosen[0] === chosen[2];

        let msg;
        if (first_2 && last_2) {
            let moneyEarned = Math.floor(money * 1.1)
            userData.onHand += moneyEarned
            userData.netWorth += moneyEarned
            await userData.save()
            msg = `Matched all of them! You earned ₡${moneyEarned}.`;
        } else if (first_2 || last_2 || opposite_ends) {
            let moneyEarned = Math.floor(money * .5)
            userData.onHand += moneyEarned
            userData.netWorth += moneyEarned
            await userData.save()
            msg = `Matched 2! You earned ₡${moneyEarned}.`;
        } else {
            userData.onHand -= money
            userData.netWorth -= money
            await userData.save()
            msg = `No matches. You lost ₡${money}`;
        }

        message.channel.send("|-" + chosen.join("-") + "-|\n`" + msg + "`");
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 60*1,
    aliases: []
}

exports.help = {
    name: "slots",
    description: "play slots",
    usage: "slots"
}