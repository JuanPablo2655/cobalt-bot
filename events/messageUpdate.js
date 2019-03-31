const Discord = require("discord.js");

module.exports = (cobalt, oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
    var channel = cobalt.channels.get('426044465023680513');
    let author = newMessage.author;
    let avatar = author.displayAvatarURL;

    let updateMessage = new Discord.RichEmbed()
        .setTitle('Message updated')
        .setAuthor(author.username, avatar)
        .addField("Original", oldMessage.cleanContent, true)
        .addField("Edit", newMessage.cleanContent, true)
        .setColor("#00a1ff");
    channel.send(updateMessage);
}