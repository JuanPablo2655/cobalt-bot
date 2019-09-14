const Discord = require("discord.js");

module.exports = (cobalt, member) => {
    var channel = cobalt.channels.get('405158191324987393');

    let newMember = new Discord.RichEmbed()
        .setTitle('Old Cobaltia citizen left')
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .addField("member count", member.guild.memberCount)
        .setColor("d62424")
        .setFooter("User ID: "+member.user.id)
        .setTimestamp();
    channel.send(newMember);
}
