const Discord = require('discord.js');

module.exports = async (cobalt, reaction, user) => {
    if (user.partial) await user.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

    let message = reaction.message;
    let emojiID = reaction.emoji.id;
    let emojiName = reaction.emoji.name;
    let emoji = cobalt.emojis.cache.get(emojiID);
    var channel = reaction.message.guild.channels.cache.find(channel => channel.name === 'record');
    if (!channel) return;

    if (user.id == cobalt.user.id) return;

    if (message.author.id == cobalt.user.id) return;

    let reactionEmbed = new Discord.MessageEmbed()
        .setColor('#00a1ff')
        .setTimestamp()
        .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ format: 'png' }) })
        .setTitle('Reaction added');
    if (message.content == '') {
        reactionEmbed.setImage(message.attachments.first().url);
    } else if (message.attachments.first() == undefined) {
        reactionEmbed.addField('Message', message);
    } else {
        reactionEmbed.addField('Message', message);
        reactionEmbed.setImage(message.attachments.first().url);
    }
    reactionEmbed.setFooter({ text: 'Message ID: ' + message.id });

    if (emoji == undefined) {
        reactionEmbed.addField('Reaction', emojiName);
    } else {
        reactionEmbed.addField('Reaction', emoji);
    }
    channel.send({ embeds: [reactionEmbed] });
};
