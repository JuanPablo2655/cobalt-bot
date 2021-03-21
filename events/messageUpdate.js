const Discord = require("discord.js");

module.exports = async (cobalt, oldMessage, newMessage) => {
    if(oldMessage.partial) oldMessage = await oldMessage.fetch();
    if (oldMessage.author.bot) return;
    if (oldMessage.content == newMessage.content) return;
    var channel = oldMessage.guild.channels.cache.find(channel => channel.name === "record");
    let author = newMessage.author;
    let avatar = author.displayAvatarURL({format: 'png'});
    let guild = newMessage.guild.id
    let msgChannel = newMessage.channel.id

    let updateMessage = new Discord.MessageEmbed()
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