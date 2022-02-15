const Discord = require('discord.js');

module.exports = async (cobalt, message) => {
    var log = message.guild.channels.cache.find(channel => channel.name === 'record');
    if (!log) return;
    let author = message.author;
    let avatar = author.displayAvatarURL({ format: 'png' });
    if (message.content == 0) return;

    let deletedMessage = new Discord.MessageEmbed()
        .setTitle('Message deleted')
        .setAuthor({ name: author.username, iconURL: avatar })
        .addField('Channel', message.channel)
        .setColor('#d62424')
        .setFooter({ text: 'Message ID: ' + message.id })
        .setTimestamp();
    if (message.content == '') {
        deletedMessage.setImage(message.attachments.first().proxyURL);
    } else if (message.attachments.first() == undefined) {
        deletedMessage.addField('Content', message.content);
    } else {
        deletedMessage.addField('Content', message.content);
        deletedMessage.setImage(message.attachments.first().proxyURL);
    }
    log.send({ embeds: [deletedMessage] });

    let construct = {
        message: message.content,
        author: message.author.tag,
        avatar: message.author.displayAvatarURL({ format: 'png' }),
    };

    cobalt.sniper.set(message.channel.id, construct);
};
