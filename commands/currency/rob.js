const Discord = require("discord.js");
const chooser = require("random-seed-weighted-chooser").default;
let arrayOfWeights = [52, 18, 10, 12, 8];

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");
        const random = chooser.chooseWeightedIndex(arrayOfWeights);

        const user = await cobalt.fetchEconUser(message.author.id);
        let member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(
                (member) => member.user.username === args.slice(0).join(" ") || member.user.username === args[0]
            );
        if (!member || !args[0]) return message.channel.send({ content: "Please pick someone to rob" });
        if (member.user.id == message.author.id) return message.channel.send({ content: "Can't rob yourself" });
        const robbedUser = await cobalt.fetchEconUser(member.user.id);
        const randomAmount = Math.round(Math.random() * robbedUser.onHand);
        if (robbedUser.onHand <= 0)
            return message.channel.send({ content: `${member.user.username} doesn\'t have CND` });

        addCD();

        if (random === 0) {
            user.onHand += randomAmount;
            user.netWorth += randomAmount;
            user.bounty += Math.floor(randomAmount * 0.5);
            robbedUser.onHand -= randomAmount;
            robbedUser.netWorth -= randomAmount;
            await user.save();
            await robbedUser.save();
            message.channel.send({
                content: `You have successfully robbed ${member.user.username} ₡${randomAmount}. You now have a bounty of ₡${user.bounty}.`,
            });
        } else if (random === 1) {
            message.channel.send({
                content: `${member.user.username} fought back, you left without a single cobaltian dollar.`,
            });
        } else if (random === 2) {
            let bountyClaimed = user.bounty;
            robbedUser.onHand += bountyClaimed;
            await robbedUser.save();
            user.onHand = 0;
            user.deposited = 0;
            user.bankSpace = 1000;
            user.netWorth = 0;
            user.bounty = 0;
            await user.save();
            message.channel.send({
                content: `${member.user.username} fought back, killed you, and claimed your bounty of ₡${bountyClaimed}. You lost every thing.`,
            });
        } else if (random === 3) {
            const fineAmount = Math.round(Math.random() * user.onHand);
            user.netWorth -= fineAmount;
            user.onHand -= fineAmount;
            user.bounty = 0;
            await user.save();
            message.channel.send({
                content: `You were caught by the police and was fined ₡${fineAmount}. Your bounty was reset.`,
            });
        } else {
            robbedUser.onHand += user.onHand;
            robbedUser.netWorth += user.onHand;
            await robbedUser.save();
            user.netWorth -= user.onHand;
            user.onHand = 0;
            await user.save();
            message.channel.send({ content: `${member.user.username} took your money instead KEKW.` });
        }
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 60 * 5,
    aliases: [],
};

exports.help = {
    name: "rob",
    description: "rob someone",
    usage: "rob [user]",
};
