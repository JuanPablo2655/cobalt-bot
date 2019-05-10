const Discord = require("discord.js");

module.exports = (cobalt, message) => {
    var channelLog = cobalt.channels.get('426044465023680513');
    let author = message.author;
    let avatar = author.displayAvatarURL;

    let deletedMessage = new Discord.RichEmbed()
        .setTitle('Message deleted')
        .setAuthor(author.username, avatar)
        .addField("Channel", message.channel, true)
        .addField("Content", message.content, true)
        .setColor("#d62424");
    channelLog.send(deletedMessage);
}