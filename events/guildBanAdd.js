const Discord = require('discord.js');

module.exports = (cobalt, ban) => {
    var channel = ban.guild.channels.cache.find(channel => channel.name === 'record');
    if (!channel) return;
    let avatar = ban.user.displayAvatarURL({ format: 'png' });

    let banEmbed = new Discord.MessageEmbed()
        .setTitle('User Banned')
        .setAuthor({ name: ban.user.username, iconURL: avatar })
        .addField('member count', `${ban.guild.memberCount - 1}`)
        .setColor('#d62424')
        .setFooter({ text: 'User ID: ' + ban.user.id })
        .setTimestamp();
    channel.send({ embeds: [banEmbed] });
};
