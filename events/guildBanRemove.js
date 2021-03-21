const Discord = require("discord.js");

module.exports = (cobalt, guild, user) => {
    var channel = guild.channels.cache.find(channel => channel.name === "record");
    let avatar = user.displayAvatarURL({format: 'png'});

    let banEmbed = new Discord.MessageEmbed()
        .setTitle('User Unbanned')
        .setAuthor(user.username, avatar)
        .setColor("#1cc936")
        .setFooter("User ID: "+user.id)
        .setTimestamp()
    channel.send(banEmbed);
}