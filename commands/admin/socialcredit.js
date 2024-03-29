const Discord = require('discord.js');
const xp = require('../../utils/xp');
const config = require('../../config.json');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        const [action, amount, ...user] = args;
        const member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(user.join(' ')) ||
            message.guild.members.cache.find(
                member => member.user.username === user.join(' ') || member.user.username === user.join(' '),
            );
        if (!config.ministers.includes(message.author.id)) {
            return message.channel.send({ content: "You aren't a minister" });
        }
        if (!member || !user) return message.channel.send({ content: 'Missing user' });
        if (member.user.id === message.author.id)
            return message.channel.send({ content: "You can't update your own socal credit score" });
        const userData = await xp.get(member.user);
        if (!action) return message.channel.send({ content: 'You can either add or remove social credit score' });
        if (isNaN(Number(amount))) return message.channel.send({ content: "amount isn't a number" });
        switch (action) {
            case 'add': {
                const newAmount = userData.socialCredit + Number(amount);
                if (newAmount > 2000) return message.channel.send({ content: 'The max social credit score is 2,000' });
                userData.socialCredit = newAmount;
                userData.save();
                addCD();
                return message.channel.send({
                    content: `${member.user.username} social credit score is now ${newAmount}`,
                });
            }
            case 'remove': {
                const newAmount = userData.socialCredit - Number(amount);
                if (newAmount < 0) return message.channel.send({ content: 'The min social credit is 0' });
                userData.socialCredit = newAmount;
                userData.save();
                addCD();
                return message.channel.send({
                    content: `${member.user.username} social credit score is now ${newAmount}`,
                });
            }
            default: {
                addCD();
                return message.channel.send({ content: 'You can either add or remove social credit score' });
            }
        }
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 1,
    aliases: ['sc'],
};

exports.help = {
    name: 'socialcredit',
    description: 'Add or remove social scredit score to a user',
    usage: 'socialcredit [add|remove] [amount] [user]',
};
