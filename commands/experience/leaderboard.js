const Discord = require('discord.js');
let levels = require('../../models/levels.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        levels
            .find({
                servers: message.guild.id,
            })
            .sort([['totalXp', 'descending']])
            .exec((err, res) => {
                if (err) console.log(err);
                let leaderEmbed = new Discord.MessageEmbed().setTitle('Leaderboard');
                if (res.length === 0) {
                    leaderEmbed.setColor('RED');
                    leaderEmbed.addField('No data found', 'Looks like a dead server to me');
                } else if (res.length < 10) {
                    leaderEmbed.setColor('RANDOM');
                    for (i = 0; i < res.length; i++) {
                        let member = message.guild.members.cache.get(res[i].userID) || 'User Left';
                        if (member === 'User Left') {
                            leaderEmbed.addField(`${i + 1}. ${member}`, `**levels**: ${res[i].lvl}`);
                        } else {
                            leaderEmbed.addField(`${i + 1}. ${member.user.username}`, `**levels**: ${res[i].lvl}`);
                        }
                    }
                } else {
                    for (i = 0; i < 10; i++) {
                        let member = message.guild.members.cache.get(res[i].userID) || 'User Left';
                        if (member === 'User Left') {
                            leaderEmbed.addField(`${i + 1}. ${member}`, `**levels**: ${res[i].lvl}`);
                        } else {
                            leaderEmbed.addField(`${i + 1}. ${member.user.username}`, `**levels**: ${res[i].lvl}`);
                        }
                    }
                }

                message.channel.send({ embeds: [leaderEmbed] });
            });
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 1,
    aliases: ['lb'],
};

exports.help = {
    name: 'leaderboard',
    description: "show's the leaderboard for the top ten cobaltians",
    usage: 'leaderboard',
};
