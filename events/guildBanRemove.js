const Discord = require("discord.js");

module.exports = (cobalt, guild, user) => {
    var channel = cobalt.channels.cache.get('405158191324987393');
    let avatar = user.displayAvatarURL({format: 'png'});

    let banEmbed = new Discord.MessageEmbed()
        .setTitle('User Unbanned')
        .setAuthor(user.username, avatar)
        .setColor("#1cc936")
        .setFooter("User ID: "+user.id)
        .setTimestamp()
    channel.send(banEmbed);
}