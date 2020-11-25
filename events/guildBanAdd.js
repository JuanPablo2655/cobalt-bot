const Discord = require("discord.js");

module.exports = (cobalt, guild, user) => {
    var channel = cobalt.channels.cache.get('405158191324987393');
    let avatar = user.displayAvatarURL({format: 'png'});

    let banEmbed = new Discord.MessageEmbed()
        .setTitle('User Banned')
        .setAuthor(user.username, avatar)
        .addField("member count", guild.memberCount - 1)
        .setColor("#d62424")
        .setFooter("User ID: "+user.id)
        .setTimestamp()
    channel.send(banEmbed);
}