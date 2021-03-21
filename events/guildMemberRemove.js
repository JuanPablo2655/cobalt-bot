const Discord = require("discord.js");

module.exports = (cobalt, member) => {
    var channel = member.guild.channels.cache.find(channel => channel.name === "record");

    let newMember = new Discord.MessageEmbed()
        .setTitle('Old Cobaltia citizen left')
        .setAuthor(member.user.username, member.user.displayAvatarURL({format: 'png'}))
        .addField("member count", member.guild.memberCount)
        .setColor("d62424")
        .setFooter("User ID: "+member.user.id)
        .setTimestamp();
    channel.send(newMember);
}
