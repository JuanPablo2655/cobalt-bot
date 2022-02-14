const Discord = require("discord.js");
let currency = require("../../models/currency");

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");
        let amount = args[1];
        let authorData = await cobalt.fetchEconUser(message.author.id);
        let member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(
                (member) => member.user.username === args.slice(0).join(" ") || member.user.username === args[0]
            );
        if (!member || !args[0]) return message.channel.send({ content: "You have to pay someone" });
        if (member.user.id == message.author.id) return message.channel.send({ content: "Can't pay yourself" });
        let userData = await cobalt.fetchEconUser(member.user.id);
        if (!amount) return message.channel.send({ content: "You have to pay the user some money" });
        if (authorData.onHand < Number(amount)) return message.channel.send({ content: "You don't have enough money" });
        if (args[1] == "all") amount = authorData.onHand;
        else amount = args[1];
        if (isNaN(Number(amount)) && amount !== "all")
            return message.channel.send({ content: "Please input a valid number" });
        if (Number(amount) <= 0) return message.channel.send({ content: "Can't pay someone negative" });

        addCD();

        if (!authorData.servers.includes(message.guild.id)) {
            authorData.servers.push(message.guild.id);
        }
        authorData.onHand -= Number(amount);
        authorData.netWorth -= Number(amount);
        await authorData.save();
        if (!userData.servers.includes(message.guild.id)) {
            userData.servers.push(message.guild.id);
        }
        userData.onHand += Number(amount);
        userData.netWorth += Number(amount);
        await userData.save();

        message.channel.send({
            content: `You paid ${member.user.username} ₡${amount}. You now have ₡${authorData.onHand} left.`,
        });
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 5,
    aliases: [],
};

exports.help = {
    name: "pay",
    description: "pay someone",
    usage: "pay [user] [amount]",
};
