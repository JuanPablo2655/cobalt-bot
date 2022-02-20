const Discord = require('discord.js');

module.exports = (cobalt, ban) => {
    var channel = ban.guild.channels.cache.find(channel => channel.name === 'record');
    if (!channel) return;
    let avatar = ban.user.displayAvatarURL({ format: 'png' });

    let banEmbed = new Discord.MessageEmbed()
        .setTitle('User Unbanned')
        .setAuthor({ name: ban.user.username, iconURL: avatar })
        .setColor('#1cc936')
        .setFooter({ text: 'User ID: ' + ban.user.id })
        .setTimestamp();
    channel.send({ embeds: [banEmbed] });
};
