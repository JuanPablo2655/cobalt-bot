const Discord = require("discord.js");

module.exports = (cobalt, member) => {
    var channel = cobalt.channels.get('426044465023680513');

    let newMember = new Discord.RichEmbed()
        .setTitle('New Cobaltia citizen has joined')
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .addField("Member count", cobalt.memberCount)
        .setColor("#1cc936");

    channel.send(newMember);
}