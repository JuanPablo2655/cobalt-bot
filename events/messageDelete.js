const Discord = require("discord.js");

module.exports = (cobalt, message) => {
    var log = cobalt.channels.cache.get('405158191324987393');
    let author = message.author;
    let avatar = author.displayAvatarURL({format: 'png'});
    if (message.content == 0) return

    let deletedMessage = new Discord.MessageEmbed()
        .setTitle('Message deleted')
        .setAuthor(author.username, avatar)
        .addField("Channel", message.channel)
        .setColor("#d62424")
        .setFooter("Message ID: " + message.id)
        .setTimestamp();
        if (message.attachments.size > 0) {
            deletedMessage.addField("Content", message.content + message.attachments)
        } else {
            deletedMessage.addField("Content", message.content)
        }
    log.send(deletedMessage);

    let construct = {
        message: message.content,
        author: message.author.tag,
        avatar: message.author.displayAvatarURL({format: 'png'})
    };

    cobalt.sniper.set(message.channel.id, construct);
}