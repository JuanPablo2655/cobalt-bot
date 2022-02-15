const Discord = require('discord.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        let xp = require('../../utils/xp.js');
        let user = cobalt.users.cache.get(args[0]) || message.mentions.users.last();
        if (!user) {
            user = message.author;
        }

        let level = await xp.get(user.id);
        let xpPos = require('../../models/levels');
        let pos = (await xpPos.find({ totalXp: { $gt: level.totalXp } }).countDocuments()) + 1;

        let xpPercent = (level.xp / xp.nextLevel(level.lvl)) * 100;

        let levelEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: `${message.guild.name}`, iconURL: user.displayAvatarURL({ format: 'png' }) })
            .setTitle(`${user.username}'s level`)
            .setColor('RANDOM');
        if (!level) {
            levelEmbed.setDescription(`**Level**: 0\n**Experience**: 0/100 \`0.0%\``);
        } else {
            levelEmbed.setDescription(
                `**Level**: ${level.lvl}\n**Experience**: ${level.xp}/${xp.nextLevel(level.lvl)} \`${xpPercent
                    .toString()
                    .substring(0, 4)}%\``,
            );
        }
        levelEmbed.setFooter({ text: `Leaderboard Rank: ${pos}` });
        // levelEmbed.setTimestamp()
        message.channel.send({ embeds: [levelEmbed] });
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 1,
    aliases: ['rank'],
};

exports.help = {
    name: 'level',
    description: "show's how much xp you have",
    usage: 'level [user]',
};
