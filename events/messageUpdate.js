const Discord = require("discord.js");

module.exports = (cobalt, oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
    if (oldMessage.content == newMessage.content) return;
    var channel = cobalt.channels.get('405158191324987393');
    let author = newMessage.author;
    let avatar = author.displayAvatarURL;
    let guild = newMessage.guild.id
    let msgChannel = newMessage.channel.id

    let updateMessage = new Discord.RichEmbed()
        .setTitle('Message updated')
        .setAuthor(author.username, avatar)
        .setDescription(`[Jump to message](https://discordapp.com/channels/${guild}/${msgChannel}/${newMessage.id})`)
        .addField("Original", oldMessage.cleanContent)
        .addField("Edit", newMessage.cleanContent)
        .setColor("#00a1ff")
        .setFooter("Message ID: "+newMessage.id)
        .setTimestamp();
    channel.send(updateMessage);
}