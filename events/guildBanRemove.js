const Discord = require('discord.js');

module.exports = (cobalt, guild, user) => {
    var channel = guild.channels.cache.find(channel => channel.name === 'record');
    if (!channel) return;
    let avatar = user.displayAvatarURL({ format: 'png' });

    let banEmbed = new Discord.MessageEmbed()
        .setTitle('User Unbanned')
        .setAuthor({ name: user.username, iconURL: avatar })
        .setColor('#1cc936')
        .setFooter({ text: 'User ID: ' + user.id })
        .setTimestamp();
    channel.send({ embeds: [banEmbed] });
};
