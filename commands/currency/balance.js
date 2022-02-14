const Discord = require("discord.js");
let currency = require("../../models/currency");

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        let moneyEmoji = cobalt.emojis.cache.get("426859750798655489");
        const member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(
                (member) => member.user.username === args.slice(0).join(" ") || member.user.username === args[0]
            ) ||
            message.member;

        let bal = await cobalt.fetchEconUser(member.id);

        if (!bal.servers.includes(message.guild.id)) {
            bal.servers.push(message.guild.id);
        }
        bal.netWorth = bal.onHand + bal.deposited; // just to fix any errors on any other commands
        await bal.save();

        let bankPercent = (bal.deposited / bal.bankSpace) * 100;

        let balanceEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: `${message.guild.name}`, iconURL: member.user.displayAvatarURL({ format: "png" }) })
            .setTitle(`${member.user.username}'s balance`)
            .setColor("RANDOM")
            .setDescription(
                `**Cash**: ₡${bal.onHand}\n**Bank**: ₡${bal.deposited} / ₡${bal.bankSpace} \`${bankPercent
                    .toString()
                    .substring(0, 4)}%\`\n**Net Worth**: ₡${bal.netWorth}\n**Bounty**: ₡${bal.bounty}`
            )
            .setFooter({
                text: `${message.author.username}`,
                iconURL: `${message.author.displayAvatarURL({ format: "png" })}`,
            })
            .setTimestamp();
        message.channel.send({ embeds: [balanceEmbed] });
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 1,
    aliases: ["bal"],
};

exports.help = {
    name: "balance",
    description: "check your balance or someone else",
    usage: "balance [user]",
};
