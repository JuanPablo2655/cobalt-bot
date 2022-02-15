const Discord = require('discord.js');

module.exports = (cobalt, member) => {
    var channel = member.guild.channels.cache.find(channel => channel.name === 'record');
    if (!channel) return;

    let newMember = new Discord.MessageEmbed()
        .setTitle('Old Cobaltia citizen left')
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ format: 'png' }) })
        .addField('member count', member.guild.memberCount)
        .setColor('d62424')
        .setFooter({ text: 'User ID: ' + member.user.id })
        .setTimestamp();
    channel.send({ embeds: [newMember] });
};
