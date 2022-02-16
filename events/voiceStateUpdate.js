const Discord = require('discord.js');

module.exports = async (cobalt, oldState, newState) => {
    var channel = oldState.guild.channels.cache.find(channel => channel.name === 'record');
    if (!channel) return;
    let avatar = newState.member.user.displayAvatarURL({ format: 'png' });

    let voiceEmbed = new Discord.MessageEmbed()
        .setColor('#00a1ff')
        .setTimestamp()
        .setAuthor({ name: newState.member.user.username, iconURL: avatar })
        .setFooter({ text: 'User ID: ' + newState.member.user.id });

    if (!oldState.channel && newState.channel) {
        voiceEmbed.setTitle('User Joined');
        voiceEmbed.addField('Channel', `${newState.channel}`);
        channel.send({ embeds: [voiceEmbed] });
    } else if (oldState.channel && !newState.channel) {
        voiceEmbed.setTitle('User left');
        voiceEmbed.addField('Channel', `${oldState.channel}`);
        channel.send({ embeds: [voiceEmbed] });
    } else if (oldState.channel && newState.channel && oldState.channel !== newState.channel) {
        voiceEmbed.setTitle('User switched');
        voiceEmbed.addField('From', `${oldState.channel}`, true);
        voiceEmbed.addField('To', `${newState.channel}`, true);
        channel.send({ embeds: [voiceEmbed] });
    }
};
