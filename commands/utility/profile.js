const Discord = require('discord.js');
let xp = require('../../utils/xp.js');
let currency = require('../../models/currency');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        const member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(
                member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0],
            ) ||
            message.member;
        let exp = await xp.get(member.id);
        let bal = await cobalt.fetchEconUser(member.id);
        let xpPos = require('../../models/levels');
        let pos = (await xpPos.find({ totalXp: { $gt: exp.totalXp } }).countDocuments()) + 1;

        let xpPercent = (exp.xp / xp.nextLevel(exp.lvl)) * 100;
        let bankPercent = (bal.deposited / bal.bankSpace) * 100;

        let profileEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ format: 'png' }) })
            .addField('Level', `${exp.lvl}`, true)
            .addField(
                'Experience',
                `${exp.xp}/${xp.nextLevel(exp.lvl)} \`${xpPercent.toString().substring(0, 4)}%\`\n**Rank**: ${pos}`,
                true,
            )
            .addField(
                'Money',
                `**Cash**: ₡${bal.onHand}\n**Bank**: ₡${bal.deposited} / ₡${bal.bankSpace} \`${bankPercent
                    .toString()
                    .substring(0, 4)}%\`\n**Net**: ₡${bal.netWorth}\n**Bounty**: ₡${bal.bounty}`,
                true,
            );
        message.channel.send({ embeds: [profileEmbed] });
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 1,
    aliases: [],
};

exports.help = {
    name: 'profile',
    description: 'check your profile',
    usage: 'profile',
};
