const Discord = require('discord.js');

module.exports = (cobalt, member) => {
    var log = member.guild.channels.cache.find(channel => channel.name === 'record');
    if (!log) return;
    var welcome = member.guild.channels.cache.find(channel => channel.name === 'border-patrol');
    if (!welcome) return;

    let newMember = new Discord.MessageEmbed()
        .setTitle('New Cobaltia citizen has joined')
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ format: 'png' }) })
        .addField('Member count', `${member.guild.memberCount}`)
        .setColor('#1cc936')
        .setFooter({ text: 'User ID: ' + member.user.id })
        .setTimestamp();
    log.send({ embeds: [newMember] });

    welcome.send({
        content: `Welcome, ${member.user.username} to ${member.guild.name}. Please wait while the Directors administers your member role.`,
    });
};
