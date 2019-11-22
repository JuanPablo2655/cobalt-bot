const Discord = require("discord.js");

module.exports = (cobalt, guild, user) => {
    var channel = cobalt.channels.get('405158191324987393');
    let avatar = user.displayAvatarURL;

    let banEmbed = new Discord.RichEmbed()
        .setTitle('User Unbanned')
        .setAuthor(user.username, avatar)
        .setColor("#1cc936")
        .setFooter("User ID: "+user.id)
        .setTimestamp()
    channel.send(banEmbed);
}