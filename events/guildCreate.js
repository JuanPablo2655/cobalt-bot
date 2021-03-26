const Discord = require("discord.js");

module.exports = (cobalt, guild) => {
    var channel = cobalt.channels.cache.get('823308420257415208');
    let avatar = guild.iconURL({format: 'png'});

    let banEmbed = new Discord.MessageEmbed()
        .setTitle('New server')
        .setAuthor(guild.name, avatar)
        .setThumbnail(avatar)
        .addField("member count", guild.memberCount - 1)
        .setColor("#1cc936")
        .setFooter("guild ID: "+guild.id)
        .setTimestamp()
    channel.send(banEmbed);
}