const Discord = require('discord.js');

module.exports = (cobalt, guild, user) => {
    var channel = guild.channels.cache.find(channel => channel.name === 'record');
    if (!channel) return;
    let avatar = user.displayAvatarURL({ format: 'png' });

    let banEmbed = new Discord.MessageEmbed()
        .setTitle('User Banned')
        .setAuthor({ name: user.username, iconURL: avatar })
        .addField('member count', guild.memberCount - 1)
        .setColor('#d62424')
        .setFooter({ text: 'User ID: ' + user.id })
        .setTimestamp();
    channel.send({ embeds: [banEmbed] });
};
